# coding:utf-8
from django.http import HttpResponse

def index(request):
    return HttpResponse("管理画面予定地")

