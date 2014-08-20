define(function(require) {
  'use strict';

  var $ = require('jquery');
  var Celery = require('celery-js');
  var templates = require('templates');
  var form = require('form').initialize();
  var formatMoney = require('format').formatMoney;

  var celeryClient = new Celery({
    // Remove/comment out apiHost
    apiHost: 'http://api-sandbox.trycelery.com',
    // Replace example slug with your product ID
    slug: '53ebdd5e1fd9c90400553dab'
  });

  return {
    initialize: function() {
      var $overlay = $(templates.overlay);
      var $modal = this.$el = $(templates.modal);
      var $form = this.$form = form.$el;

      this.children = [$overlay, $modal];

      // Binding
      this._setShop = $.proxy(this._setShop, this);
      this.updateOrderSummary = $.proxy(this.updateOrderSummary, this);
      this.createOrder = $.proxy(this.createOrder, this);

      // Build form
      $form.find('.Celery-Icon--card').append($(templates.svg.card));
      $form.find('.Celery-Icon--cvc').append($(templates.svg.cvc));
      $form.find('.Celery-Icon--date').append($(templates.svg.date));
      $form.find('.Celery-Icon--email').append($(templates.svg.email));

      $modal.find('.Celery-Modal-body').append($form);

      $form.on('valid', this.createOrder);
      $form.on('change', 'select', this.updateOrderSummary);

      $form.find('select').change();

      this.fetchShop();
      this.show();
    },

    fetchShop: function() {
      celeryClient.fetchShop(null, this._setShop);
    },

    _setShop: function(err, data) {
      if (err) {
        return;
      }

      this.shop = data.data;

      this.updateOrderSummary();
    },

    show: function() {
      var self = this;
      $(document.body).append(this.children);
      // next tick
      setTimeout(function() {
        self.$el.removeClass('is-hidden');
      }, 0);
      return this;
    },

    hide: function() {
      this.$el.addClass('is-hidden');
      return this;
    },

    updateOrderSummary: function() {
      var shopData = this.shop;

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

      celeryClient.createOrder(order);
    },

    _generateOrder: function() {
      var $form = this.$form;
      var shop = this.shop;
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

      order.user_id = shop.user_id;
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
        product_id: shop.product._id,
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
      return this.shop.product.price;
    },

    _getShipping: function() {
      var quantity = this._getQuantity();
      var rates = this._getShippingRates();

      var base = rates.base || 0;
      var item = rates.item || 0;

      if (!base && !item) {
        return 0;
      }

      return base + ((quantity - 1) * item);
    },

    // Gets shipping rates based on country, falls back to base
    _getShippingRates: function() {
      var rates = this.shop.shipping_rates;
      var result = rates;

      if (!rates.countries.length) {
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
