define(function(require) {
  var templates = require('templates');
  var shopData = require('shop').data;

  return {
    initialize: function(data) {
      data = data || {number: 1};
      this.data = data || this.data || {};
      this.render();
      return this;
    },

    $el: null,
    template: templates.confirmation,
    render: function(data) {
      data = data || this.data || {};
      data.twitterHref = this.generateTwitterHref();
      data.facebookHref = this.generateFacebookHref();
      data.mailHref = this.generateMailHref();

      var $el = this.$el = $(this.template(data));

      this._appendIcons();

      return this;
    },

    generateFacebookHref: function(data) {
      var website = this._getWebsite();
      var slug = this._getSlug();

      var qs = $.param({
        u: website
      });

      return 'https://www.facebook.com/sharer/sharer.php?' + qs;
    },

    generateTwitterHref: function(data) {
      var twitterHandle = shopData.twitter;
      var productName = this._getProductName();
      var website = this._getWebsite();
      var slug = this._getSlug();

      // Build the share text string
      var pieces = [];

      if (productName) {
        pieces.push('Check out ' + productName);
      }

      if (twitterHandle) {
        pieces.push('from ' + twitterHandle);
      }

      pieces.push('on @trycelery');

      var qs = $.param({
        url: website,
        text: pieces.join(' ')
      });

      return 'http://twitter.com/share?' + qs;
    },

    generateMailHref: function(data) {
      var productName = this._getProductName();
      var website = this._getWebsite();

      return 'mailto:?subject=Check out ' + productName + '&body=Check out ' + productName + ': ' + website;
    },

    _appendIcons: function() {
      var $el = this.$el;
      var $check = $(templates.svg.check);
      var $twitter = $(templates.svg.twitter);
      var $facebook = $(templates.svg.facebook);
      var $email = $(templates.svg.email);

      $el.find('.Celery-Icon--check').append($check);
      $el.find('.Celery-Icon--twitter').append($twitter);
      $el.find('.Celery-Icon--facebook').append($facebook);
      $el.find('.Celery-Icon--email').append($email);
    },

    _getSlug: function() {
      return this._getProduct()._id;
    },

    _getProduct: function(data) {
      return shopData.product || {};
    },

    _getProductName: function(data) {
      return this._getProduct().name;
    },

    _getWebsite: function() {
      var slug = this._getSlug();
      return shopData.website || 'https://shop.trycelery.com/page/' + slug;
    }
  }
});
