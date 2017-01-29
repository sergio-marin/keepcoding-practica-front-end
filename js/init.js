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
/* Destacar Link Sección Actual
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
/*	Fade In/Out Fondo Menú Principal
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

/*----------------------------------------------------*/
/*	Mostrar/Ocultar TextArea Form
------------------------------------------------------*/

	$('input[name="contactHowMeet"]').on('change', function() {
		if($(this).val() == "otros"){
    		$('#cuentamelo').show();
    		$('#cuentamelo textarea').focus();
    	} else {
    		$('#cuentamelo').hide();
    	}
	});

/*----------------------------------------------------*/
/*	Restringir Número Palabras Textarea
------------------------------------------------------*/
	$("#contactMessage").on('keyup', function() {
		var maxWords = 10;
    	var words = this.value.match(/\S+/g).length;

	    if (words > maxWords) {
	      // Cogemos las x primeras palabras y las unimos añadiendo los espacios en blanco
	      var trimmed = $(this).val().split(/\s+/, maxWords).join(" ");
	      // Añadimos un espacio al final
	      $(this).val(trimmed + " ");
	      alert("Sólo se permiten 150 palabras ;-)");
	    }
  	});

});