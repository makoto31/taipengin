# coding:utf-8
from django.conf.urls import patterns, url

urlpatterns = patterns('admin.views',
    url(r'^$', 'index'),
)
