"use strict";

// $.each($('.project-thumb'), function(index, element) {
//   var width = element.clientWidth;
//   $(element).height(width);
// });

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

$(document).foundation();
