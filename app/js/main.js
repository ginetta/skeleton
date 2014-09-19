/*jslint browser: true */
/*global require: true, requirejs: true, $: true */

(function(){
    'use strict';

    /*
      This is how you should require a component:
      make sure `mycomponent` in the require-config situated in layout/layout.jade
     */
    /*
      require(['mycomponent'], function () {
          console.log('mycomponent is loaded');
      });
    */
  require(['jquery'], function ($) {
    function isEquivalent(a, b) {
      // Create arrays of property names
      var aProps = Object.getOwnPropertyNames(a);
      var bProps = Object.getOwnPropertyNames(b);

      // If number of properties is different,
      // objects are not equivalent
      if (aProps.length != bProps.length) {
        return false;
      }

      for (var i = 0; i < aProps.length; i++) {
        var propName = aProps[i];

        // If values of same property are not equal,
        // objects are not equivalent
        if (a[propName] !== b[propName]) {
          return false;
        }
      }

      // If we made it this far, objects
      // are considered equivalent
      return true;
    }

    $(document).ready(function () {
      $('.js-option-value').on('change', function () {
        var $el = $(this);
        var $checkedOptions = $el.parents('.component-option-list').find('.js-option-value:checked');
        var options = {};

        $checkedOptions.each(function (index, option) {
          var $option = $(option);
          var optionName  = $option.attr('name');
          var optionValue = $option.attr('value');
          options[optionName] = optionValue;
        });

        var $iframes = $('.component-combination-iframe');
        $iframes.removeClass('is-active');
        $iframes.each(function (index, iframe) {
          var $iframe = $(iframe);
          var iframeOptions = $iframe.data('options');
          if (isEquivalent(iframeOptions, options)) {
            $iframe.addClass('is-active');
            return false;
          }
        });
      });
    });
  });

})();

