# coding:utf-8
from django.conf.urls import patterns, include, url

urlpatterns = patterns('',
    url(r'^$', 'root.views.index', name='root'),
    url(r'^admin/', include('admin.urls')),
    url(r'^polls/', 'polls.views.index'),
)
