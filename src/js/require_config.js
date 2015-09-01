'use strict';

require.config({
  baseUrl: 'js',
  paths: {
    'celery-js': 'vendor/celery-js/src/index',
    'blueimp-md5': 'vendor/blueimp-md5/js/md5',
    hogan: 'vendor/hogan/web/builds/3.0.2/hogan-3.0.2.amd',
    'jquery.payment': 'vendor/jquery.payment/lib/jquery.payment',
    text: 'vendor/requirejs-text/text'
  },
  map: {
    '*': {
      'jquery': 'jquery_loader'
    }
  },
  shim: {
    'jquery.payment': {
      deps: ['jquery']
    }
  }
});
