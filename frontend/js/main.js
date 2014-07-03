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

    require(['mymodule'], function () {
        console.log('mymodule is loaded');
    });

})();

