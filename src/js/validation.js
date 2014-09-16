define(function(require) {
  'use strict';

  require('jquery.payment');
  var $ = require('jquery');

  // Borrowed from LGTM since we don't have real promises here
  // https://github.com/square/lgtm
  function present(value) {
    if (typeof value === 'string') {
      value = value.trim();
    }

    return value !== '' && value !== null && value !== undefined;
  }

  var STRICT_CHARS = /^[\x20-\x7F]*$/;
  // http://stackoverflow.com/a/46181/11236
  var EMAIL = /^(([^<>()\[\]\\.,;:\s@\"]+(\.[^<>()\[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  function checkEmail(options) {
    if (!options) {
      options = {};
    }

    return function(value) {
      if (typeof value === 'string') {
        value = value.trim();
      }

      if (options.strictCharacters) {
        if (!STRICT_CHARS.test(value)) {
          return false;
        }
      }

      return EMAIL.test(value);
    };
  }

  function required(value) {
    return present(value);
  }

  return {
    required: required,
    email: checkEmail(),
    cvc: $.payment.validateCardCVC,
    expiry: function(value) {
      var parts = value.split('/');
      return $.payment.validateCardExpiry.apply(this, parts);
    },
    cardNumber: $.payment.validateCardNumber
  }
});
