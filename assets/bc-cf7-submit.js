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
            jQuery('.wpcf7-form').on('wpcf7submit', bc_cf7_submit.enable_submit);
			jQuery('.wpcf7-form *').on('keydown', bc_cf7_submit.prevent_submit);
            jQuery('.wpcf7-submit').on('click', bc_cf7_submit.disable_submit);
        },

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

    };
}
