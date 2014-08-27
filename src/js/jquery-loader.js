define(function() {
  var jquery = window.jQuery || window.$;

  if (!jquery) {
    return console.error('jQuery must be loaded before CeleryCart');
  }

  return jquery;
});
