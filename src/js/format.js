define(function(require) {
  var accounting = require('vendor/accounting.js/accounting');

  return {
    formatMoney: function(cents) {
      return accounting.formatMoney(cents / 100);
    }
  }
});
