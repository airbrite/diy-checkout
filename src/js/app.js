define(function(require) {
  'use strict';

  var $ = require('jquery');
  var templates = require('templates');
  var form = require('form').initialize();
  var confirmation = require('confirmation').initialize();
  var formatMoney = require('format').formatMoney;
  var shop = require('shop');
  var celeryClient = require('celery_client');

  return {
    initialize: function() {
      var $overlay = this.$overlay = $(templates.overlay);
      var $modal = this.$el = $(templates.modal);
      var $form = this.$form = form.$el;
      var $confirmation = this.$confirmation = confirmation.$el;

      this.children = [$overlay, $modal];

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

      // Build form
      $form.find('.Celery-Icon--card').append($(templates.svg.card));
      $form.find('.Celery-Icon--cvc').append($(templates.svg.cvc));
      $form.find('.Celery-Icon--date').append($(templates.svg.date));
      $form.find('.Celery-Icon--email').append($(templates.svg.email));

      this.$modalBody = $modal.find('.Celery-Modal-body');

      this.$el.on('click', '.Celery-ModalClose', this.hide);

      $form.on('valid', this.createOrder);
      $form.on('change', 'select', this.updateOrderSummary);

      $form.find('select').change();

      this.fetchShop();
      this.showShop();

      return this;
    },

    fetchShop: function() {
      shop.fetch(this.updateOrderSummary);
    },

    show: function() {
      var self = this;
      $(document.body).append(this.children);
      // next tick
      setTimeout(function() {
        self.$overlay.removeClass('u-hidden');
        self.$el.removeClass('u-hidden');
      }, 0);
      return this;
    },

    hide: function() {
      this.$overlay.addClass('u-hidden');
      this.$el.addClass('u-hidden');
      return this;
    },

    updateOrderSummary: function() {
      var shopData = shop.data;

      if (!shopData) return;

      var quantity = this._getQuantity();
      var price = formatMoney(this._getPrice());
      var shipping = formatMoney(this._getShipping());
      var total = formatMoney(this._getTotal());

      var $form = this.$form;

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
    },

    handleError: function(err) {
      var $errors = this.$form.find('.Celery-FormSection--errors');

      $errors.find('.Celery-FormSection-body').text(err.message);
      $errors.removeClass('u-hidden');
      form.enableBuyButton();
    },

    showShop: function() {
      this.$modalBody.append(this.$form);
    },

    showConfirmation: function(data) {
      confirmation.render(data);
      this.$form.detach();
      this.$modalBody.append(confirmation.$el);
      this.$modalBody.addClass('Celery-Modal-body--confirmation');
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
