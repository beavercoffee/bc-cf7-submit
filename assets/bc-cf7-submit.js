if('undefined' === typeof(bc_cf7_submit)){
    var bc_cf7_submit = {

        init: function(){
            jQuery('.wpcf7-form').on({
				wpcf7mailsent: bc_cf7_submit.wpcf7mailsent,
				wpcf7reset: bc_cf7_submit.wpcf7reset,
			});
        },

    	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        wpcf7mailsent: function(event){
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

        wpcf7reset: function(event){
            var unit_tag = '';
			unit_tag = event.detail.unitTag;
            jQuery('#' + unit_tag).find('.ajax-loader').css('visibility', 'hidden');
        },

    	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    };
}
