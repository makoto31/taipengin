import os
os.environ['DJANGO_SETTINGS_MODULE'] = 'root.settings'

# Google App Engine imports.
from google.appengine.ext.webapp import util

# Force Django to reload its settings.
from django.conf import settings
settings._target = None

import logging
import django.core.handlers.wsgi
import django.core.signals
import django.db
import django.dispatch


def log_exception(*args, **kwds):
    logging.exception('Exception in request:')

# Log errors.
django.dispatch.Signal.connect(
    django.core.signals.got_request_exception, log_exception)

# Unregister the rollback event handler.
django.dispatch.Signal.disconnect(
    django.core.signals.got_request_exception,
    django.db._rollback_on_exception)

app = django.core.handlers.wsgi.WSGIHandler()
util.run_wsgi_app(app)