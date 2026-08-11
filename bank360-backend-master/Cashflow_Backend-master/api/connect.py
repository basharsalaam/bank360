from datetime import timedelta

from django.utils import timezone

from rest_framework.exceptions import ParseError

from cashflow import settings

import requests


class Mono:

    __APPLICATION_JSON = "application/json"
    __BASE_URL = "https://api.withmono.com/v2/"
    __HEADERS = {
            "Accept": __APPLICATION_JSON,
            "mono-sec-key": settings.MONO_SEC_KEY,
            "Content-Type": __APPLICATION_JSON
        }
    __TIMEOUT = 30

    @staticmethod
    def __response_data(response, error_message):
        try:
            data = response.json()
        except ValueError:
            raise ParseError(error_message)

        if not response.ok or data.get('status') == 'failed':
            raise ParseError(data.get('message', error_message))

        return data

    @staticmethod
    def _normalize_account_payload(payload):
        """Support both Mono's legacy and current v2 account shapes."""
        wrapped_data = payload.get('data')
        data = wrapped_data if isinstance(wrapped_data, dict) else payload
        account = data.get('account')
        meta = data.get('meta') or payload.get('meta') or {}

        if not isinstance(account, dict):
            raise ParseError("Could not retrieve account details from Mono response")

        institution = account.get('institution') or {}
        account_id = account.get('_id') or account.get('id')
        account_number = account.get('accountNumber') or account.get('account_number')
        if not account_id or not account_number:
            raise ParseError("Could not retrieve account details from Mono response")

        return {
            'account': {
                **account,
                '_id': account_id,
                'accountNumber': account_number,
                'institution': {
                    **institution,
                    'bankCode': institution.get('bankCode') or institution.get('bank_code'),
                },
            },
            'meta': {
                **meta,
                'data_status': str(meta.get('data_status', 'PROCESSING')).upper(),
                'auth_method': meta.get('auth_method') or account.get('authMethod') or 'internet_banking',
            },
        }

    @staticmethod
    def __change_re_auth(account, reauth_code = None):
        account.re_auth = True
        account.re_auth_code = reauth_code
        account.save()
    
    @staticmethod
    def auth(code):

        url = f"{Mono.__BASE_URL}accounts/auth"

        payload = {"code": code}

        response = requests.request(
            "POST", url, json=payload, headers=Mono.__HEADERS, timeout=Mono.__TIMEOUT
        )
        data = Mono.__response_data(response, "Unable to add the requested account")

        account_id = data.get('id') or (data.get('data') or {}).get('id')
        if not account_id:
            raise ParseError("Could not retrieve account ID from Mono response")

        return Mono.account(account_id)

    @staticmethod
    def account(id):
        url = f"{Mono.__BASE_URL}accounts/{id}"

        response = requests.request(
            "GET", url, headers=Mono.__HEADERS, timeout=Mono.__TIMEOUT
        )
        data = Mono.__response_data(response, "Unable to add the requested account")
        return Mono._normalize_account_payload(data)

    @staticmethod
    def transactions(id, date = ''):
        url = f"{Mono.__BASE_URL}accounts/{id}/transactions?paginate=false"

        if date:
            url += f"&start={date}&end={timezone.make_aware(timezone.datetime.now() + timedelta(days=1)).strftime('%d-%m-%Y')}"

        response = requests.request(
            "GET", url, headers=Mono.__HEADERS, timeout=Mono.__TIMEOUT
        )
        return Mono.__response_data(
            response, "Unable to get transactions for the requested account"
        )

    @staticmethod
    def reauthorise(account):
        url = f"{Mono.__BASE_URL}accounts/{account.account_id}/reauthorise"

        raw_response = requests.request(
            "POST", url, headers=Mono.__HEADERS, timeout=Mono.__TIMEOUT
        )
        response = Mono.__response_data(
            raw_response, "Unable to reauthorise the requested account"
        )
        response['detail'] = "reauthorisation_required"

        Mono.__change_re_auth(account, response['token'])

        return response

    @staticmethod
    def sync(account):
        url = f"{Mono.__BASE_URL}accounts/{account.account_id}/sync"

        raw_response = requests.request(
            "POST", url, headers=Mono.__HEADERS, timeout=Mono.__TIMEOUT
        )

        if not raw_response.ok:
            Mono.__change_re_auth(account)
            raise ParseError("Unable to synchronize the requested account")

        response = Mono.__response_data(
            raw_response, "Unable to synchronize the requested account"
        )

        if response['status'] == 'failed':
            reauth = Mono.reauthorise(account)
            raise ParseError(reauth)

        elif not response['hasNewData']:
            raise ParseError('No new data')

        return Mono.account(account.account_id)

    @staticmethod
    def unlink(id):
        url = f"{Mono.__BASE_URL}accounts/{id}/unlink"

        response = requests.request(
            "POST", url, headers=Mono.__HEADERS, timeout=Mono.__TIMEOUT
        )

        if not response.ok:
            raise ParseError("unable to delete the requested account")

        return
