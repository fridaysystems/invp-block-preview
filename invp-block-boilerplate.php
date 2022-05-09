<?php
/**
 * Plugin Name:       Inventory Presser - Blocks Feature Plugin
 * Description:       Where Inventory Presser blocks are built before launching in core.
 * Requires at least: 5.8
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Corey Salzano
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       invp-block-boilerplate
 *
 * @package           create-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function invp_create_blocks() {
	register_block_type( __DIR__ . '/build/attribute-table', array(
		'render_callback' => 'invp_block_attribute_table_get_html',
	) );

	register_block_type( __DIR__ . '/build/carfax-button', array(
		'render_callback' => 'invp_block_carfax_button_get_html',
	) );

	register_block_type( __DIR__ . '/build/description', array(
		'render_callback' => 'invp_block_description_get_html',
	) );

	register_block_type( __DIR__ . '/build/fuel-economy', array(
		'render_callback' => 'invp_block_fuel_economy_get_html',
	) );

	register_block_type( __DIR__ . '/build/options-list', array(
		'render_callback' => 'invp_block_options_list_get_html',
	) );

	register_block_type( __DIR__ . '/build/photo-slider', array(
		'render_callback' => 'invp_block_photo_slider_get_html',
	) );

	register_block_type( __DIR__ . '/build/payment-calculator', array(
		'render_callback' => 'invp_block_payment_calculator_get_html',
	) );

	register_block_type( __DIR__ . '/build/hours-today', array(
		'render_callback' => 'invp_block_hours_today_get_html',
	) );

	register_block_type( __DIR__ . '/build/iframe', array(
		'render_callback' => 'invp_block_iframe_get_html',
	) );

	register_block_type( __DIR__ . '/build/phone-number', array(
		'render_callback' => 'invp_block_phone_number_get_html',
	) );


	//Callbacks for blocks in core that edit meta values but do not have output
	register_block_type( 'inventory-presser/body-style', array(
		'render_callback' => 'invp_block_get_the_body_style',
	) );

	register_block_type( 'inventory-presser/color', array(
		'render_callback' => 'invp_block_get_the_color',
	) );

	register_block_type( 'inventory-presser/down-payment', array(
		'render_callback' => 'invp_block_get_the_down_payment',
	) );

	register_block_type( 'inventory-presser/engine', array(
		'render_callback' => 'invp_block_get_the_engine',
	) );

	register_block_type( 'inventory-presser/interior-color', array(
		'render_callback' => 'invp_block_get_the_interior_color',
	) );

	register_block_type( 'inventory-presser/last-modified', array(
		'render_callback' => 'invp_block_get_the_last_modified',
	) );

	register_block_type( 'inventory-presser/make', array(
		'render_callback' => 'invp_block_get_the_make',
	) );

	register_block_type( 'inventory-presser/model', array(
		'render_callback' => 'invp_block_get_the_model',
	) );

	register_block_type( 'inventory-presser/msrp', array(
		'render_callback' => 'invp_block_get_the_msrp',
	) );

	register_block_type( 'inventory-presser/odometer', array(
		'render_callback' => 'invp_block_get_the_odometer',
	) );

	register_block_type( 'inventory-presser/payment', array(
		'render_callback' => 'invp_block_get_the_payment',
	) );

	register_block_type( 'inventory-presser/payment-frequency', array(
		'render_callback' => 'invp_block_get_the_payment_frequency',
	) );

	register_block_type( 'inventory-presser/price', array(
		'render_callback' => 'invp_block_get_the_price',
	) );

	register_block_type( 'inventory-presser/stock-number', array(
		'render_callback' => 'invp_block_get_the_stock_number',
	) );

	register_block_type( 'inventory-presser/title-status', array(
		'render_callback' => 'invp_block_get_the_title_status',
	) );

	register_block_type( 'inventory-presser/transmission-speeds', array(
		'render_callback' => 'invp_block_get_the_transmission_speeds',
	) );

	register_block_type( 'inventory-presser/trim', array(
		'render_callback' => 'invp_block_get_the_trim',
	) );

	register_block_type( 'inventory-presser/vin', array(
		'render_callback' => 'invp_block_get_the_vin',
	) );

	register_block_type( 'inventory-presser/year', array(
		'render_callback' => 'invp_block_get_the_year',
	) );

	register_block_type( 'inventory-presser/youtube', array(
		'render_callback' => 'invp_block_get_the_youtube',
	) );
}
add_action( 'init', 'invp_create_blocks' );

function invp_block_template_tag_handler( $template_tag, $attributes )
{
	//Does the template tag even exist?
	if( ! is_callable( $template_tag ) )
	{
		return '';
	}

	//Does this post have a value coming out of the template tag?
	$value = $template_tag();
	if( empty( $value ) )
	{
		return '';
	}

	return sprintf(
		'<span%s>%s</span>',
		empty( $attributes['className'] ) ? '' : ' class="' . esc_attr( $attributes['className'] ) . '"',
		$value
	);
}

function invp_block_get_the_body_style( $attributes )
{
	return invp_block_template_tag_handler( 'invp_get_the_body_style', $attributes );
}

function invp_block_get_the_color( $attributes )
{
	return invp_block_template_tag_handler( 'invp_get_the_color', $attributes );
}

function invp_block_get_the_down_payment( $attributes )
{
	return invp_block_template_tag_handler( 'invp_get_the_down_payment', $attributes );
}

function invp_block_get_the_engine( $attributes )
{
	return invp_block_template_tag_handler( 'invp_get_the_engine', $attributes );
}

function invp_block_get_the_interior_color( $attributes )
{
	return invp_block_template_tag_handler( 'invp_get_the_interior_color', $attributes );
}

function invp_block_get_the_last_modified( $attributes )
{
	return invp_block_template_tag_handler( 'invp_get_the_last_modified', $attributes );
}

function invp_block_get_the_make( $attributes )
{
	return invp_block_template_tag_handler( 'invp_get_the_make', $attributes );
}

function invp_block_get_the_model( $attributes )
{
	return invp_block_template_tag_handler( 'invp_get_the_model', $attributes );
}

function invp_block_get_the_msrp( $attributes )
{
	return invp_block_template_tag_handler( 'invp_get_the_msrp', $attributes );
}

function invp_block_get_the_price( $attributes )
{
	return invp_block_template_tag_handler( 'invp_get_the_price', $attributes );
}

function invp_block_get_the_odometer( $attributes )
{
	return invp_block_template_tag_handler( 'invp_get_the_odometer', $attributes );
}

function invp_block_get_the_payment( $attributes )
{
	return invp_block_template_tag_handler( 'invp_get_the_payment', $attributes );
}

function invp_block_get_the_payment_frequency( $attributes )
{
	return invp_block_template_tag_handler( 'invp_get_the_payment_frequency', $attributes );
}

function invp_block_get_the_stock_number( $attributes )
{
	return invp_block_template_tag_handler( 'invp_get_the_stock_number', $attributes );
}

function invp_block_get_the_title_status( $attributes )
{
	return invp_block_template_tag_handler( 'invp_get_the_title_status', $attributes );
}

function invp_block_get_the_transmission_speeds( $attributes )
{
	return invp_block_template_tag_handler( 'invp_get_the_transmission_speeds', $attributes );
}

function invp_block_get_the_trim( $attributes )
{
	return invp_block_template_tag_handler( 'invp_get_the_trim', $attributes );
}

function invp_block_get_the_vin( $attributes )
{
	return invp_block_template_tag_handler( 'invp_get_the_vin', $attributes );
}

function invp_block_get_the_year( $attributes )
{
	return invp_block_template_tag_handler( 'invp_get_the_year', $attributes );
}

function invp_block_get_the_youtube( $attributes )
{
	return invp_block_template_tag_handler( 'invp_get_the_youtube', $attributes );
}


function invp_block_carfax_button_get_html( $attributes )
{
	if( ! class_exists( 'INVP' ) )
	{
		return '';
	}

	$invp_settings = INVP::settings();
	if( empty( $invp_settings['use_carfax'] ) || ! $invp_settings['use_carfax'] )
	{
		return '';
	}

	return apply_filters( 'invp_block_carfax_button', invp_get_the_carfax_icon_html() );
}

function invp_block_description_get_html( $attributes )
{
	$description = invp_get_the_description();
	if( empty( $description ) )
	{
		return '';
	}
	return apply_filters( 'invp_block_description', sprintf( 
		'<div class="vehicle-content-wrap">%s</div>', 
		invp_get_the_description()
	) );
}

function invp_block_fuel_economy_get_html( $attributes )
{
	//if the vehicle doesn't have EPA data, abort
	if( empty( invp_get_the_fuel_economy_value( 'city', 1 ) ) || empty( invp_get_the_fuel_economy_value( 'highway', 1 ) ) )
	{
		return;
	}

	//There could be two fuel types
	$fuel_types = 0;

	if( ! empty( invp_get_the_fuel_economy_value( 'city', 1 ) ) )
	{
		$fuel_types++;
	}

	if( ! empty( invp_get_the_fuel_economy_value( 'city', 2 ) ) )
	{
		$fuel_types++;
	}

	$html = '';

	for( $t=1; $t<=$fuel_types; $t++ )
	{
		//name
		if( ! empty( invp_get_the_fuel_economy_value( 'name', $t ) ) )
		{
			$html .= sprintf( 
				'<div class="fuel-name">%s</div>', 
				invp_get_the_fuel_economy_value( 'name', $t )
			);
		}

		$html .= '<div class="fuel-economy-fuel">';

		//Combined
		if( ! empty( invp_get_the_fuel_economy_value( 'combined', $t ) ) )
		{
			$html .= sprintf(
				'<div class="fuel-economy-combined"><span class="number">%s</span></div><div class="fuel-economy-combined-label">%s</div>',
				invp_get_the_fuel_economy_value( 'combined', $t ),
				__( 'combined', 'inventory-presser' )
			);
		}

		//MPG and pump icon
		$html .= sprintf(
			'<div class="mpg">%s'
			. '<svg class="fuel-pump" xmlns="http://www.w3.org/2000/svg" width="792" height="720" viewBox="0 0 792 720"><path class="fuel-pump-img" d="M598.1 406c0 74.3-0.1 160.3-0.1 234.6 0 7.3 0.1 14.9 0 22.2 -0.2 29.6-1 29.6-31.6 29.6 -96.7 0.1-193.4 0-290.1-0.1 -19.1 0-38.3-0.1-58.3 0 -23.7 0.1-24.7-0.9-24.7-29.4 0.3-186.6-0.3-373.3-0.3-560 0-47.1 28.1-74.7 76.8-75 79.1-0.5 158.2-0.5 237.3-0.1 15.2 0.1 30.9 1.9 45.6 5.6 26 6.7 45.6 29.1 45.1 54.9 -0.1 3 0.3 26.1 0.3 26.1s10.2 11.7 25.5 24.5c23.7 20.1 44.9 42.9 67.7 64.1 21.8 20.2 31.2 45 31.5 73.3 0.3 35.7 2 71.4-0.5 106.9 -2.6 36.4 8 76.7 28.7 105.9 21.8 30.8 38.2 76.5 25.4 124.7 -15.5 44.3-40.7 63.6-91.2 60.2 -35.5-2.4-63-30.7-63.6-67.8 -0.7-46.1 0.3-92.3-0.1-138.4 -0.1-13.5 0-32.6-0.7-46.1C619.9 403.3 608.9 406 598.1 406zM285.7 73.3c-33.7-0.1-49.4 13.7-49.4 46 0 42.7 0.1 85.6 0.1 128.7 0 27.3 10 40.2 37.5 41.2 79.8 2.7 164.7 4 244.6 3 24.6-0.3 38.9-18.4 38.9-42.2 0.1-44-0.1-90-0.1-131.8 0-32.9-12.6-43-46.4-43.9C474.7 73.1 322.9 73.4 285.7 73.3zM598.5 378.7c53.8 0 51.5 20.6 52.1 67.6 0.6 50.3 1.1 100.5 1.3 150.8 0.2 43.6 26 49.5 46.3 48.4 27.1-1.5 47-22.7 49.1-49.7 2.2-27.9-1.6-54.6-16.8-78.5 -29-45.7-44.7-93.7-38.6-148.8 1.2-10.7-9-25.1-16.5-32.5 -55.2-53.9-45.9-58-46.4-111.9 0-4.1-0.8-41.9-0.8-41.9l-29.6-26.9C598.5 155.5 598.5 312.3 598.5 378.7z"/></svg>'
			. '</div>',
			__( 'MPG', 'inventory-presser' )
		);

		if( ! empty( invp_get_the_fuel_economy_value( 'city', $t ) ) )
		{
			$html .= sprintf(
				'<div class="fuel-economy-city"><span class="number">%s</span></div><div class="fuel-economy-city-label">%s</div>',
				invp_get_the_fuel_economy_value( 'city', $t ),
				__( 'city', 'inventory-presser' )
			);
		}

		if( ! empty( invp_get_the_fuel_economy_value( 'highway', $t ) ) )
		{
			$html .= sprintf(
				'<div class="fuel-economy-highway"><span class="number">%s</span></div><div class="fuel-economy-highway-label">%s</div>',
				invp_get_the_fuel_economy_value( 'highway', $t ),
				__( 'highway', 'inventory-presser' )
			);
		}
		$html .= '</div>';

		//Are we including an optional second section with annual consumption, cost & emissions?
		if( ! empty( $attributes['includeAnnualStats'] )
			&& ( ! empty( invp_get_the_fuel_economy_value( 'five_year_savings', null ) )
				|| ! empty( invp_get_the_fuel_economy_value( 'annual_consumption', $t ) )
				|| ! empty( invp_get_the_fuel_economy_value( 'annual_cost', $t ) )
				|| empty( invp_get_the_fuel_economy_value( 'annual_emissions', $t  ) ) ) )
		{
			//Yes
			$html .= '<dl class="fuel-economy-annual-stats">';

			//Five year savings
			if( ! empty( invp_get_the_fuel_economy_value( 'five_year_savings', null ) ) )
			{
				$html .= sprintf(
					'<dt>%s</dt><dd>%s</dd>',
					__( 'Five year savings compared to average vehicle', 'inventory-presser' ),
					sprintf( '$%s', number_format( invp_get_the_fuel_economy_value( 'five_year_savings', null ), 0, '.', ',' ) )
				);
			}

			//Annual consumption
			if( ! empty( invp_get_the_fuel_economy_value( 'annual_consumption', $t ) ) )
			{
				$number = invp_get_the_fuel_economy_value( 'annual_consumption', $t );
				if( is_numeric( $number ) )
				{
					$number = round( $number, 2 );
				}
				$html .= sprintf(
					'<dt>%s</dt><dd>%s %s</dd>',
					__( 'Annual fuel consumption', 'inventory-presser' ),
					$number,
					__( 'barrels', 'inventory-presser' )
				);
			}

			//Annual cost
			if( ! empty( invp_get_the_fuel_economy_value( 'annual_cost', $t ) ) )
			{
				$price = invp_get_the_fuel_economy_value( 'annual_cost', $t );
				if( is_numeric( $price ) )
				{
					$price = sprintf( '$%s', number_format( $price, 0, '.', ',' ) );
				}
				$html .= sprintf(
					'<dt>%s</dt><dd>%s</dd>',
					__( 'Annual fuel cost', 'inventory-presser' ),
					$price
				);
			}

			//Annual emissions
			if( ! empty( invp_get_the_fuel_economy_value( 'annual_emissions', $t ) ) )
			{
				$html .= sprintf(
					'<dt>%s</dt><dd>%s %s</dd>',
					__( 'Annual tailpipe CO2 emissions', 'inventory-presser' ),
					invp_get_the_fuel_economy_value( 'annual_emissions', $t ),
					__( 'grams per mile', 'inventory-presser' )
				);
			}

			$html .= '</dl>';
		}
	}

	return '<div class="fuel-economy-wrapper">' . $html . '</div>';
}

function invp_block_hours_today_get_html( $attributes )
{
	if( empty( $attributes['location'] )
		|| ! class_exists( 'Inventory_Presser_Shortcode_Hours_Today' ) )
	{
		return '';
	}

	$shortcode = new Inventory_Presser_Shortcode_Hours_Today();

	$term = get_term( $attributes['location'], 'location' );
	if( empty( $term->slug ) )
	{
		return '';
	}

	$hours_sets = $shortcode->find_hours_sets_by_location_slug( $term->slug );
	if( ! empty( $attributes['hoursUid'] ) )
	{
		$hours_sets[0] = $shortcode->find_hours_set_by_uid( $attributes['hoursUid'] );
	}
	$days = $shortcode->create_days_array_from_hours_array( $hours_sets[0] );
	return sprintf( 
		'<span%s>%s</span>',
		empty( $attributes['className'] ) ? '' : ' class="' . $attributes['className'] . '"',
		$shortcode->create_sentence( $days )
	);
}

function invp_block_iframe_get_html( $attributes )
{
	$attributes['class'] = $attributes['className'] ?? '';
	unset( $attributes['className'] );

	$shortcode = new Inventory_Presser_Shortcode_Iframe();
	return $shortcode->content( $attributes );
}

function invp_block_options_list_get_html( $attributes )
{
	$options_array = invp_get_the_options();
	if( empty( $options_array ) )
	{
		return '';
	}
	$html = '<ul class="vehicle-features">';

	// loop through list of vehicle options
	foreach( $options_array as $option )
	{
		$html .= sprintf( '<li>%s</li>', $option );
	}

	return apply_filters( 'invp_block_options_list', $html . '</ul>' );
}

function invp_block_phone_number_get_html( $attributes )
{
	if( empty( $attributes['location'] ) )
	{
		return '';
	}

	$term = get_term( $attributes['location'], 'location' );
	if( empty( $term->slug ) )
	{
		return '';
	}

	$formats = array(
		'small_left_label' => array(
			'selector'    => __( 'Small, left label', 'inventory-presser' ),
			'uses_labels' => true,
			'before'      => '<table>',
			'repeater'    => '<tr><th>%1$s</th><td class="phone-link"><a href="tel:+%2$s">%3$s</a></td><tr>',
			'after'       => '</table>',
		),
		'large_no_label' => array(
			'selector'    => __( 'Large, no label', 'inventory-presser' ),
			'uses_labels' => false,
			'before'      => '',
			'repeater'    => '<h2><a href="tel:+%1$s">%2$s</a></h2>',
			'after'       => '',
		),
		'large_table_left' => array(
			'selector'    => __( 'Large tabled, left label', 'inventory-presser' ),
			'uses_labels' => true,
			'before'      => '<table>',
			'repeater'    => '<tr><th>%1$s</th><td class="phone-link"><a href="tel:+%2$s">%3$s</a></td><tr>',
			'after'       => '</table>',
		),
		'large_left_label' => array(
			'selector'    => __( 'Large, small left label', 'inventory-presser' ),
			'uses_labels' => true,
			'before'      => '<table>',
			'repeater'    => '<tr><th>%1$s</th><td><h2><a href="tel:+%2$s">%3$s</a></h2></td><tr>',
			'after'       => '</table>',
		),
		'large_right_label' => array(
			'selector'    => __( 'Large, small right label', 'inventory-presser' ),
			'uses_labels' => true,
			'before'      => '<table>',
			'repeater'    => '<tr><td><h2><a href="tel:+%2$s">%3$s</a></h2></td><th>%1$s</th><tr>',
			'after'       => '</table>',
		),
		'single_line_labels' => array(
			'selector'    => __( 'Single line with labels', 'inventory-presser' ),
			'uses_labels' => true,
			'before'      => '',
			'repeater'    => '<span>%1$s:</span> <a href="tel:+%2$s">%3$s</a>',
			'after'       => '',
		),
		'single_line_no_labels' => array(
			'selector'    => __( 'Single line no labels', 'inventory-presser' ),
			'uses_labels' => false,
			'before'      => '',
			'repeater'    => '<span><a href="tel:+%1$s">%2$s</a></span>',
			'after'       => '',
		),
	);

	$html = '';
	if( ! empty( $formats[$attributes['format']]['before'] ) )
	{
		$html .= $formats[$attributes['format']]['before'];
	}

	for( $p=1; $p<=INVP::LOCATION_MAX_PHONES; $p++ )
	{
		$phone_uid = get_term_meta( $attributes['location'], 'phone_' . $p . '_uid', true );
		if( ! $phone_uid )
		{
			break;
		}

		//There is a phone number is slot $p, should this block to display it?
		if( in_array( $phone_uid, $attributes['phoneUids'] ) )
		{
			//Yes, output this number
			$number = get_term_meta( $attributes['location'], 'phone_' . $p . '_number', true );
			if( $formats[$attributes['format']]['uses_labels'] )
			{
				$html .= sprintf(
					$formats[$attributes['format']]['repeater'],
					get_term_meta( $attributes['location'], 'phone_' . $p . '_description', true ),
					INVP::prepare_phone_number_for_link( $number ),
					$number
				);
			}
			else
			{
				$html .= sprintf(
					$formats[$attributes['format']]['repeater'],
					INVP::prepare_phone_number_for_link( $number ),
					$number
				);
			}
		}
	}

	if( ! empty( $formats[$attributes['format']]['before'] ) )
	{
		$html .= $formats[$attributes['format']]['before'];
	}

	return $html;
}

function invp_block_register_scripts()
{
	wp_register_script( 
		'invp-flexslider-block',
		plugins_url( '/src/photo-slider/photo-slider.min.js', __FILE__ ),
		array( 'jquery', 'invp-flexslider' ),
		false,
		true
	);
}
add_action( 'wp_enqueue_scripts', 'invp_block_register_scripts', 20 );
add_action( 'enqueue_block_editor_assets', 'invp_block_register_scripts', 20 );

function invp_block_photo_slider_get_html( $attributes )
{
	wp_enqueue_style( 'flexslider' );
	wp_enqueue_script( 'invp-flexslider-block' );

	$image_url_lists = invp_get_the_photos( array( 'large', 'thumb' ) );
	if( empty( $image_url_lists ) )
	{
		return '';
	}

	ob_start();

	?><div class="vehicle-images wp-block">
		<div class="slider-width"></div>
		<div class="slider invp-flexslider">
			<ul class="slides"><?php

				if ( isset( $image_url_lists['large'] ) )
				{
					for( $p=0; $p<sizeof( $image_url_lists['large'] ); $p++ )
					{
						//Inventory Presser versions 8.1.0 and above provide the 'urls'
						if( isset( $image_url_lists['urls'][$p] ) )
						{
							printf(
								'<li><a href="%s">%s</a></li>',
								$image_url_lists['urls'][$p],
								$image_url_lists['large'][$p]
							);
						}
						else
						{
								printf(
								'<li>%s</li>',
								$image_url_lists['large'][$p]
							);
						}
					}
				}
			?></ul>
		</div><?php

		if ( isset( $image_url_lists['thumb'] ) && count($image_url_lists['thumb']) > 1)
		{
			?><div class="invp-flexslider-thumbs invp-flexslider no-preview">
			<ul class="slides"><?php

				foreach( $image_url_lists['thumb'] as $image )
				{
					printf( '<li>%s</li>', $image );
				}

			?></ul>
		</div><?php

		}
	?></div><?php

	return ob_get_clean();
}

function invp_block_payment_calculator_get_html( $attributes )
{
	//Need a JavaScript include wherever this block is rendered
	wp_enqueue_script(
		'invp-payment-calculator',
		plugins_url( 'src/payment-calculator/payment-calculator.min.js', __FILE__ )
	);

	ob_start();

	?><div id="payment_calculator">
		<ul>
			<li>
				<label for="trade_amount"><?php _e( 'Cash/trade', 'invp-payment-calculator' ); ?></label>
				<input type="text" id="trade" name="trade" onchange="pcw_go();" onkeyup="pcw_only_decimals( this ); pcw_go();" />
			</li>
			<li>
				<label for="apr"><?php _e( 'APR %*', 'invp-payment-calculator' ); ?></label>
				<input type="text" id="apr" name="apr" value="<?php echo $attributes['defaultAPR']; ?>" onchange="pcw_go();" onkeyup="pcw_only_decimals( this ); pcw_go();" />
			</li>
			<li>
				<label for="term"><?php _e( 'Term', 'invp-payment-calculator' ); ?></label>
				<select size="1" id="term" name="term" onchange="pcw_go();"><?php
					$terms = [ 12, 18, 24, 30, 36, 42, 48, 60, 72, 84 ];
					foreach( $terms as $term )
					{
						printf( 
							'<option value="%s"%s>%s %s</option>',
							$term,
							selected( $attributes['defaultTerm'], $term, false ),
							$term,
							__( 'months', 'inventory-presser' )
						);
					}
				?></select>
			</li>
			<li>
				<label for="payment"><?php _e( 'Payment', 'invp-payment-calculator' ); ?></label>
				<input type="text" id="payment" name="payment" value="$0.00" />
			</li>
		</ul>
		<p>* <?php echo $attributes['disclaimer']; ?></p>
		<input type="hidden" id="loan_amount" name="loan_amount" value="<?php echo invp_get_raw_price(); ?>" />
	</div><?php

	$html = ob_get_clean();
	return $html;
}

function invp_block_attribute_table_get_html( $attributes )
{
	if( ! class_exists( 'INVP' ) )
	{
		return '';
	}
	
	$post_ID = get_the_ID();
	$invp_settings = INVP::settings();

	/**
	 * Build an array of items that will make up a table
	 * of vehicle attributes. If a value key is not
	 * provided, the member will be used directly on the
	 * vehicle object to find the value.
	 */
	$table_items = array();

	//Book Value
	if( ! isset( $invp_settings['price_display'] ) || 'genes' != $invp_settings['price_display'] )
	{
		$book_value = invp_get_the_book_value( $post_ID );
		if( ! empty( $book_value )
			&& invp_get_raw_book_value( $post_ID ) > invp_get_raw_price( $post_ID ) )
		{
			$table_items[] = array(
				'member' => 'book_value',
				'label'  => __( 'Book Value', 'inventory-presser' ),
				'value'  => $book_value,
			);
		}
	}

	//Odometer
	if( 'boat' != strtolower( invp_get_the_type( $post_ID ) ) )
	{
		$table_items[] = array(
			'member' => 'odometer',
			'label'  => apply_filters( 'invp_label-odometer', apply_filters( 'invp_odometer_word', __( 'Mileage', 'inventory-presser' ) ) ),
			'value'  => invp_get_the_odometer( ' ' . apply_filters( 'invp_odometer_word', 'Miles' ), $post_ID ),
		);
	}

	$table_items = array_merge( $table_items, array(

		//Type
		array(
			'member' => 'type',
			'label'  => __( 'Type', 'inventory_presser' ),
			'value'  => invp_get_the_type( $post_ID ),
		),

		//Body Style
		array(
			'member' => 'body_style',
			'label'  => __( 'Body Style', 'inventory_presser' ),
			'value'  => invp_get_the_body_style( $post_ID ),
		),

		//Exterior Color
		array(
			'member' => 'color',
			'label'  => __( 'Color', 'inventory_presser' ),
			'value'  => invp_get_the_color( $post_ID ),
		),

		//Interior Color
		array(
			'member' => 'interior_color',
			'label'  => __( 'Interior', 'inventory_presser' ),
			'value'  => invp_get_the_interior_color( $post_ID ),
		),

		//Fuel + Engine
		array(
			'member' => 'engine',
			'label'  => __( 'Engine', 'inventory-presser' ),
			'value'  => trim( implode( ' ', array( invp_get_the_fuel( $post_ID ), invp_get_the_engine( $post_ID ) ) ) ),
		),

		//Transmission
		array(
			'member' => 'transmission',
			'label'  => __( 'Transmission', 'inventory-presser' ),
			'value'  => invp_get_the_transmission( $post_ID ),
		),

		//Drive Type
		array(
			'member' => 'drive_type',
			'label'  => __( 'Drive Type', 'inventory-presser' ),
			'value'  => invp_get_the_drive_type( $post_ID ),
		),

		//Doors
		array(
			'member' => 'doors',
			'label'  => __( 'Doors', 'inventory-presser' ),
			'value'  => invp_get_the_doors( $post_ID ),
		),

		//Stock Number
		array(
			'member' => 'stock_number',
			'label'  => __( 'Stock', 'inventory-presser' ),
			'value'  => invp_get_the_stock_number( $post_ID ),
		),

		//VIN
		array(
			'member' => 'vin',
			'label'  => 'boat' == strtolower( invp_get_the_type( $post_ID ) ) ? __( 'HIN', 'inventory-presser' ) : __( 'VIN', 'inventory-presser' ),
			'value'  => invp_get_the_VIN( $post_ID ),
		),
	) );

	//Boat-specific fields
	if( 'boat' == strtolower( invp_get_the_type( $post_ID ) ) )
	{
		//Beam
		$table_items[] = array(
			'member' => 'beam',
			'label'  => __( 'Beam', 'inventory-presser' ),
		);

		//Length
		$table_items[] = array(
			'member' => 'length',
			'label'  => __( 'Length', 'inventory-presser' ),
		);

		//Hull material
		$table_items[] = array(
			'member' => 'hull_material',
			'label'  => __( 'Hull Material', 'inventory-presser' ),
		);
	}

	$table_items = apply_filters( 'invp_vehicle_attribute_table_items', $table_items );

	$html = '';
	foreach( $table_items as $item )
	{
		//does the vehicle have a value for this member?
		$member = $item['member'];
		if( empty( $item['value'] ) && empty( INVP::get_meta( $member, $post_ID ) ) )
		{
			//no
			continue;
		}

		$html .= sprintf(
			'<div class="item"><div class="label">%s</div><div class="value">%s</div></div>',
			apply_filters( 'invp_label-' . $member, $item['label'] ),
			apply_filters( 'invp_vehicle_attribute_table_cell', empty( $item['value'] ) ? strtolower( INVP::get_meta( $member, $post_ID ) ) : $item['value'] )
		);
	}
	if( ! empty( $html ) )
	{
		$html = '<div class="attribute-table">' . $html . '</div>';
	}

	return apply_filters( 'invp_block_attribute_table', $html );
}
