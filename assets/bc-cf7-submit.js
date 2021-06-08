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

        hide_ajax_loader: function(event){
            var unit_tag = '';
			unit_tag = event.detail.unitTag;
            jQuery('#' + unit_tag).find('.ajax-loader').css('visibility', 'hidden');
        },

    	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        init: function(){
            jQuery('.wpcf7-form').on({
				wpcf7mailsent: bc_cf7_submit.show_ajax_loader,
				wpcf7reset: bc_cf7_submit.hide_ajax_loader,
                wpcf7submit: bc_cf7_submit.enable_submit,
			});
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

        show_ajax_loader: function(event){
            var ajax_loader = '', unit_tag = '';
			unit_tag = event.detail.unitTag;
            ajax_loader = jQuery('#' + unit_tag).find('.ajax-loader');
            jQuery('#' + unit_tag).find('.wpcf7-form').children().not('.wpcf7-response-output').hide().end().end().append(ajax_loader);
            ajax_loader.css({
                margin: 0,
                visibility: 'visible',
            });
        },

    	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    };
}
