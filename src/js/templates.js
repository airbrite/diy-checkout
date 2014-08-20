define(function(require) {
  require('text!templates/form.html');

  return {
    form: require('text!templates/form.html'),
    overlay: require('text!templates/overlay.html'),
    modal: require('text!templates/modal.html'),
    svg: {
      card: require('text!templates/svg/card.svg'),
      cvc: require('text!templates/svg/cvc.svg'),
      date: require('text!templates/svg/date.svg'),
      email: require('text!templates/svg/email.svg')
    }
  };
});
