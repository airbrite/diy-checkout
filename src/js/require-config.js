'use strict';

require.config({
  baseUrl: 'js',
  paths: {
    'celery-js': 'vendor/celery-js/src/index',
    jquery: '//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min',
    'jquery.payment': 'vendor/jquery.payment/lib/jquery.payment',
    text: 'vendor/requirejs-text/text',
    tmpl: 'vendor/microtemplates/index'
  },
  shim: {
    'jquery.payment': {
      deps: ['jquery']
    }
  }
});
