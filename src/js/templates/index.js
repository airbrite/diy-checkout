define(['hogan'], function(Hogan) {
  var t = {
    /* jshint ignore:start */
    'confirmation' : new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"Celery-OrderConfirmation\">");t.b("\n" + i);t.b("  <span class=\"Celery-Icon Celery-Icon--check Celery-Icon--hero\">");t.b("\n" + i);t.b("  </span>");t.b("\n");t.b("\n" + i);t.b("  <div class=\"Celery-OrderConfirmation-header\">");t.b("\n" + i);t.b("    <h1 class=\"Celery-OrderConfirmation-heading\">");t.b("\n" + i);t.b("      ");t.b(t.v(t.f("thanks",c,p,0)));t.b("\n" + i);t.b("    </h1>");t.b("\n" + i);t.b("  </div>");t.b("\n");t.b("\n" + i);t.b("  <div class=\"Celery-OrderConfirmation-body\">");t.b("\n" + i);t.b("      ");t.b(t.v(t.f("emailConfirm",c,p,0)));t.b("\n" + i);t.b("  </div>");t.b("\n");t.b("\n" + i);t.b("  <div class=\"Celery-OrderConfirmation-footer\">");t.b("\n" + i);t.b("    <div class=\"Celery-OrderConfirmation-header\">");t.b("\n" + i);t.b("      <h2 class=\"Celery-OrderConfirmation-heading Celery-OrderConfirmation-heading--footer\">");t.b("\n" + i);t.b("        ");t.b(t.v(t.f("share",c,p,0)));t.b("\n" + i);t.b("      </h2>");t.b("\n" + i);t.b("    </div>");t.b("\n");t.b("\n" + i);t.b("    <a class=\"Celery-ReferralLink\"></a>");t.b("\n");t.b("\n" + i);t.b("    <div class=\"Celery-SocialButtons\">");t.b("\n" + i);t.b("      <ul class=\"Celery-SocialButtons-buttons\">");t.b("\n" + i);t.b("        <li class=\"Celery-SocialButtons-button Celery-SocialButtons-button--twitter\">");t.b("\n" + i);t.b("          <a class=\"Celery-Icon Celery-Icon--twitter\"");t.b("\n" + i);t.b("            href=\"");t.b(t.v(t.f("twitterHref",c,p,0)));t.b("\"");t.b("\n" + i);t.b("            target=\"_blank\">");t.b("\n" + i);t.b("            <span class=\"u-hiddenVisually\">Twitter</span>");t.b("\n" + i);t.b("          </a>");t.b("\n" + i);t.b("        </li>");t.b("\n" + i);t.b("        <li class=\"Celery-SocialButtons-button Celery-SocialButtons-button--facebook\">");t.b("\n" + i);t.b("          <a class=\"Celery-Icon Celery-Icon--facebook\"");t.b("\n" + i);t.b("            href=\"");t.b(t.v(t.f("facebookHref",c,p,0)));t.b("\"");t.b("\n" + i);t.b("            target=\"_blank\">");t.b("\n" + i);t.b("            <span class=\"u-hiddenVisually\">Facebook</span>");t.b("\n" + i);t.b("          </a>");t.b("\n" + i);t.b("        </li>");t.b("\n" + i);t.b("        <li class=\"Celery-SocialButtons-button Celery-SocialButtons-button--email\">");t.b("\n" + i);t.b("          <a class=\"Celery-Icon Celery-Icon--email\"");t.b("\n" + i);t.b("            href=\"");t.b(t.v(t.f("mailHref",c,p,0)));t.b("\"");t.b("\n" + i);t.b("            target=\"_blank\">");t.b("\n" + i);t.b("            <span class=\"u-hiddenVisually\">Email</span>");t.b("\n" + i);t.b("          </a>");t.b("\n" + i);t.b("        </li>");t.b("\n" + i);t.b("      </ul>");t.b("\n" + i);t.b("    </div>");t.b("\n" + i);t.b("  </div>");t.b("\n" + i);t.b("</div>");t.b("\n");return t.fl(); },partials: {}, subs: {  }}),
    'form' : new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<form class=\"Celery-Form\" novalidate>");t.b("\n" + i);t.b("  <div class=\"Celery-Form-body\">");t.b("\n");t.b("\n" + i);t.b("    <div class=\"Celery-FormSection Celery-FormSection--inline\">");t.b("\n" + i);t.b("      <div class=\"Celery-FormSection-header\">");t.b("\n" + i);t.b("        <h2 class=\"Celery-FormSection-heading\">");t.b("\n" + i);t.b("         ");t.b(t.v(t.f("quantity",c,p,0)));t.b("\n" + i);t.b("        </h2>");t.b("\n" + i);t.b("      </div>");t.b("\n");t.b("\n" + i);t.b("      <div class=\"Celery-FormSection-body\">");t.b("\n" + i);t.b("        <div class=\"Celery-Form-group Celery-Form-group--quantity\">");t.b("\n" + i);t.b("          <div class=\"Celery-Select\">");t.b("\n" + i);t.b("            <!-- Edit these options to set your quantity choices -->");t.b("\n" + i);t.b("            <select class=\"Celery-Select-select\" name=\"quantity\">");t.b("\n" + i);t.b("              <option value=\"1\">1</option>");t.b("\n" + i);t.b("              <option value=\"2\">2</option>");t.b("\n" + i);t.b("              <option value=\"3\">3</option>");t.b("\n" + i);t.b("              <option value=\"4\">4</option>");t.b("\n" + i);t.b("              <option value=\"5\">5</option>");t.b("\n" + i);t.b("            </select>");t.b("\n" + i);t.b("          </div>");t.b("\n" + i);t.b("        </div>");t.b("\n" + i);t.b("      </div>");t.b("\n" + i);t.b("    </div>");t.b("\n");t.b("\n" + i);t.b("    <div class=\"Celery-FormSection ");if(!t.s(t.d("features.taxes",c,p,1),c,p,1,0,0,"")){t.b("Celery-FormSection--inline");};t.b("\">");t.b("\n" + i);t.b("      <div class=\"Celery-FormSection-header\">");t.b("\n" + i);t.b("        <h2 class=\"Celery-FormSection-heading\">");t.b("\n" + i);t.b("          ");t.b(t.v(t.f("shipping",c,p,0)));t.b("\n" + i);t.b("        </h2>");t.b("\n" + i);t.b("      </div>");t.b("\n");t.b("\n" + i);t.b("      <div class=\"Celery-FormSection-body\">");t.b("\n" + i);t.b("        <div class=\"Celery-Form-group Celery-Form-group--country ");if(t.s(t.d("features.taxes",c,p,1),c,p,0,1234,1259,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("Celery-Form-group--inline");});c.pop();}t.b("\">");t.b("\n" + i);t.b("          <div class=\"Celery-Select\">");t.b("\n" + i);t.b("            <!-- Edit these options for the countries you wish to ship to -->");t.b("\n" + i);t.b("            <!-- \"zz\" is Unknown/TBD -->");t.b("\n" + i);t.b("            <select class=\"Celery-Select-select\" name=\"country\">");t.b("\n" + i);t.b("              <option value=\"");t.b(t.v(t.d("contry.us.value",c,p,0)));t.b("\">");t.b(t.v(t.d("contry.us.name",c,p,0)));t.b("</option>");t.b("\n" + i);t.b("              <option value=\"");t.b(t.v(t.d("contry.int.value",c,p,0)));t.b("\">");t.b(t.v(t.d("contry.int.name",c,p,0)));t.b("</option>");t.b("\n" + i);t.b("            </select>");t.b("\n" + i);t.b("          </div>");t.b("\n" + i);t.b("        </div>");t.b("\n");t.b("\n" + i);if(t.s(t.d("features.taxes",c,p,1),c,p,0,1743,2082,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("          <div class=\"Celery-Form-group Celery-Form-group--inline\">");t.b("\n" + i);t.b("            <input class=\"Celery-TextInput Celery-TextInput--zip\"");t.b("\n" + i);t.b("              type=\"text\"");t.b("\n" + i);t.b("              name=\"shipping_zip\"");t.b("\n" + i);t.b("              pattern=\"[\\w \\d-]*\"");t.b("\n" + i);t.b("              placeholder=\"Zip Code\"");t.b("\n" + i);t.b("              data-celery-validate=\"required\"/>");t.b("\n" + i);t.b("          </div>");t.b("\n" + i);});c.pop();}t.b("      </div>");t.b("\n" + i);t.b("    </div>");t.b("\n");t.b("\n" + i);t.b("    <div class=\"Celery-FormSection\">");t.b("\n" + i);t.b("      <div class=\"Celery-FormSection-header\">");t.b("\n" + i);t.b("        <h2 class=\"Celery-FormSection-heading\">");t.b("\n" + i);t.b("         ");t.b(t.v(t.f("contact",c,p,0)));t.b("\n" + i);t.b("        </h2>");t.b("\n" + i);t.b("      </div>");t.b("\n");t.b("\n" + i);t.b("      <div class=\"Celery-FormSection-body\">");t.b("\n" + i);t.b("        <div class=\"Celery-Form-group\">");t.b("\n" + i);t.b("          <input class=\"Celery-TextInput Celery-TextInput--email\"");t.b("\n" + i);t.b("            type=\"email\"");t.b("\n" + i);t.b("            placeholder=\"Email\"");t.b("\n" + i);t.b("            name=\"email\"");t.b("\n" + i);t.b("            data-celery-validate=\"email\" />");t.b("\n" + i);t.b("          <span class=\"Celery-Icon Celery-Icon--innerInput Celery-Icon--email\">");t.b("\n" + i);t.b("          </span>");t.b("\n" + i);t.b("        </div>");t.b("\n" + i);t.b("      </div>");t.b("\n" + i);t.b("    </div>");t.b("\n");t.b("\n" + i);t.b("    <div class=\"Celery-FormSection\">");t.b("\n" + i);t.b("      <div class=\"Celery-FormSection-header\">");t.b("\n" + i);t.b("        <h2 class=\"Celery-FormSection-heading\">");t.b("\n" + i);t.b("           ");t.b(t.v(t.f("pay",c,p,0)));t.b("\n" + i);t.b("        </h2>");t.b("\n" + i);t.b("      </div>");t.b("\n");t.b("\n" + i);t.b("      <div class=\"Celery-FormSection-body\">");t.b("\n" + i);t.b("        <div class=\"Celery-Form-group\">");t.b("\n" + i);t.b("          <input class=\"Celery-TextInput Celery-TextInput--cardNumber\"");t.b("\n" + i);t.b("            type=\"text\"");t.b("\n" + i);t.b("            name=\"card_number\"");t.b("\n" + i);t.b("            pattern=\"\\d*\"");t.b("\n" + i);t.b("            placeholder=\"Credit Card Number\"");t.b("\n" + i);t.b("            data-celery-validate=\"cardNumber\" />");t.b("\n" + i);t.b("          <span class=\"Celery-Icon Celery-Icon--innerInput Celery-Icon--card\">");t.b("\n" + i);t.b("          </span>");t.b("\n" + i);t.b("        </div>");t.b("\n" + i);t.b("        <div class=\"Celery-Form-group Celery-Form-group--inline Celery-Form-group--expiry\">");t.b("\n" + i);t.b("          <input class=\"Celery-TextInput Celery-TextInput--expiry\"");t.b("\n" + i);t.b("            type=\"text\"");t.b("\n" + i);t.b("            name=\"expiry\"");t.b("\n" + i);t.b("            pattern=\"\\d*\"");t.b("\n" + i);t.b("            placeholder=\"MM / YY\"");t.b("\n" + i);t.b("            data-celery-validate=\"expiry\"");t.b("\n" + i);t.b("            maxlength=\"7\" />");t.b("\n" + i);t.b("          <span class=\"Celery-Icon Celery-Icon--innerInput Celery-Icon--date\">");t.b("\n" + i);t.b("          </span>");t.b("\n" + i);t.b("        </div>");t.b("\n" + i);t.b("        <div class=\"Celery-Form-group Celery-Form-group--inline Celery-Form-group--cvc\">");t.b("\n" + i);t.b("          <input class=\"Celery-TextInput Celery-TextInput--cvc\"");t.b("\n" + i);t.b("            type=\"text\"");t.b("\n" + i);t.b("            name=\"cvc\"");t.b("\n" + i);t.b("            pattern=\"\\d*\"");t.b("\n" + i);t.b("            placeholder=\"CVC\"");t.b("\n" + i);t.b("            autocomplete=\"off\"");t.b("\n" + i);t.b("            data-celery-validate=\"cvc\"");t.b("\n" + i);t.b("            maxlength=\"4\" />");t.b("\n" + i);t.b("          <span class=\"Celery-Icon Celery-Icon--innerInput Celery-Icon--cvc\">");t.b("\n" + i);t.b("          </span>");t.b("\n" + i);t.b("        </div>");t.b("\n" + i);t.b("      </div>");t.b("\n" + i);t.b("    </div>");t.b("\n");t.b("\n" + i);if(t.s(t.d("features.coupons",c,p,1),c,p,0,4309,4806,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("      <div class=\"Celery-FormSection\">");t.b("\n" + i);t.b("        <div class=\"Celery-FormSection-header\">");t.b("\n" + i);t.b("          <h2 class=\"Celery-FormSection-heading\">");t.b("\n" + i);t.b("            ");t.b(t.v(t.f("promo",c,p,0)));t.b("\n" + i);t.b("          </h2>");t.b("\n" + i);t.b("        </div>");t.b("\n");t.b("\n" + i);t.b("        <div class=\"Celery-FormSection-body\">");t.b("\n" + i);t.b("          <div class=\"Celery-Form-group\">");t.b("\n" + i);t.b("            <input class=\"Celery-TextInput Celery-TextInput--coupon\"");t.b("\n" + i);t.b("              type=\"text\"");t.b("\n" + i);t.b("              name=\"coupon\"");t.b("\n" + i);t.b("              placeholder=\"");t.b(t.v(t.f("promoType",c,p,0)));t.b("\" />");t.b("\n" + i);t.b("          </div>");t.b("\n" + i);t.b("        </div>");t.b("\n" + i);t.b("      </div>");t.b("\n" + i);});c.pop();}t.b("\n" + i);t.b("    <div class=\"Celery-FormSection Celery-FormSection--errors u-hidden\">");t.b("\n" + i);t.b("      <div class=\"Celery-FormSection-body\">");t.b("\n");t.b("\n" + i);t.b("      </div>");t.b("\n" + i);t.b("    </div>");t.b("\n" + i);t.b("  </div>");t.b("\n");t.b("\n" + i);t.b("  <div class=\"Celery-Form-footer\">");t.b("\n" + i);t.b("    <div class=\"Celery-OrderSummary\">");t.b("\n" + i);t.b("      <div class=\"Celery-OrderSummary-line\">");t.b("\n" + i);t.b("        <span class=\"Celery-OrderSummary-price Celery-OrderSummary-price--price\">");t.b("\n" + i);t.b("          0");t.b("\n" + i);t.b("        </span>");t.b("\n" + i);t.b("        <span class=\"Celery-OrderSummary-label\">Pre-Order</span>");t.b("\n" + i);t.b("      </div>");t.b("\n");t.b("\n" + i);t.b("      <span class=\"Celery-OrderSummary-operator\">&times;</span>");t.b("\n");t.b("\n" + i);t.b("      <div class=\"Celery-OrderSummary-line\">");t.b("\n" + i);t.b("        <span class=\"Celery-OrderSummary-number Celery-OrderSummary-number--quantity\">");t.b("\n" + i);t.b("          1");t.b("\n" + i);t.b("        </span>");t.b("\n" + i);t.b("        <span class=\"Celery-OrderSummary-label\">");t.b(t.v(t.f("qty",c,p,0)));t.b("</span>");t.b("\n" + i);t.b("      </div>");t.b("\n");t.b("\n" + i);if(t.s(t.d("features.coupons",c,p,1),c,p,0,5617,5989,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("        <span class=\"Celery-OrderSummary-operator coupon\" style=\"display: none;\">-</span>");t.b("\n");t.b("\n" + i);t.b("        <div class=\"Celery-OrderSummary-line coupon\" style=\"display: none;\">");t.b("\n" + i);t.b("          <span class=\"Celery-OrderSummary-price Celery-OrderSummary-price--coupon\">");t.b("\n" + i);t.b("            $0");t.b("\n" + i);t.b("          </span>");t.b("\n" + i);t.b("          <span class=\"Celery-OrderSummary-label\">Coupon</span>");t.b("\n" + i);t.b("        </div>");t.b("\n" + i);});c.pop();}t.b("\n" + i);t.b("      <span class=\"Celery-OrderSummary-operator\">+</span>");t.b("\n");t.b("\n" + i);t.b("      <div class=\"Celery-OrderSummary-line\">");t.b("\n" + i);t.b("        <span class=\"Celery-OrderSummary-price Celery-OrderSummary-price--shipping\">");t.b("\n" + i);t.b("          $0");t.b("\n" + i);t.b("        </span>");t.b("\n" + i);t.b("        <span class=\"Celery-OrderSummary-label\">");t.b(t.v(t.f("ship",c,p,0)));t.b("</span>");t.b("\n" + i);t.b("      </div>");t.b("\n");t.b("\n" + i);if(t.s(t.d("features.taxes",c,p,1),c,p,0,6333,6647,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("        <span class=\"Celery-OrderSummary-operator\">+</span>");t.b("\n");t.b("\n" + i);t.b("        <div class=\"Celery-OrderSummary-line\">");t.b("\n" + i);t.b("          <span class=\"Celery-OrderSummary-price Celery-OrderSummary-price--taxes\">");t.b("\n" + i);t.b("            $0");t.b("\n" + i);t.b("          </span>");t.b("\n" + i);t.b("          <span class=\"Celery-OrderSummary-label\">");t.b(t.v(t.f("taxes",c,p,0)));t.b("</span>");t.b("\n" + i);t.b("        </div>");t.b("\n" + i);});c.pop();}t.b("\n" + i);t.b("      <span class=\"Celery-OrderSummary-operator\">=</span>");t.b("\n");t.b("\n" + i);t.b("      <div class=\"Celery-OrderSummary-line\">");t.b("\n" + i);t.b("        <span class=\"Celery-OrderSummary-price Celery-OrderSummary-price--total\">");t.b("\n" + i);t.b("          $0");t.b("\n" + i);t.b("        </span>");t.b("\n" + i);t.b("        <span class=\"Celery-OrderSummary-label\">Total</span>");t.b("\n" + i);t.b("      </div>");t.b("\n" + i);t.b("    </div>");t.b("\n");t.b("\n" + i);t.b("    <a class=\"Celery-Button Celery-Button--buy\" href=\"#\" tabindex=\"0\">");t.b("\n" + i);t.b("    ");t.b(t.v(t.f("preorder",c,p,0)));t.b("\n" + i);t.b("    </a>");t.b("\n");t.b("\n" + i);t.b("    <div class=\"Celery-Note Celery-Note--subtle u-textCenter\">");t.b("\n" + i);t.b("     ");t.b(t.v(t.f("secure",c,p,0)));t.b("\n" + i);t.b("    </div>");t.b("\n" + i);t.b("  </div>");t.b("\n");t.b("\n" + i);t.b("  <button class=\"Celery-HiddenSubmit\" type=\"submit\"></button>");t.b("\n" + i);t.b("</form>");t.b("\n");return t.fl(); },partials: {}, subs: {  }}),
    'modal' : new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"Celery-ModalContainer is-hidden\">");t.b("\n" + i);t.b("  <a class=\"Celery-ModalCloseButton\">");t.b("\n" + i);t.b("    &times;");t.b("\n" + i);t.b("  </a>");t.b("\n" + i);t.b("  <div class=\"Celery-Modal\">");t.b("\n" + i);t.b("    <div class=\"Celery-Modal-header\">");t.b("\n" + i);t.b("      <h1 class=\"Celery-Modal-heading\">");t.b("\n" + i);t.b("        ");t.b(t.v(t.f("preorder",c,p,0)));t.b("\n" + i);t.b("      </h1>");t.b("\n");t.b("\n" + i);t.b("      <h2 class=\"Celery-Modal-subheading\">");t.b("\n" + i);t.b("       ");t.b(t.v(t.f("charged",c,p,0)));t.b("\n" + i);t.b("      </h2>");t.b("\n" + i);t.b("    </div>");t.b("\n");t.b("\n" + i);t.b("    <div class=\"Celery-Modal-body\">");t.b("\n" + i);t.b("    </div>");t.b("\n");t.b("\n" + i);t.b("    <div class=\"Celery-Modal-footer\">");t.b("\n" + i);t.b("      <p>");t.b("\n" + i);t.b("      ");t.b(t.v(t.f("footer",c,p,0)));t.b("\n" + i);t.b("      </p>");t.b("\n" + i);t.b("    </div>");t.b("\n" + i);t.b("  </div>");t.b("\n" + i);t.b("</div>");t.b("\n");return t.fl(); },partials: {}, subs: {  }}),
    'overlay' : new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"Celery-Overlay is-hidden\"></div>");t.b("\n");return t.fl(); },partials: {}, subs: {  }})
    /* jshint ignore:end */
  },
  r = function(n) {
    var tn = t[n];
    return function(c, p, i) {
      return tn.render(c, p || t, i);
    };
  };
  return {
    templates : t,
    'confirmation' : r('confirmation'),
    'form' : r('form'),
    'modal' : r('modal'),
    'overlay' : r('overlay')
  };
});