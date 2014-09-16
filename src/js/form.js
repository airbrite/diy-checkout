define(function(require) {
  'use strict';

  var config = require('config');
  var template = require('templates/index').form;
  var $ = require('jquery');
  var validate = require('validation');
  require('jquery.payment');

  // Icons
  var cardIcon = require('text!templates/svg/card.svg');
  var cvcIcon = require('text!templates/svg/cvc.svg');
  var dateIcon = require('text!templates/svg/date.svg');
  var emailIcon = require('text!templates/svg/email.svg');

  return {
    initialize: function() {
      this.render();
      this.initFormatting();

      this.$buyButton = this.$el.find('.Celery-Button--buy');

      this.submit = $.proxy(this.submit, this);
      this.validate = $.proxy(this.validate, this);
      this.validateField = $.proxy(this.validateField, this);
      this.liveValidate = $.proxy(this.liveValidate, this);

      this.$buyButton.on('click', $.proxy(function() {
        this.$el.submit();
      }, this));

      this.$el.on('submit', this.submit);
      this.$el.on('input', 'input', this.liveValidate);
      this.$el.on('blur', 'input', this.validateField);

      return this;
    },

    $el: null,
    template: template,

    render: function() {
      var data = $.extend({}, config);
      var $el = this.$el = $(this.template(data));

      $el.find('.Celery-Icon--card').append($(cardIcon));
      $el.find('.Celery-Icon--cvc').append($(cvcIcon));
      $el.find('.Celery-Icon--date').append($(dateIcon));
      $el.find('.Celery-Icon--email').append($(emailIcon));
    },

    initFormatting: function() {
      this.$cardEl = this.$el.find('.Celery-TextInput--cardNumber')
        .payment('formatCardNumber');

      this.$expiryEl = this.$el.find('.Celery-TextInput--expiry')
        .payment('formatCardExpiry');

      this.$cvcEl = this.$el.find('.Celery-TextInput--cvc')
        .payment('formatCardCVC');
    },

    validate: function() {
      var valid = true;

      this.$el.find('[data-celery-validate]').each($.proxy(function(i, el) {
        var isValid = this.validateField(el);

        if (!isValid) {
          valid = false;

          return true;
        }
      }, this));

      return valid;
    },

    validateField: function(el) {
      var $el;

      if (el && el.currentTarget) {
        $el = $(el.currentTarget);
        el = el.currentTarget;
      } else {
        $el = $(el);
      }

      var type = $el.data('celery-validate');
      var isValid = validate[type]($el.val());

      this._setValidationClass(el, isValid);

      $el.data('celery-livevalidate', '');

      return isValid;
    },

    // Only validate if data-celery-livevalidate is set
    // Only gets set after it validates once
    liveValidate: function(e) {
      var $el = $(e.currentTarget);

      if ($el.data('celery-livevalidate') === undefined) {
        return;
      }

      this.validateField($el);
    },

    _setValidationClass: function(el, isValid) {
      var $el = $(el);
      $el.toggleClass('is-invalid', !isValid);
      $el.toggleClass('is-valid', isValid);
    },

    enableBuyButton: function() {
      this.$buyButton
        .removeClass('is-disabled')
        .text(this.buyButtonText);
    },

    disableBuyButton: function() {
      this.buyButtonText = this.$buyButton.text();
      this.$buyButton
        .addClass('is-disabled')
        .text('Processing...');
    },

    submit: function(e) {
      if (e && e.preventDefault) {
        e.preventDefault();
      }

      var disabledClass = 'is-disabled';

      if (this.$buyButton.hasClass(disabledClass)) {
        return;
      }

      this.disableBuyButton();

      var valid = this.validate();

      if (!valid) {
        this.enableBuyButton();
        return;
      }

      this.$el.trigger('valid');
    }
  };
});
