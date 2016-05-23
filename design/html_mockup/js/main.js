//
// 1. Fade in description, intro picture, add opacity hovers
//
var introText = $('.introText');
/*
function fadeInIntro (el,delay) {
	setTimeout(function () {
		$(el).css('opacity','0.58');
	}, delay);
}

fadeInIntro(introText,700);
*/
$(introText).addClass('fadeMeIn');

$('.introText em').hover(
    function() {
        $('.bigMessage img').css('opacity','0.9');
    }, function() {
        $('.bigMessage img').css('opacity','0');
    }
);


//
// 2. Toggle header on scroll down
//
var affixedHeader = $('.page > header').clone().hide().addClass('affixedHeader').prependTo('.page');

function toggleAffixedHeader(){
	var scrolled = $(window).scrollTop();

	if (scrolled>178){
		affixedHeader.fadeIn(600);
	} else {
		affixedHeader.stop().fadeOut(300);
	}
}

$(window).scroll(function(){
	toggleAffixedHeader();
});


//
// 3. Slide background when Contact section is in view (via Bullseye plugin)
//
var backgroundDiv = $('.page_background');

function toggleBackgroundSlide (e) {
	$(backgroundDiv).toggleClass('bgPosition_btm');
	$(affixedHeader).toggleClass('blackout bgPosition_btm');
}

$('section#about')
	.bind('enterviewport leaveviewport',toggleBackgroundSlide)
	.bullseye({
        offsetTop: 300,
        extendHeight: -600
    });
$('.page > footer')
    .bind('enterviewport leaveviewport',toggleBackgroundSlide)
    .bullseye();


//
// 4. Load localScroll plugin
//
$.localScroll({ duration: 400, easing: 'swing', hash: false });


//
// 5. Contact form validation (via Parsley plugin)
//
var contactForm = $('#contactForm');

$(contactForm).parsley( {
    errors: {
        errorsWrapper: '<span></span>',
        errorElem: '<span></span>'
    },
	listeners: {
    	onFieldError: function ( elem, constraints, ParsleyField ) {
    		
    		//
    		// 1. Check if field is required, but empty
    		//    If there are any other constraints besides 'required', add them to the constraintsBesidesRequired array
    		//
    		var isRequiredButEmpty = false;
    		var constraintsBesidesRequired = [];

    		$.each( constraints, function(i,constraint) {
    			if( this.name == 'required' ) {
    				
    				if( this.isValid === false ) {
    					isRequiredButEmpty = true;
    				}
    			}
    			else {
    				constraintsBesidesRequired.push(this.name);
    			}
    		});

    		//
    		// If a field is required, but empty, and also has more than one validation constraint (beyond being required),
    		// only show 'field is required' message.
       		//
    		// i.e. Don't bother user with extra error messages if they just happened to click/tab out of a field
    		//      w/o entering a value
    		//
    		if( isRequiredButEmpty && constraintsBesidesRequired.length > 0 ) {

    			$.each( constraintsBesidesRequired, function(i,constraint) {
    				$(elem).parsley('removeError', this);
    			});
    		}
        }
	}
}); //Bind Parsley to contact form


//
// 6. Ajax form submit
//
function submitContactForm( contactForm ) {
	$.ajax({
        data: $(contactForm).serialize(),
        url: 'email.php',
        type: 'post',
		beforeSend: function() {
            $('#contactForm .ajaxSpinner').show();
		},
		success: function(response) {
            if(response == 1) {
                $('#contactForm .form').hide();
                $('#contactForm .formSubmitSuccessMsg').fadeIn();
            }
            else {
                alert(response);
            }
		},
		error: function() {
            alert('Sorry, an error occurred while trying to send the form. Try again in a little bit.');
		},
		complete: function() {
            $('#contactForm .ajaxSpinner').hide();
		}
	});
}

$('#contact_sendBtn').click( function() {
	if( $(contactForm).parsley('validate') ) {
        submitContactForm(contactForm);
    }
});

//
// 7. About Section Tooltips
//
$('.about_tooltip').tooltipster({
    theme: '.about_tooltipStyle',
    interactive: true,
    functionBefore: function( origin, continueTooltip ) {
        var classes = origin.attr("class").split(" ");
        var contentClass = classes[classes.length-1];
        var tooltipContent = $('.tooltipContent.'+contentClass).html();

        origin.tooltipster('update', tooltipContent);
        continueTooltip();
    }
});
$('.expertiseList i, .toolsList li').tooltipster({
    theme: '.about_expertiseTooltipStyle',
});