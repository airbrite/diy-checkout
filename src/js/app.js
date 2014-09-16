define(function(require) {
  'use strict';

  var $ = require('jquery');
  var celeryClient = require('celery_client');
  var shop = require('shop');
  var config = require('config');

  var templates = require('templates/index');
  var overlayTemplate = templates.overlay;
  var modalTemplate = templates.modal;
  var formatMoney = require('format').formatMoney;
  var form = require('form').initialize();
  var confirmation = require('confirmation').initialize();

  return {
    initialize: function(options) {
      if (this.initialized) {
        return this;
      }

      if (options && options.slug) {
        celeryClient.config.slug = options.slug;
      }

      var $overlay = this.$overlay = $(overlayTemplate());
      var $modal = this.$el = $(modalTemplate());
      var $form = this.$form = form.$el;
      var $confirmation = this.$confirmation = confirmation.$el;

      this.children = [$overlay, $modal];

      // Tax cache
      this._taxes = {};

      // Binding
      $.each([
        'show',
        'hide',
        'updateOrderSummary',
        'createOrder',
        'handleOrder',
        'handleError',
        'showShop',
        'showConfirmation'
      ], $.proxy(function(i, methodName) {
        this[methodName] = $.proxy(this[methodName], this);
      }, this));

      this.$modalBody = $modal.find('.Celery-Modal-body');

      // Currently does not take slug from data-celery
      $(document.body).on('click', '[data-celery]', this.show);
      this.$el.on('click', '.Celery-ModalCloseButton', this.hide);

      $form.on('valid', this.createOrder);
      $form.on('change', 'select, [name=shipping_zip]', this.updateOrderSummary);

      $form.find('select').change();

      this.preloadShop();
      this.showShop();

      this.initialized = true;

      return this;
    },

    preloadShop: function() {
      var el = $('[data-celery]').first();
      var slug = el && $(el).data('celery') || '';

      if (slug) {
        celeryClient.config.slug = slug;
      }

      this.fetchShop();
    },

    fetchShop: function() {
      shop.fetch(this.updateOrderSummary);
    },

    show: function() {
      var self = this;
      $(document.body).append(this.children);
      this.showShop();
      this.$overlay.removeClass('u-hidden');
      this.$el.removeClass('u-hidden');

      // next tick
      setTimeout(function() {
        // is-hidden uses opacity/transform so the transition occurs
        self.$overlay.removeClass('is-hidden');
        self.$el.removeClass('is-hidden');
      }, 0);
      return this;
    },

    hide: function() {
      var self = this;

      this.clear();

      // is-hidden uses opacity/transform so the transition occurs
      this.$overlay.addClass('is-hidden');
      this.$el.addClass('is-hidden');

      setTimeout(function() {
        self.$overlay.addClass('u-hidden');
        self.$el.addClass('u-hidden');
        self.showShop();
      }, 300);

      return this;
    },

    clear: function() {
      this.$form.find('input').val('');
      this.$form.find('.is-invalid, .is-valid').removeClass('is-invalid is-valid');
    },

    updateOrderSummary: function() {
      var shopData = shop.data;

      if (!shopData) return;

      var quantity = this._getQuantity();
      var price = formatMoney(this._getPrice());
      var shipping = formatMoney(this._getShipping());
      var total = formatMoney(this._getTotal());

      var $form = this.$form;

      if (config.features.taxes && celeryClient.config.userId) {
        this.updateTaxes();
      }

      $form.find('.Celery-OrderSummary-price--price').text(price);
      $form.find('.Celery-OrderSummary-price--shipping').text(shipping);
      $form.find('.Celery-OrderSummary-price--total').text(total);
      $form.find('.Celery-OrderSummary-number--quantity').text(quantity);
    },

    createOrder: function() {
      var order = this._generateOrder();

      celeryClient.createOrder(order, this.handleOrder);
    },

    handleOrder: function(err, res) {
      if (err) {
        return this.handleError(err);
      }

      this.showConfirmation(res.data);
      this.onConfirmation(res.data);
    },

    onConfirmation: function(data) {
      // Runs on confirmation with order data
    },

    handleError: function(err) {
      var $errors = this.$form.find('.Celery-FormSection--errors');

      $errors.find('.Celery-FormSection-body').text(err.message);
      $errors.removeClass('u-hidden');
      form.enableBuyButton();
    },

    hideErrors: function() {
      var $errors = this.$form.find('.Celery-FormSection--errors');
      $errors.addClass('u-hidden');
    },

    hideHeader: function() {
      this.$el.find('.Celery-Modal-header').addClass('is-hidden');
    },

    showHeader: function() {
      this.$el.find('.Celery-Modal-header').removeClass('is-hidden');
    },

    showShop: function() {
      this.showHeader();
      this.hideErrors();
      this.$confirmation.detach();
      this.$modalBody.append(this.$form);
    },

    showConfirmation: function(data) {
      confirmation.render(data);
      this.hideHeader();
      this.$form.detach();
      this.$modalBody.append(confirmation.$el);
    },

    updateTaxes: function() {
      var countryCode = this._getCountry();
      var zip = this._getZip();

      if (this._taxes[countryCode + zip] !== undefined) {
        var taxRate = this._taxes[countryCode + zip];
        var tax = taxRate * this._getQuantity() * this._getPrice();

        tax = formatMoney(tax);
        this.$form.find('.Celery-OrderSummary-price--taxes').text(tax);

        return;
      }

      celeryClient.fetchTaxes({
        shipping_country: countryCode,
        shipping_zip: zip
      }, $.proxy(function(err, data) {
        if (err || !data || !data.data || data.data.base === undefined) {
          return;
        }

        this._taxes[countryCode + zip] = data.data.base;

        this.updateTaxes();
      }, this))
    },

    _generateOrder: function() {
      var $form = this.$form;
      var order = {
        buyer: {},
        shipping_address: {},
        line_items: [],
        payment_source: {
          card: {
            number: '',
            exp_month: '',
            exp_year: '',
            cvc: ''
          }
        }
      };

      order.user_id = shop.data.user_id;
      order.buyer.email = $form.find('[name=email]').val();

      // Card
      var card = order.payment_source.card;

      card.number = $form.find('[name=card_number]').val();
      card.cvc = $form.find('[name=cvc]').val();

      // Card Expiry
      var expiryParts = $form.find('[name=expiry]').val().split('/');

      card.exp_month = expiryParts[0].trim();
      card.exp_year = expiryParts[1].trim();

      // Shipping
      order.shipping_address.country = $form.find('[name=country]').val();

      if (config.features.taxes) {
        order.shipping_address.zip = $form.find('[name=shipping_zip]').val()
      }

      // Line Item
      var lineItem = {
        product_id: shop.data.product._id,
        quantity: this._getQuantity()
      };

      order.line_items.push(lineItem);

      return order;
    },

    _getQuantity: function() {
      return this.$form.find('[name=quantity]').val();
    },

    _getCountry: function() {
      return this.$form.find('[name=country]').val();
    },

    _getZip: function() {
      var $zip = this.$form.find('[name=shipping_zip]');

      if (!$zip.length) {
        return;
      }

      return $zip.val();
    },

    _getPrice: function() {
      return shop.data.product && shop.data.product.price;
    },

    _getShipping: function() {
      var quantity = this._getQuantity();
      var rates = this._getShippingRates();

      if (!rates) {
        return 0;
      }

      var base = rates.base || 0;
      var item = rates.item || 0;

      if (!base && !item) {
        return 0;
      }

      return base + ((quantity - 1) * item);
    },

    // Gets shipping rates based on country, falls back to base
    _getShippingRates: function() {
      var rates = shop.data.shipping_rates;
      var result = rates;

      if (!rates || !rates.countries || !rates.countries.length) {
        return result;
      }

      var countryCode = this._getCountry();

      $.each(rates.countries, function(i, country) {
        if (country.code === countryCode) {
          result = country;
          return;
        }
      });

      return result;
    },

    _getTotal: function() {
      var quantity = this._getQuantity();
      var price = this._getPrice();
      var shipping = this._getShipping();

      return (quantity * price) + shipping;
    }
  };
});
