define(function(require) {
  'use strict';

  var $ = require('jquery');
  var celeryClient = require('celery_client');
  var shop = require('shop');
  var coupon = require('coupon');
  var config = require('config');
  var debounce = require('util').debounce;

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
        'updateDiscount',
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
      $form.on('change', 'select, [name=shipping_zip]',
        this.updateOrderSummary);
      $form.on('keyup', '[name=coupon]', debounce(this.updateDiscount, 500));

      $form.find('select').change();

      this.showShop();

      this.initialized = true;

      return this;
    },

    loadShop: function() {
      // TODO: Support passing slug
      var el = $('[data-celery]').first();
      var slug = el && $(el).data('celery') || '';

      if (slug) {
        celeryClient.config.slug = slug;
      }

      shop.fetch(this.updateOrderSummary);
    },

    show: function() {
      var self = this;

      // Load shop data if it wasn't loaded yet
      if (!shop.data.user_id) {
        this.loadShop();
      }

      $(document.body).append(this.children);
      this.showShop();
      // Sets display
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
        // Sets display after 300ms
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

      var $form = this.$form;

      if (config.features.taxes && celeryClient.config.userId) {
        this.updateTaxes();
      }

      if (config.features.coupons && celeryClient.config.userId) {
        this.updateDiscount();
      }

      this.updateTotal();

      $form.find('.Celery-OrderSummary-price--price').text(price);
      $form.find('.Celery-OrderSummary-price--shipping').text(shipping);
      $form.find('.Celery-OrderSummary-number--quantity').text(quantity);
    },

    createOrder: function() {
      this._generateOrder(function(order) {
        celeryClient.createOrder(order, this.handleOrder);
      }.bind(this));
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
      confirmation.$el.detach();
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

      // Cache hit
      if (this._taxes[countryCode + zip] !== undefined) {
        var taxRate = this._taxes[countryCode + zip];
        var tax = taxRate * this._getSubtotal();

        tax = formatMoney(tax);
        this.$form.find('.Celery-OrderSummary-price--taxes').text(tax);
        this.updateTotal();

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
      }, this));
    },

    // Coupon adds a discount
    updateDiscount: function() {
      var code = this._getCouponCode();
      var priceSelector = '.Celery-OrderSummary-price--coupon';
      var operatorSelector = '.Celery-OrderSummary-operator.coupon';
      var lineSelector = '.Celery-OrderSummary-line.coupon';
      var groupSelector = lineSelector + ', ' + operatorSelector;

      coupon.validate(code, $.proxy(function(valid) {
        var discount;

        this.updateTaxes();
        this.updateTotal();

        // TODO: Move coupon live validation to form
        form._setCouponValidationClass(valid);

        if (!valid || code === '') {
          $(groupSelector).hide();
          return;
        }

        // TODO: Discount logic instead of assuming single flat amount
        discount = formatMoney(this._getDiscount());

        $(priceSelector).text(discount);
        $(groupSelector).show();
      }, this));
    },

    updateTotal: function() {
      var total = formatMoney(this._getTotal());

      this.$form.find('.Celery-OrderSummary-price--total').text(total);
    },

    _generateOrder: function(callback) {
      this._createStripeToken(this._getCard(), function(err, token) {
        if (err) {
          return this.handleError(err);
        }

        var order = {
          buyer: {},
          shipping_address: {},
          line_items: [],
          payment_source: {
            card: {
              stripe_token: '',
            }
          }
        };

        // Set stripe token
        if (token) {
          order.payment_source.card.stripe_token = token.id;
        }

        order.user_id = shop.data.user_id;
        order.buyer.email = this._getFieldValue('email');

        // Set shipping
        order.shipping_address.country = this._getCountry();

        // Set taxes
        if (config.features.taxes) {
          order.shipping_address.zip = this._getZip();
        }

        // Set coupon
        if (config.features.coupons) {
          var couponCode = this._getCouponCode();

          if (couponCode) {
            order.discount_codes = [couponCode];
          }
        }

        // Set line item
        var lineItem = {
          product_id: shop.data.product._id,
          quantity: this._getQuantity()
        };

        order.line_items.push(lineItem);

        return callback(order)
      }.bind(this));
    },

    _getCard: function() {
      if (this._getTotal() === 0) {
        return null;
      }

      // Card Expiry
      var expiry = this._getFieldValue('expiry');
      var expiryParts = expiry.split('/');

      return {
        number: this._getFieldValue('card_number'),
        cvc: this._getFieldValue('cvc'),
        exp_month: expiryParts[0].trim(),
        exp_year: expiryParts[1].trim(),
      }
    },

    _createStripeToken: function(card, callback) {
      var Stripe = window.Stripe || {};

      if (!card) {
        return callback(null, null);
      }

      Stripe.card.createToken(card, function(status, response) {
        if (response.error) {
          return callback(response.error);
        }

        return callback(null, response);
      });
    },

    _getDiscount: function() {
      // TODO: Replace with coupon logic
      var code = this._getCouponCode();
      var data = coupon.data[code];

      return data && data.amount || 0;
    },

    _getCouponCode: function() {
      var code = this._getFieldValue('coupon') || '';

      return code.toLowerCase();
    },

    _getQuantity: function() {
      return this._getFieldValue('quantity');
    },

    _getCountry: function() {
      return this._getFieldValue('country');
    },

    _getZip: function() {
      return this._getFieldValue('shipping_zip');
    },

    _getFieldValue: function(fieldName) {
      var $field = this.$form.find('[name=' + fieldName + ']');

      if (!$field.length) {
        return;
      }

      return $field.val();
    },

    _getPrice: function() {
      return shop.data.product && shop.data.product.price;
    },

    _getLineItemsTotal: function() {
      return this._getPrice() * this._getQuantity();
    },

    _getSubtotal: function() {
      var lineItemsTotal = this._getLineItemsTotal();
      var discount = this._getDiscount();

      return Math.max(lineItemsTotal - discount, 0);
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

    _getTaxes: function() {
      var countryCode = this._getCountry();
      var zip = this._getZip();

      if (this._taxes[countryCode + zip] !== undefined) {
        var taxRate = this._taxes[countryCode + zip];
        var taxes = taxRate * this._getSubtotal();

        return taxes;
      }

      return 0;
    },

    _getTotal: function() {
      var subtotal = this._getSubtotal();
      var shipping = this._getShipping();
      var taxes = this._getTaxes();

      return subtotal + shipping + taxes;
    }
  };
});
