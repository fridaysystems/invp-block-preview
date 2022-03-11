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
}
add_action( 'init', 'invp_create_blocks' );

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

	return $html;
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
add_action( 'wp_enqueue_scripts', 'invp_block_register_scripts' );
add_action( 'enqueue_block_editor_assets', 'invp_block_register_scripts' );

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
