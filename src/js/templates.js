define(function(require) {
  var tmpl = require('tmpl');

  return {
    confirmation: tmpl(require('text!../templates/confirmation.tmpl')),
    form: require('text!templates/form.html'),
    overlay: require('text!templates/overlay.html'),
    modal: require('text!templates/modal.html'),
    svg: {
      card: require('text!templates/svg/card.svg'),
      check: require('text!templates/svg/check.svg'),
      cvc: require('text!templates/svg/cvc.svg'),
      date: require('text!templates/svg/date.svg'),
      email: require('text!templates/svg/email.svg'),
      facebook: require('text!templates/svg/facebook.svg'),
      twitter: require('text!templates/svg/twitter.svg')
    }
  };
});
