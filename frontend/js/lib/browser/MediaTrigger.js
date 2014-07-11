/*
    Usage:

    var mediaTrigger = new MediaTrigger( $('.js-breakpoint').css('content') );

    mediaTrigger.init();

    mediaTrigger.on('mobile tablet', function(querry){
      console.log(querry);
    });

    mediaTrigger.on('desktop', function(querry){
      console.log(querry);
    });
*/

define(function(){
    'use strict';

    //  todo:
    //    debaunce
    //    only call when change of querry
    //    onEnter / onLeave
    //    does not need to be a singleton


    var MediaTrigger = function( querryString ){
      this.querryString = querryString;
      this.querries = {};
      this.events = {};
      this.currentMatch = '';
    };

    MediaTrigger.prototype = {
      add: function( triggerString,callback,callOnInit ){
        var i, triggers = triggerString.split(" ");

        for (i = 0; i < triggers.length; ++i ){
          var trigger = triggers[i];
          if( !(trigger in this.events) ) {
            this.events[trigger] = [];
          }

          this.events[trigger].push(callback);
        }

        if(callOnInit) {
          this._match(callback);
        }
      },
      _match: function(callback){
        var self = this;
        var wasCalled = [];

        $.each(this.events, function(key,callbacks){
          if(key in self.querries){
            if ( window.matchMedia( self.querries[key] ).matches ){
                $.each(callbacks, function(){
                    if(callback && callback !== this) {
                      return;
                    }

                    if ($.inArray(this,wasCalled)){
                      return;
                    }

                    this(key);
                    wasCalled.push(this);

                });
            }
          }
        });
      },
      _parseQuerry: function(){
        this.querries = $.parseJSON( this.querryString.substring(1, this.querryString.length-1) );
      },
      init: function(){
        var self = this;
        self._parseQuerry();
        $(window).on('resize.mediaTrigger', function(){
          self._match();
        });
      },
      destroy: function(){
        $(window).off('resize.mediaTrigger');
        this.events = {};
        this.currentMatch = '';
      }
    };

    return new MediaTrigger();
});
