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
function create_block_invp_block_boilerplate_block_init() {
	register_block_type( __DIR__ . '/build/attribute-table', array(
		'render_callback' => 'invp_block_attribute_table_get_html',
	) );
}
add_action( 'init', 'create_block_invp_block_boilerplate_block_init' );

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

	return apply_filters( 'invp_vehicle_attribute_table', $html );
}
