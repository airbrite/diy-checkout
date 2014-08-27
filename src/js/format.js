define(function(require) {
  var accounting = require('vendor/accounting.js/accounting');

  return {
    formatMoney: function(cents) {
      var options = { precision: 2 };
      var dollars = cents / 100;

      // Don't show cents when .00
      if (dollars % 1 === 0) {
        options.precision = 0;
      }

      return accounting.formatMoney(dollars, options);
    }
  }
});
