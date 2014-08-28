'use strict';

// Load config
require(['require-config'], function(config) {
  require(['app'], function(app) {
    return window.CeleryCart = app.initialize();
  });
});
