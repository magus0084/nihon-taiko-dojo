var SiteUi = {

    contactFormSelector: '#contactForm',

    init: function() {

        // Bind form validation to contact form by loading Parsley plugin
        this.loadFormValidation( this.contactFormSelector, 'email.php' );

        // Load localScroll plugin
        $.localScroll({ duration: 400, easing: 'swing', hash: false });

    },

    loadFormValidation: function ( contactFormSelector, postUrl ) {

        var contactForm = $(contactFormSelector);

        contactForm.parsley( {

            errors: {
                errorsWrapper: '<span></span>',
                errorElem: '<span></span>'
            },
            messages: {
                required: '必要です。',
                minlength: '3字少なくとも書いてください。',
                type: { email: '合式なメールアドレスを書いてください。' }
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
    }

}

SiteUi.init();
