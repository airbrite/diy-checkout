'use strict';

// Load config
require(['require_config'], function(config) {
  require(['app'], function(app) {
    return window.CeleryCart = app.initialize();
  });
});
