jQuery(window).on('load', function() {
	jQuery(window).resize(function() {
		setTimeout(function() {
			adjustSlideHeight('.slider.invp-flexslider');
		}, 120);
	});
});

//Run the initialize script after the Photo Slider block is rendered
document.addEventListener( 'invpFlexsliderBlockLoaded', function( e ) {
    window.setTimeout( initializeFlexsliders, 500 );
}, false );

jQuery(window).load( initializeFlexsliders );

function initializeFlexsliders() {
	// The slider being synced must be initialized first
	jQuery('.invp-flexslider-thumbs').flexslider({
		animation: "slide",
		controlNav: false,
		slideshow: false,
		smoothHeight: true,
		itemWidth: 150,
		asNavFor: '.slider.invp-flexslider',
		prevText: '',
		nextText: ''
	});

	jQuery('.invp-flexslider').not('.invp-flexslider-thumbs').flexslider({
		animation: 'slide',
		animationSpeed: 200,
		slideshowSpeed: 3500,
		controlNav: false,
		prevText: '',
		nextText: '',
		slideshow: false,
		smoothHeight: true,
		sync: '.invp-flexslider-thumbs',
		after: function( slider ) { flexslider_maybe_resize_current_image(); },
		start: function( slider ) {
		  	adjustSlideHeight('.slider.invp-flexslider');
		  	jQuery(window).trigger('resize');
		  	flexslider_maybe_resize_current_image();
		}
	});

	jQuery('.invp-flexslider:not(.invp-flexslider-thumbs) .slides li:first-child img').each( function() {
		observer.observe(jQuery(this)[0], { attributes : true, attributeFilter : ['style'] });
	});
}

var observer = new MutationObserver(function(mutations) {
	mutations.forEach(function(mutationRecord) {
		flexslider_maybe_resize_current_image();
	});
});

function adjustSlideHeight(wrapper)
{
	var ratios = [];
	jQuery(wrapper + ' .slides li img').each(function() {
		ratios.push(jQuery(this).attr('height')/jQuery(this).attr('width'));
	});
	height = Math.ceil(jQuery('.slider-width').width() * Math.min.apply(Math,ratios));
	jQuery(wrapper + ' .slides li img').each(function() {
		jQuery(this).css('height', height);
		jQuery(this).css('width', 'auto');
	});
}

function flexslider_maybe_resize_current_image()
{
	var el = jQuery('.slider.invp-flexslider .flex-active-slide img')[0];

	if( typeof el === 'undefined' )
	{
		return;
	}

	var el_slider = jQuery('.slider.invp-flexslider');
	var slider_width = el_slider.css('width').replace(/[^0-9]/g, '')
		- parseInt( el_slider.css( 'border-left-width' ).replace(/[^0-9]/g, '') )
		- parseInt( el_slider.css( 'border-right-width' ).replace(/[^0-9]/g, '') );

	//if the photo isn't taking up the whole width of the slider, remove inline height so it does
	if( slider_width > el.width && jQuery(el).attr('srcset') )
	{
		jQuery(el).css('height','' );
		//set the inline width of the photo to be the real largest width or 100%
		var srcset = jQuery(el).attr('srcset');
		var pieces = srcset.split( ' ' );
		if( 1 < pieces.length )
		{
			var full_width = pieces[1].substring( 0, pieces[1].length-2 );
			if( full_width > el.width )
			{
				jQuery(el).removeAttr('height');
				jQuery(el).css( 'width', full_width ).css('max-width','100%' );
			}
		}
	}

	//when the slide changes, reset the next/prev text line-height
	jQuery('.invp-flexslider:not(.invp-flexslider-thumbs) .flex-direction-nav a').css('line-height', el.height + 'px' );
	//and resize the whole slider based on the height of the current image
	jQuery('.invp-flexslider:not(.invp-flexslider-thumbs) .flex-viewport').css('height', el.height + 'px' );
}