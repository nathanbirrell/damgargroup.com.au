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

 var element, circle, d, x, y;
 $(".cta-wrap .cta").click(function(e){

 	element = $(this);

 	if(element.find(".circle").length == 0)
 		element.prepend("<span class='circle'></span>");

 	circle = element.find(".circle");
 	circle.removeClass("animate");

 	if(!circle.height() && !circle.width())
   {
 		d = Math.max(element.outerWidth(), element.outerHeight());
 		circle.css({height: d, width: d});
 	}

 	x = e.pageX - element.offset().left - circle.width()/2;
 	y = e.pageY - element.offset().top - circle.height()/2;

 	circle.css({top: y+'px', left: x+'px'}).addClass("animate");
});

/**
 * Initialise Foundation
 */

$(document).foundation();
