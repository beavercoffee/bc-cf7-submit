if('undefined' === typeof(bc_cf7_submit)){
    var bc_cf7_submit = {

    	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        disable_submit: function(){
			jQuery('.wpcf7-submit').addClass('disabled');
        },

    	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        enable_submit: function(){
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
            switch(event.keyCode){
    			case 13:
    				event.preventDefault();
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
