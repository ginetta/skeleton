define(['globals','Scroll'],function(globals,Scroll){
    'use strict';

    var scroll = new Scroll();

    var SectionsParallax;



    SectionsParallax = function ($section,imageSelector,parallax,nameSpace) {
        this.top = 0;
        this.bottom = 0;
        this.height = 0;
        this.windowHeight = 0;
        this.parallax = parallax;
        this.nameSpace = nameSpace;


        this.$section = $section;
        this.$image = $section.find( imageSelector );


        this._init();
    };

    SectionsParallax.prototype = {
        _measure: function(){
            this.top = this.$section.offset().top;
            this.height = this.$section.height();
            this.bottom = this.top + this.height;
            this.windowHeight = globals.$w.height();
        },
        _scroll: function(){
            var self = this;
            scroll.add(self.nameSpace, function(scrollTop){
                //make sure slider is visible
                var offsetTop, offsetBottom, movement;
                offsetTop = (scrollTop + self.windowHeight) - self.top;
                offsetBottom = self.bottom - scrollTop;

                if( !( offsetTop < 0) && !( offsetBottom < 0) ) {
                    //movement = Math.floor((offsetTop - offsetBottom) * -self.parallax);
                    //movement = Math.floor( (scrollTop - offsetTop) * self.parallax );
                    movement = Math.floor(((scrollTop - self.top) * 100) / self.windowHeight) * self.parallax;
                    //movement = Math.floor((scrollTop - self.top) * +self.parallax);
                    //self.$image.css("transform", "translate(0," + movement + "px)" );
                    self.$image.css("transform", "translate(0," + movement  + "%)" );

                }
            });
        },
        _init: function(){
            var self = this;

            globals.$w.on("resize", function(){
                self._measure();
            });

            self._measure();
            self._scroll();

            this.$image.css("height", 100 + (100 * self.parallax) + "%" );

            globals.$w.trigger("scroll");
        }
    };

    return SectionsParallax;
});
