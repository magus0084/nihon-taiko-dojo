var SiteUi = {

    affixedHeaderElem: {},
    siteBgSelector: '.page_background',
    siteContainerSelector: '.page',
    contactFormSelector: '#contactForm',

    background_state: 'normal',


    init: function() {
        this.fadeInIntro( '.introText' );
        this.toggleImJoePic( '.introText em', '.bigMessage img' );
        this.createAffixedHeader( '.page > header' );
        this.toggleAffixedHeader( this.affixedHeaderElem, 178, 600, 300 );
        this.bindBgShowcaseToggle( '.backgroundShowcaseToggleBtn' );

        // Load Bullseye plugin (triggers toggleBackgroundSlide), bind scroll events
        this.bindBgScrollEvents({
            'section#about' : {},
            '.page > footer': {}
        });

        // Bind form validation to contact form by loading Parsley plugin
        this.loadFormValidation( this.contactFormSelector, 'email.php' );

        // Load Tooltipster plugin
        this.loadTooltipsterTooltips({
            '.about_tooltip': {
                settings: { theme: '.about_tooltipStyle', interactive: true },
                separateContent: '.tooltipContent'
            },
            '.expertiseList i, .toolsList li': { theme: '.about_expertiseTooltipStyle' }
        });

        // Load localScroll plugin
        $.localScroll({ duration: 400, easing: 'swing', hash: false });

        // Load Scrollsnap plugin
        //$(document).scrollsnap({ snaps: 'section, footer', proximity: 400, duration: 1000 });
        this.loadScrollsnap(
            [{ snaps: 'section#about, section#work, #contact, footer', proximity: 400, duration: 800 },
             { snaps: 'section#intro', proximity: 400, duration: 800, offset: -300 }]
        );
    },
    

    fadeInIntro: function ( introTextSelector ) {
        $(introTextSelector).addClass('fadeMeIn');
    },

    toggleImJoePic: function ( imJoeSelector, joePicSelector ) {
        $(imJoeSelector).hover(
            function() {
                $(joePicSelector).addClass('shown');
            }, function() {
                $(joePicSelector).removeClass('shown');
            }
        );
    },

    createAffixedHeader: function ( headerSelector ) {
        this.affixedHeaderElem = $( headerSelector ).clone().hide().addClass('affixedHeader').prependTo( this.siteContainerSelector );
    },
        
    toggleAffixedHeader: function ( affixedHeaderElem, scrollThreshold, fadeInDur, fadeOutDur) {

        $(window).scroll(function(){
            var scrolled = $(this).scrollTop();

            if (scrolled > scrollThreshold){
                affixedHeaderElem.fadeIn( fadeInDur );
            } else {
                affixedHeaderElem.stop().fadeOut( fadeOutDur );
            }
        });
    },

    toggleBackgroundSlide: function () {

        $(SiteUi.siteBgSelector).toggleClass('bgPosition_btm');
        $(SiteUi.affixedHeaderElem).toggleClass('blackout bgPosition_btm');

    },

    bindBgShowcaseToggle: function( toggleBtnSelector ) {

        $(toggleBtnSelector).click( function(event) {
            event.preventDefault();
            $( SiteUi.siteContainerSelector + ', ' + toggleBtnSelector ).toggleClass('backgroundShowcase');
        });

    },

    bindBgScrollEvents: function ( selectorAndConfig ) {
        for ( var key in selectorAndConfig ) {
            $( key ).bind('inview', function (event, visible) {
                if (visible == true) {
                  SiteUi.toggleBackgroundSlide();
                } else {
                  SiteUi.toggleBackgroundSlide();
                }
            });
        }
    },

    loadFormValidation: function ( contactFormSelector, postUrl ) {

        var contactForm = $(contactFormSelector);

        contactForm.parsley( {

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
        });

        $('#contact_sendBtn').click( function() {
            if( contactForm.parsley('validate') ) {
                SiteUi.submitContactForm( contactFormSelector, postUrl );
            }
        });
    },

    submitContactForm: function ( contactFormSelector, postUrl ) {

        var ajaxSpinner = $(contactFormSelector).find('.ajaxSpinner');

        $.ajax({
            data: $(contactFormSelector).serialize(),
            url:  postUrl,
            type: 'post',
            beforeSend: function() {
                ajaxSpinner.show();
            },
            success: function(response) {
                if(response == 1) {
                    $(contactFormSelector).find('.form').hide().end()
                                          .find('.formSubmitSuccessMsg').fadeIn();
                }
                else {
                    alert(response);
                }
            },
            error: function() {
                alert('Sorry, an error occurred while trying to send the form. Try again in a little bit.');
            },
            complete: function() {
                ajaxSpinner.hide();
            }
        });
    },

    loadTooltipsterTooltips: function ( tooltipsToLoad ) {
        for ( var selector in tooltipsToLoad ) {
            
            var settingsToLoad = tooltipsToLoad[selector];

            if( 'separateContent' in settingsToLoad ) {

                // If 'separateContent' class is specified, add new 'functionBefore' to Tooltipster config
                settingsToLoad.settings.functionBefore = this._tooltipsterFunctionBefore( settingsToLoad.separateContent );

                // Override 'settingsToLoad' with config including additional 'functionBefore'
                settingsToLoad = settingsToLoad.settings;

            }

            // Load Tooltipster plugin with 'settingsToLoad'
            $( selector ).tooltipster( settingsToLoad );
        }
    },

    _tooltipsterFunctionBefore: function ( separateContentSelector ) {
        return function( origin, continueTooltip ) {
            var classes = origin.attr("class").split(" ");
            var contentClass = classes[classes.length-1];
            
            var tooltipContent = $( separateContentSelector + '.' + contentClass ).html();

            origin.tooltipster('update', tooltipContent);
            continueTooltip();
        };
    },

    loadScrollsnap: function ( snapPointsAndConfig ) {
        for ( var snapPoint in snapPointsAndConfig ) {
            $(document).scrollsnap( snapPointsAndConfig[snapPoint] );
        }
    }

}

SiteUi.init();
