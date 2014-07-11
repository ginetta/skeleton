/*jslint browser: true */
/*global require: true, requirejs: true, $: true */

(function(){
    'use strict';

    require(['mymodule'], function () {
        console.log('mymodule is loaded');
    });

    require(['lib/browser/mediaTrigger'], function ( mediaTrigger ) {

      mediaTrigger.onEnter('mobile tablet', function(querry){
        console.log(querry);
      },true);

      mediaTrigger.onLeave('mobile', function(querry){
        //test on leave
        console.log(querry,this);
      },true);

    });

})();

