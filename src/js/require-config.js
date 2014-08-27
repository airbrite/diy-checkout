'use strict';

require.config({
  baseUrl: 'js',
  paths: {
    'celery-js': 'vendor/celery-js/src/index',
    'jquery.payment': 'vendor/jquery.payment/lib/jquery.payment',
    text: 'vendor/requirejs-text/text',
    tmpl: 'vendor/microtemplates/index'
  },
  map: {
    '*': {
      'jquery': 'jquery-loader'
    }
  },
  shim: {
    'jquery.payment': {
      deps: ['jquery']
    }
  }
});
