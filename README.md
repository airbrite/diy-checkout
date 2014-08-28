Celery Cart Example
============

> Example of how to create an order

## Prerequisites

* Your site must use SSL
* jQuery
* If you want to support IE8/9, you must include an XDR plugin for Cross Domain calls. We recommend this one: https://github.com/MoonScript/jQuery-ajaxTransport-XDomainRequest

## Getting Started

* Create a product on [Celery](https://trycelery.com)
* Note your product slug
  * If you are in the dashboard, go to the product you want to sell. The slug is after `products` in the URL, ex. `/products/[slug]`.
* Add `data-celery="[slug]"` to your button element.
  * ex. `<a href="#" data-celery="53ebdd5e1fd9c90400553dab">Pre-Order</a>`
* Add [dist/celery-cart.min.js](https://github.com/airbrite/diy-checkout/blob/master/dist/celery-cart.min.js) and [dist/celery.css](https://github.com/airbrite/diy-checkout/blob/master/dist/celery-cart.min.js) to your site

```html
<script src="celery-cart.min.js"></script>
<link rel="stylesheet" href="celery.css" />
```

* Click on your button


## Customization

Currently, you must manually customize the templates to set the countries, quantity options, and copy (header, footer, etc). In the future, this will be more easily configured.

* Clone this repo
* [Install node/npm](http://nodejs.org/)
* Install Bower `npm install -g bower`
* Run `npm install && bower install` in this repo folder
* Run `npm run serve` to automatically start processing file changes and start a server
* Replace `data-celery` value in `src/index.html` with your product slug
* Open http://localhost:8000/src in a browser
* Edit templates in `src/templates`

When you are done customizing, run `npm run build` to generate the minimized files in `dist`.
