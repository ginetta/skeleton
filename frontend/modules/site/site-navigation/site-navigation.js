define(function(){
    // our plugin constructor
  var OnePageNav = function(elem, options){
    this.elem = elem;
    this.$elem = $(elem);
    this.options = options;
    this.metadata = this.$elem.data('plugin-options');
    this.$win = $(window);
    this.sections = {};
    this.didScroll = false;
    this.$doc = $(document);
    this.docHeight = this.$doc.height();
  };

  // the plugin prototype
  OnePageNav.prototype = {
    defaults: {
      navItems: 'a',
      currentClass: 'current',
      changeHash: false,
      easing: 'swing',
      filter: '',
      scrollSpeed: 750,
      scrollThreshold: 0.5,
      begin: false,
      end: false,
      scrollChange: false
    },

    init: function() {
      // Introduce defaults that can be extended either
      // globally or using an object literal.
      this.config = $.extend({}, this.defaults, this.options, this.metadata);

      this.$nav = this.$elem.find(this.config.navItems);

      //Filter any links out of the nav
      if(this.config.filter !== '') {
        this.$nav = this.$nav.filter(this.config.filter);
      }

      //Handle clicks on the nav
      this.$nav.on('click.onePageNav', $.proxy(this.handleClick, this));

      //Get the section positions
      this.getPositions();

      //Handle scroll changes
      this.bindInterval();

      //Update the positions on resize too
      this.$win.on('resize.onePageNav', $.proxy(this.getPositions, this));

      return this;
    },

    adjustNav: function(self, $parent) {
      self.$elem.find('.' + self.config.currentClass).removeClass(self.config.currentClass);
      $parent.addClass(self.config.currentClass);
    },

    bindInterval: function() {
      var self = this;
      var docHeight;

      self.$win.on('scroll.onePageNav', function() {
        self.didScroll = true;
      });

      self.t = setInterval(function() {
        docHeight = self.$doc.height();

        //If it was scrolled
        if(self.didScroll) {
          self.didScroll = false;
          self.scrollChange();
        }

        //If the document height changes
        if(docHeight !== self.docHeight) {
          self.docHeight = docHeight;
          self.getPositions();
        }
      }, 250);
    },

    getHash: function($link) {
      return $link.attr('href').split('#')[1];
    },

    getPositions: function() {
      var self = this;
      var linkHref;
      var topPos;
      var $target;

      self.$nav.each(function() {
        linkHref = self.getHash($(this));
        $target = $('#' + linkHref);

        if($target.length) {
          topPos = $target.offset().top;
          self.sections[linkHref] = Math.round(topPos);
        }
      });
    },

    getSection: function(windowPos) {
      var returnValue = null;
      var windowHeight = Math.round(this.$win.height() * this.config.scrollThreshold);

      for(var section in this.sections) {
        if((this.sections[section] - windowHeight) < windowPos) {
          returnValue = section;
        }
      }

      return returnValue;
    },

    handleClick: function(e) {
      var self = this;
      var $link = $(e.currentTarget);
      var $parent = $link.parent();
      var newLoc = '#' + self.getHash($link);

      if(!$parent.hasClass(self.config.currentClass)) {
        //Start callback
        if(self.config.begin) {
          self.config.begin();
        }

        //Change the highlighted nav item
        self.adjustNav(self, $parent);

        //Removing the auto-adjust on scroll
        self.unbindInterval();

        //Scroll to the correct position
        self.scrollTo(newLoc, function() {
          //Do we need to change the hash?
          if(self.config.changeHash) {
            window.location.hash = newLoc;
          }

          //Add the auto-adjust on scroll back in
          self.bindInterval();

          //End callback
          if(self.config.end) {
            self.config.end();
          }
        });
      }

      e.preventDefault();
    },

    scrollChange: function() {
      var windowTop = this.$win.scrollTop();
      var position = this.getSection(windowTop);
      var $parent;

      //If the position is set
      if(position !== null) {
        $parent = this.$elem.find('a[href$="#' + position + '"]').parent();

        //If it's not already the current section
        if(!$parent.hasClass(this.config.currentClass)) {
          //Change the highlighted nav item
          this.adjustNav(this, $parent);

          //If there is a scrollChange callback
          if(this.config.scrollChange) {
            this.config.scrollChange($parent);
          }
        }
      }
    },

    scrollTo: function(target, callback) {
      var offset = $(target).offset().top;

      $('html, body').animate({
        scrollTop: offset
      }, this.config.scrollSpeed, this.config.easing, callback);
    },

    unbindInterval: function() {
      clearInterval(this.t);
      this.$win.unbind('scroll.onePageNav');
    }
  };

  OnePageNav.defaults = OnePageNav.prototype.defaults;

  $.fn.onePageNav = function(options) {
    return this.each(function() {
      new OnePageNav(this, options).init();
    });
  };

  var $window = $(window);
  var $sideTitles = $(".js-side-nav");
  // Stop if there is no slide titles.
  if (!$sideTitles.length) {
    return;
  }

  // First add some offset if needed to anchors.
  var $anchors = $("[data-anchor-offset]");
  $anchors.each(function() {
    var $this = $(this);
    var offset = parseInt($this.data("anchor-offset"), 10);
    $this.css({position: "relative", top: offset + "px"});
  });

  // Check if there is a start element. If this is present in the page
  // the side nav will only appear below it.
  var $sidenavStart = $("[data-side-nav-start]");

  // Add the necessary html.
  var $navList = $("<ul class='side-nav list--reset'></ul>");
  var $wrapper = $("<div class='side-nav__wrapper'></div>");

  // If there is a sidenavStart hide the navlist by default if we are not on mobile.
  if ($sidenavStart.length && isMobile.any === false) {
    $navList.addClass('side-nav--hidden');
  }

  // Add the links to the list.
  $sideTitles.each(function() {
    var $this = $(this);
    var anchor = "#" + $this.data("target");
    var text = $this.text();
    $navList.append('<li><a href="' + anchor + '"><i class="icon-side-nav__bullet"></i><span class="side-nav__text">' + text + '</span></a></li>');
  });

  // Add the list to the wrapper container and add the wrapper to the document body.
  $wrapper.append($navList);
  $("body").append($wrapper);

  // Add focused modifier on hover on desktop.
  $navList.hover(function() {
    $navList.addClass('side-nav--focused');
  }, function() {
    $navList.removeClass('side-nav--focused');
  });

  // Add click handler to nav and links (mobile).
  $(".side-nav, .side-nav a").on("touchstart", function(e) {
    // Always stop event propagation, will not trigger the body.click below.
    e.stopPropagation();

    // If side nav isn't focused add the class and stop event.
    if (!$navList.hasClass("side-nav--focused")) {
      e.preventDefault();
      $navList.addClass('side-nav--focused');
      return false;
    }
  });

  $(document).on("touchstart", function(e) {
    // Unfocus the sidenav if we click outside of it.
    $navList.removeClass("side-nav--focused");
  });

  // If there is a sidenavStart listen to scroll event and update
  // the status. (only on non mobile devices)
  if ($sidenavStart.length && isMobile.any === false) {
    var updateSideVisibility = function() {
      var middle = $window.scrollTop() + $window.height() / 2;
      var start = $sidenavStart.offset().top;
      $navList.toggleClass('side-nav--hidden', middle <= start);

    };

    $(window).scroll(function() {
      updateSideVisibility();
    });
    updateSideVisibility();
  }

  var updateHorizontalScroll = function() {
    // If we scroll horizontally move the nav the same number of pixels in
    // the other direction. Without this the nav stay fixed and cover the content.
    $navList.css("marginLeft", ($window.scrollLeft() * -1) + "px");
  };

  $(window).scroll(function() {
    updateHorizontalScroll();
  });

  updateHorizontalScroll();

  // https://github.com/davist11/jQuery-One-Page-Nav
  $navList.onePageNav();
});
