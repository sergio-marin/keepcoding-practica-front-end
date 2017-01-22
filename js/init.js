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


});