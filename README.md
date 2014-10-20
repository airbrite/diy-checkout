Custom Checkout Example
============

![Checkout Start Page](http://cl.ly/image/3J0t0r2c0a2V/Desktop%20-%20Start.png)
![Checkout Confirmation Page](http://cl.ly/image/170Q0E3Z3V0M/Desktop%20-%20Thank%20You.png)

> 1. **What is this?** This is an example of a custom, self-hosted checkout that is powered by the [Celery Pre-Order API](https://github.com/airbrite/celery-api). The style and functionality is inspired by the minimalist checkout used by [Coin](https://onlycoin.com/). You can add this checkout to any website and start selling with it right away.<br/><br/>
> 1. **Why would I want this?** You can easily make a beautifully branded and high-converting checkout. And because it's powered by Celery backend, you'll automatically get robust e-commerce features and order management. Most likely, you'll fit one of these two use cases:
    1. I'm a person or company with a product and a website, and I want a quick way to set up pre-orders or crowdfunding campaigns with a custom checkout UI without having to deal with building an e-commerce backend.
    1. I'm an existing Celery merchant and I've outgrown the existing out-of-the-box checkout UI customizations.<br/><br/>
> 1. **What can I do with this?** You can tailor and extend the checkout interface and user experience into whatever you want or just use it as inspiration for your own checkout. A live example is [Plastc Card](http://cl.ly/1C362x412I1N)

## Prerequisites

* A [Celery](https://trycelery.com) account
* Your own website
* Your website must use SSL
* jQuery

## Functional Specification

**Checkout Features**

* One-page checkout
* Collect shipping addresses later
* Quantity selection
* Shipping country and ZIP/postal code
* Shipping rates based on country 
* Tax rates based on country or United States ZIP code
* Promo/coupon codes
* Social share buttons to Facebook, Twitter, and Pinterest
* Credit card validation via Stripe

**Checkout Limitations**

* Stripe only (no PayPal or Affirm support)
* No state-level shipping rate overrides
* No product options or variants support

## Getting Started

1. Create a product on [Celery](https://trycelery.com)
1. Note your product slug or ID
  * If you are in the dashboard, go to the product you want to sell. The ID is after `products` in the URL, ex. `/products/[id]`
1. Add `data-celery="[id or slug]"` to your button element

    ```html
    <!-- Example button element -->
    <a href="#" data-celery="53ebdd5e1fd9c90400553dab">Pre-Order</a>
    ```

1. Add [dist/celery-cart.min.js](https://github.com/airbrite/diy-checkout/blob/master/dist/celery-cart.min.js) and [dist/celery.css](https://github.com/airbrite/diy-checkout/blob/master/dist/celery.css) to your site, where you put it is up to you:

    ```html
    <!-- Include jQuery before celery-cart.min.js -->
    <script src="jquery.js"></script>
    
    <script src="celery-cart.min.js"></script>
    <link rel="stylesheet" href="celery.css" />
    ```

1.  Click on your "Pre-Order" link


## Customizing the Checkout

Currently, you must manually customize the templates to set the countries, quantity options, and copy (header, footer, etc). In the future, this will be more easily configured.

The templates are written in using Mustache ([Hogan](http://twitter.github.io/hogan.js/)).

### Get up and running

1. Fork this repo
1. Install dependencies
  1. [Install node/npm](http://nodejs.org/)
  1. Run `npm install` in this repo folder
1. Run `npm run serve` to automatically start processing file changes and start a server
1. Replace `data-celery` value in `src/index.html` with your product id/slug
1. Open `http://localhost:8000/src` in a browser

### Edit features

Edit `src/js/config.js` and flip any feature flags before building. For example:

```js
{
  features: {
    taxes: true,
    coupons: true
  }
}
```

### Customize text and styling

1. To edit text and content, edit the files located in  `src/templates`
2. To customize styling, edit the files located in `src/less`
  * **Note:** After editing and saving the `.less` files, the CSS will automatically update in the browser without refreshing. You will be able to see the styling changes almost instantly.

### Put it on your website

1. When you are done customizing, run `npm run build` to generate the minimized files in `dist`
1. Include the newly generated `dist/celery-cart.min.js` and `dist/celery.css` on your site, where you put it is up to you:

    ```html
    <!-- Include jQuery before celery-cart.min.js -->
    <script src="jquery.js"></script>
    
    <script src="celery-cart.min.js"></script>
    <link rel="stylesheet" href="celery.css" />
    ```

1. Click on your "Pre-Order" link. The checkout UI should pop up.
1. **Congrats!** You are ready to sell via your very own custom checkout.

If you have any questions or feedback on the process, please create a Github issue for this repo. Thanks!

**IE9 Support**<br/>
If you want to support IE9, you must include some some plugins for placeholders and CORS support.

* For XDR plugin for Cross Domain calls, we recommend [jQuery-ajaxTransport-XDomainRequest](https://github.com/MoonScript/jQuery-ajaxTransport-XDomainRequest)
* For placeholder polyfill, we recommend [placeholdr](https://github.com/vote539/placeholdr)
* For input validation, we recommend [jQuery Splendid Textchange](https://github.com/pandell/jquery-splendid-textchange)

## Future

This is just an example, you can shape it into whatever you want or just use it as inspiration for your own checkout. Here are some things we will be adding to the example.

### CSS/LESS

* A customization config file will be available for easy basic customizations
* More explicit styles to reduce weird interactions with existing CSS

### Celery Feature Incompatibilities

**Note:** If you have any of these features configured in your Celery dashboard, they are not yet compatible with this DIY Checkout.

**Products**

* Product Options and Variants
* Product Collections

**Payments Settings**

* PayPal
* Affirm

**Checkout Settings**

* Require shipping address
* Require company name
* Require phone number
* Optional "Add notes for seller"
* "Message to your buyers"
* Custom tracking scripts
* Custom confirmation page

**Apps**

* Google Analytics

