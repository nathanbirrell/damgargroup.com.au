"use strict";

// $.each($('.project-thumb'), function(index, element) {
//   var width = element.clientWidth;
//   $(element).height(width);
// });

var isHome = window.location.pathname === '/';

var runLoaderAnimation = function() {
  $('#loader-logo-svg').addClass('loader-running');

  new Vivus('loader-logo-svg', {
    duration: 100,
    delay: 0,
    animTimingFunction: Vivus.EASE_OUT
  }, function() {
    $('#loader-logo-svg-fill').addClass('loader-complete');

    if (isHome) {
      $('#loader').fadeOut(250);
    }
  });
};

var fadeOnLoad = function() {
  $(window).load(function() {
    $('#loader').fadeOut(250);
  });
};

if (isHome) {
  runLoaderAnimation();
} else {
  runLoaderAnimation();
  fadeOnLoad();
}

/**
 * Mobile sticky menu
 */

Foundation.OffCanvas.defaults.forceTop = false;

$(window).scroll(function() {
  if ($(this).scrollTop() > 62) {
    $('.sticky').removeClass('expanded');
    $('.mobile-logo').attr('src', $('#sticky-logo-swap').attr('src'));
  } else {
    $('.sticky').addClass('expanded');
    $('.mobile-logo').attr('src', $('#expanded-logo-swap').attr('src'));
  }
});

/**
 * Material design click for CTA buttons
 */

var materialDesignObjects = [
  '.cta-wrap .cta',
  '.project-listing .project-thumb-wrapper .thumbnail',
  '.project-latest .project-thumb-wrapper .thumbnail'
];

$(materialDesignObjects).each(function(index, object) {
  $(object).click(function(e){
    var element, circle, diameter, clickCoordinatesX, clickCoordingatesY;

    element = $(this);

    if (element.find(".circle").length == 0) {
      element.prepend("<span class='circle'></span>");
    }

    circle = element.find(".circle");
    circle.removeClass('animate');

    if (!circle.height() && !circle.width()) {
    	diameter = Math.max(element.outerWidth(), element.outerHeight());
    	circle.css({height: diameter, width: diameter});
    }

    clickCoordinatesX = e.pageX - element.offset().left - circle.width()/2;
    clickCoordingatesY = e.pageY - element.offset().top - circle.height()/2;

    circle.css({top: clickCoordingatesY+'px', left: clickCoordinatesX+'px'}).addClass('animate');
  });
});

/**
 * Initialise Foundation
 */

$(document).foundation();
