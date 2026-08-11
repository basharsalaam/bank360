from django.http import HttpResponse
from django.shortcuts import render

from api import tasks

def home(request):
    return render(request, 'index.html')
    

def default(request):
    return HttpResponse('Welcome to Cashflow',status = 200)