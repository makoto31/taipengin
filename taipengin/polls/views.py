# coding:utf-8
from django.http import HttpResponse

def home(request):
    return HttpResponse("Hello, world. You're at the poll index.")


