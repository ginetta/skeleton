define(['jquery'], function($) {
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
    $('.styleguide-select').on('change', function () {
      var $el = $(this).find('select');
      var $checkedOptions = $el.parents('.component-option-list').find('.styleguide-select select');
      var options = {};

      $checkedOptions.each(function (index, option) {
        var $option = $(option);
        var optionName  = $option.attr('name');
        var optionValue = $option.val();
        options[optionName] = optionValue;
      });

      var $iframes = $('.styleguide-component-views');
      var $usage   = $('.styleguide-combination-usage');
      $iframes.removeClass('is-active');
      $usage.removeClass('is-active')
      function selectActive (index, item) {
        var $item = $(item);
        var itemOptions = $item.data('options');
        if ( isEquivalent(itemOptions, options) ) {
          $item.addClass('is-active');
          return false;
        }
      }
      $usage.each(selectActive);
      $iframes.each(selectActive);
    });

    $('.styleguide-view-item').on('click', function (evt) {
      var $view = $(evt.currentTarget);
      var viewToOpen = $view.data('view-type');
      $('.styleguide-component-view').removeClass('is-active');
      $('.styleguide-component-view--' + viewToOpen).addClass('is-active');
      $('.styleguide-view-item').removeClass('is-active');
      $view.addClass('is-active');
    });
  });
});
