from django.utils import timezone

from datetime import timedelta

from rest_framework.exceptions import ParseError

from cashflow import settings

import requests, json


class Mono:

    __APPLICATION_JSON = "application/json"
    __BASE_URL = "https://api.withmono.com/v2/"
    __HEADERS = {
            "Accept": __APPLICATION_JSON,
            "mono-sec-key": settings.MONO_SEC_KEY,
            "Content-Type": __APPLICATION_JSON
        }
    __BAD_REQUEST = (400, 401, 404, 500)

    @staticmethod
    def __change_re_auth(account, reauth_code = None):
        account.re_auth = True
        account.re_auth_code = reauth_code
        account.save()
    
    @staticmethod
    def auth(code):

        print(f"code: {code}")

        url = f"{Mono.__BASE_URL}accounts/auth"

        payload = {"code": code}

        response = requests.request("POST", url, json=payload, headers=Mono.__HEADERS)

        print(f"status: {response.status_code}")
        print(f"auth response: {response.text}")

        if response.status_code in Mono.__BAD_REQUEST:
            raise ParseError("Unable to add the requested account")

        data = json.loads(response.text)

        if data.get('status') == 'failed':
            raise ParseError(data.get('message', 'Unable to add the requested account'))

        account_id = data.get('id') or (data.get('data') or {}).get('id')
        if not account_id:
            raise ParseError("Could not retrieve account ID from Mono response")

        return Mono.account(account_id)

    @staticmethod
    def account(id):
        url = f"{Mono.__BASE_URL}accounts/{id}"

        response = requests.request("GET", url, headers=Mono.__HEADERS)

        print(json.loads(response.text))

        if response.status_code in Mono.__BAD_REQUEST:
            raise ParseError(f"Unable to add the requested account")

        return json.loads(response.text)

    @staticmethod
    def transactions(id, date = ''):
        url = f"{Mono.__BASE_URL}accounts/{id}/transactions?paginate=false"

        if date:
            url += f"&start={date}&end={timezone.make_aware(timezone.datetime.now() + timedelta(days=1)).strftime('%d-%m-%Y')}"

        response = requests.request("GET", url, headers=Mono.__HEADERS)

        print(json.loads(response.text))

        if response.status_code in Mono.__BAD_REQUEST:
            raise ParseError("Unable to get transactions for the requested acccount")

        return json.loads(response.text)

    @staticmethod
    def reauthorise(account):
        url = f"{Mono.__BASE_URL}accounts/{account.account_id}/reauthorise"

        response = requests.request("POST", url, headers=Mono.__HEADERS)

        if response.status_code in Mono.__BAD_REQUEST:
            raise ParseError("Unable to reauthorise the requested account")

        response = json.loads(response.text)
        response['detail'] = "reauthorisation_required"

        Mono.__change_re_auth(account, response['token'])

        return response

    @staticmethod
    def sync(account):
        url = f"{Mono.__BASE_URL}accounts/{account.account_id}/sync"

        response = requests.request("POST", url, headers=Mono.__HEADERS)

        if response.status_code in Mono.__BAD_REQUEST:
            Mono.__change_re_auth(account)
            raise ParseError("Unable to synchronize the requested account")

        response =json.loads(response.text)

        if response['status'] == 'failed':
            reauth = Mono.reauthorise(account)
            raise ParseError(reauth)

        elif not response['hasNewData']:
            raise ParseError('No new data')

        return Mono.account(account.id)

    @staticmethod
    def unlink(id):
        url = f"{Mono.__BASE_URL}accounts/{id}/unlink"

        response = requests.request("POST", url, headers=Mono.__HEADERS)

        if response.status_code in Mono.__BAD_REQUEST:
            raise ParseError("unable to delete the requested account")

        return
