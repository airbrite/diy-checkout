define(function(require) {
  var celeryClient = require('celery_client');

  return {
    fetch: function(cb) {
      var self = this;

      return celeryClient.fetchShop(null, function(err, res) {
        if (res && res.data) {
          self.data = $.extend(self.data, res.data);
        }

        if (typeof cb === 'function') {
          cb(err, res);
        }
      });
    },

    data: {}
  }
});
