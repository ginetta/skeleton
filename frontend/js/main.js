/*jslint browser: true */
/*global require: true, requirejs: true, $: true */

(function(){
    'use strict';

    function is_touch_device() {
      try {
        document.createEvent("TouchEvent");
        return true;
      } catch (e) {
        return false;
      }
    }

    $("body").addClass("js");

    require(['SectionsParallax'], function (SectionsParallax) {
        if(!is_touch_device()){
            $('.js-section-parallax').each(function(i){
                var sectionsParallax;
                sectionsParallax = new SectionsParallax($(this), '.js-section-parallax-image', .4, "sectionParallax" + i);
            });
        }
    });


    if( $('.js-toggler') && $('.js-toggler').length ) {
      require(['toggler'], function (SectionsParallax) {});
    }

    require(['siteNavigation']);
    require(['tooltip']);

})();

