Celery Cart Example
============

> Example of how to create a self-hosted Celery powered cart

## Prerequisites

* Your site must use SSL
* jQuery
* If you want to support IE8/9, you must include an XDR plugin for Cross Domain calls. We recommend this one: https://github.com/MoonScript/jQuery-ajaxTransport-XDomainRequest

## Limitations

- Stripe only
- No state-level shipping rate overrides
- No taxes on checkout
- No "Message to buyer"
- No collections support
- No product options or variants support

## Getting Started

1. Create a product on [Celery](https://trycelery.com)
1. Note your product slug or ID
  * If you are in the dashboard, go to the product you want to sell. The ID is after `products` in the URL, ex. `/products/[id]`.
1. Add `data-celery="[id or slug]"` to your button element.
  * ex. `<a href="#" data-celery="53ebdd5e1fd9c90400553dab">Pre-Order</a>`
1. Add [dist/celery-cart.min.js](https://github.com/airbrite/diy-checkout/blob/master/dist/celery-cart.min.js) and [dist/celery.css](https://github.com/airbrite/diy-checkout/blob/master/dist/celery.css) to your site, where you put it is up to you:

```html
<!-- jQuery goes before celery-cart.min.js -->
<script src="jquery.js"></script>

<script src="celery-cart.min.js"></script>
<link rel="stylesheet" href="celery.css" />
```

* Click on your button


## Customization

Currently, you must manually customize the templates to set the countries, quantity options, and copy (header, footer, etc). In the future, this will be more easily configured.

1. Clone this repo
1. Install dependencies
  1. [Install node/npm](http://nodejs.org/)
  1. Run `npm install` in this repo folder
1. Run `npm run serve` to automatically start processing file changes and start a server
1. Replace `data-celery` value in `src/index.html` with your product id/slug
1. Open `http://localhost:8000/src` in a browser
1. Edit  `src/templates` and `src/less`
  * **Note:** After editing `.less` files, the CSS will automatically update in the browser without refreshing
1. When you are done customizing, run `npm run build` to generate the minimized files in `dist`
1. Follow instructions in [Getting Started](#getting-started)

### Future

This is just an example, you can shape it into whatever you want or just use it as inspiration for your own checkout. Here are some things we will be adding to the example.

#### CSS/LESS

* A customization config file will be available for easy basic customizations.
* More explicit styles to reduce weird interactions with existing CSS

#### Features (tentative)

* Variant support
* Tax/Zip Code support
* "Message to Buyer" support
