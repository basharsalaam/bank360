from datetime import datetime, timedelta, timezone
from calendar import monthrange
from dateutil.relativedelta import relativedelta

from rest_framework.exceptions import ParseError
from rest_framework import serializers

from api.models import TimePass

def otpcheck(data):
    if not 'time_pass' in data.keys():
        raise ParseError({'otp' : ['this field is required']})
    if not 'email' in data.keys():
        raise serializers.ValidationError({'email' : ['this field is required']})
    if not TimePass.objects.filter(email = data['email']).exists():
        raise serializers.ValidationError({'otp' : ['wrong otp provided becase email is absent']})
    otp = TimePass.objects.get(email = data['email'])
    if int(otp.time_pass) != int(data['time_pass']):
        raise serializers.ValidationError({'otp' : ['wrong otp provided']})
    if otp.updated_at + timedelta(minutes = 1) <=  datetime.now(timezone.utc):
        raise serializers.ValidationError({'email' : ['otp expired']})
    otp.delete()

def date_split(params, kwargs):
    try:

        def reduceDate(end, duration, after):
            if end == 1:
                after -= relativedelta(years = duration)
            elif end == 2:
                after -= relativedelta(months = duration)
            elif end == 3:
                after -= relativedelta(days = duration)
            elif end == 4:
                after -= relativedelta(hours = duration)
            elif end == 5:
                after -= relativedelta(minutes = duration)
            elif end == 6:
                after -= relativedelta(microseconds = duration)
            return after

        date = params['date'].split(',')
        date = dict(enumerate([int(val) for val in date]))
        end = len(date)
        duration = int(params['duration'])
        b_day = monthrange(date.get(0), date.get(1, 12))[1]
        before = f"{date.get(0)}-{str(date.get(1, 12)).zfill(2)}-{str(date.get(2, b_day)).zfill(2)}T{str(date.get(3, 23)).zfill(2)}:{str(date.get(4, 59)).zfill(2)}:{str(date.get(5, 59)).zfill(2)}.{str(date.get(6, 999999)).zfill(6)}Z"
        after = f"{date.get(0)}-{str(date.get(1, 1)).zfill(2)}-{str(date.get(2, 1)).zfill(2)}T{str(date.get(3, 0)).zfill(2)}:{str(date.get(4, 0)).zfill(2)}:{str(date.get(5, 0)).zfill(2)}.{str(date.get(6, 0)).zfill(6)}Z"
        after = datetime.strptime(after, '%Y-%m-%dT%H:%M:%S.%f%z')
        after = reduceDate(end, duration-1, after)
        size = int(params['size'])-1 if 'compare' not in kwargs.values() else int(params['size'])
        conditions = [after]
        for i in range(size):
            after = reduceDate(end, duration, after)
            conditions.append(after)
        after = after.strftime('%Y-%m-%dT%H:%M:%S.%fZ')
    except Exception as err:
        raise ParseError(f"{err} not in parameter")
    return(before, after, conditions)


