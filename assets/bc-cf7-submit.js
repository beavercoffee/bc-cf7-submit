if('undefined' === typeof(bc_cf7_submit)){
    var bc_cf7_submit = {

    	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        disable_submit: function(){
			jQuery('.wpcf7-submit').addClass('disabled');
        },

    	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        enable_submit: function(event){
            if(event.detail.apiResponse.bc_uniqid){
                jQuery('#' + event.detail.unitTag).find('input[name="bc_uniqid"]').val(event.detail.apiResponse.bc_uniqid);
            }
            jQuery('.wpcf7-submit').removeClass('disabled');
        },

    	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        init: function(){
            jQuery('.wpcf7-form').on({
                wpcf7mailsent: bc_cf7_submission.wpcf7mailsent,
                wpcf7reset: bc_cf7_submission.wpcf7reset,
                wpcf7submit: bc_cf7_submit.enable_submit,
            });
			jQuery('.wpcf7-form *').on('keydown', bc_cf7_submit.prevent_submit);
            jQuery('.wpcf7-submit').on('click', bc_cf7_submit.disable_submit);
        },

    	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        message: '',

    	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        prevent_submit: function(event){
			event.stopPropagation();
            switch(event.which){
    			case 13:
                    if(!jQuery(this).is('textarea')){
                        event.preventDefault();
                    }
    				break;
    			case 32:
    				if(jQuery(this).is('.wpcf7-submit')){
    					event.preventDefault();
    				}
    				break;
    		}
        },

    	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        redirect: false,

    	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        wpcf7mailsent: function(event){
            if(event.detail.apiResponse.bc_loading){
                if(jQuery('#' + event.detail.unitTag).find('.bc-submit-wrap').length){
                    jQuery('#' + event.detail.unitTag).find('.bc-submit-wrap').removeClass('d-flex').addClass('d-none');
                }
                jQuery('#' + event.detail.unitTag).find('.wpcf7-form').children().hide();
                jQuery('#' + event.detail.unitTag).find('.wpcf7-form').prepend('<div class="alert alert-info bc-cf7-submission" role="alert">' + event.detail.apiResponse.bc_loading + '</div>');
            }
            bc_cf7_submission.message = event.detail.apiResponse.message;
            if(event.detail.apiResponse.bc_redirect){
                bc_cf7_submission.redirect = true;
            }
        },

    	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        wpcf7reset: function(event){
            if(jQuery('#' + event.detail.unitTag).find('.bc-cf7-submission').length){
                jQuery('#' + event.detail.unitTag).find('.bc-cf7-submission').removeClass('alert-info').addClass('alert-success').text(bc_cf7_submission.message);
                if(bc_cf7_submission.redirect){
                    setTimeout(function(){
                        jQuery('#' + event.detail.unitTag).find('.bc-cf7-submission').append('<span class="ajax-loader float-right m-0 visible"></span>');
                    }, 500);
                }
            }
        },

    	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    };
}
