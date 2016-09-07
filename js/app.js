"use strict";

// $.each($('.project-thumb'), function(index, element) {
//   var width = element.clientWidth;
//   $(element).height(width);
// });

/**
 * Mobile sticky menu
 */

Foundation.OffCanvas.defaults.forceTop = false;

$(window).scroll(function() {
  if ($(this).scrollTop() > 62){
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
  '.project-thumb-wrapper .thumbnail'
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
