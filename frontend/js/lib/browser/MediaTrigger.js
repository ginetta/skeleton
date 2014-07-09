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
    
    var MediaTrigger = function( querryString ){
      this.querryString = querryString;
      this.querries = {};
      this.events = {};
      this.currentMatch = '';
    }

    MediaTrigger.prototype = {
      on: function( triggerString,callback ){
        var i, triggers = triggerString.split(" ");
        
        for (i = 0; i < triggers.length; ++i ){
          var trigger = triggers[i];
          if( !(trigger in this.events) ) {
            this.events[trigger] = [];
          }
          
          this.events[trigger].push(callback);
        }
        
        this.match();
      },
      match: function(){
        var self = this;
        $.each(this.events, function(key,callbacks){
          if(key in self.querries){
            if ( window.matchMedia( self.querries[key] ).matches ){
                $.each(callbacks, function(){
                    this(key);
               });
            }
          }
        })
      },
      _parseQuerry: function(){
        this.querries = $.parseJSON( this.querryString.substring(1, this.querryString.length-1) );  
      },
      init: function(){
        var self = this;
        self._parseQuerry();
        $(window).on('resize.mediaTrigger', function(){
          self.match();
        });
      },
      destroy: function(){
        $(window).off('resize.mediaTrigger');
        this.events = {};
        this.currentMatch = '';
      }
    }

    return MediaTrigger;

});