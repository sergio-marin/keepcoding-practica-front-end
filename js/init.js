/*-----------------------------------------------------------------------------------
/*
/* Init JS
/*
-----------------------------------------------------------------------------------*/

 jQuery(document).ready(function($) {

/*----------------------------------------------------*/
/* Smooth Scroll
------------------------------------------------------ */

   $('.smoothscroll').on('click',function (e) {
	    e.preventDefault();

	    var target = this.hash,
	    $target = $(target);

	    $('html, body').stop().animate({
	        'scrollTop': $target.offset().top
	    }, 800, 'swing', function () {
	        window.location.hash = target;
	    });
	});

/*----------------------------------------------------*/
/* Highlight current section in navigation bar
------------------------------------------------------*/

	$(window).on("scroll", function() {

		var currentPos = $(window).scrollTop();

		$('.navbar li a').each(function() {

			var sectionLink = $(this);
    		// capture the height of the navbar
    		var navHeight = $('#nav-wrap').outerHeight() + 1;
    		var section = $(sectionLink.attr('href'));

    		// subtract the navbar height from the top of the section
    		if(section.position().top - navHeight  <= currentPos && sectionLink.offset().top + section.height()> currentPos) {
      			$('.navbar li').removeClass('active');
      			sectionLink.parent().addClass('active');
    		} else {
    			sectionLink.parent().removeClass('active');
    		}
  		});        
	});

/*----------------------------------------------------*/
/*	Fade In/Out Primary Navigation
------------------------------------------------------*/

	$(window).on('scroll', function() {

   		var h = $('header').height();
		var y = $(window).scrollTop();
      	var nav = $('#nav-wrap');

      	if ( (y > h*.20) && (y < h) && ($(window).outerWidth() > 768 ) ) {
			nav.fadeOut('fast');
		} else {
			if (y < h*.20) {
            nav.removeClass('opacidad').fadeIn('fast');
        	} else {
            	nav.addClass('opacidad').fadeIn('fast');
         	}
      	}
    });


});