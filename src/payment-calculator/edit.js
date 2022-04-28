/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import { 
	useBlockProps,
	BlockControls,
	InspectorControls,
	RichText	
} from '@wordpress/block-editor';

import {
	PanelBody,
	PanelRow,
	SelectControl,
	TextControl
} from '@wordpress/components';

//Needed to access post meta
import { useSelect } from '@wordpress/data';
import { useEntityProp } from '@wordpress/core-data';


/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit( { attributes, setAttributes } ) {

	const blockProps = useBlockProps();
	const postType = useSelect(
		( select ) => select( 'core/editor' ).getCurrentPostType(),
		[]
	);
	const [ meta, setMeta ] = useEntityProp( 'postType', postType, 'meta' );
	
	const updateDefaultAPR = ( newValue ) => {
		setAttributes( { defaultAPR: parseFloat( newValue.replace( /[^0-9\.]+/g, '' ) ) } )
	}

	const changeTradeValue = ( newValue ) => {
		newValue = newValue.replace( /[^0-9\.]+/g, '' );
		setAttributes( { trade: newValue } );
		setAttributes( { payment: pcw_calculate_payment( newValue ) } );
	}

	const changeAPR = ( newValue ) => {
		newValue = newValue.replace( /[^0-9\.]+/g, '' );
		setAttributes( { APR: newValue } );
		setAttributes( { payment: pcw_calculate_payment( null, newValue ) } );
	}

	const changePayment = () => {
		setAttributes( { payment: pcw_calculate_payment() } );
	}

	function pcw_calculate_payment( newTrade = null, newAPR = null, newTerm = null ) {
		var amount_financed = meta[ invp_blocks.meta_prefix + 'price' ];
		var trade = newTrade || attributes.trade;
		var apr = newAPR || attributes.apr;
		var term = newTerm || attributes.term;

		var periods_per_year = 12;
		var payment_factor = 0;
		apr = apr / ( periods_per_year * 100);
	
		if( 0 == apr ) {
			payment_factor = term;
		} else {
			payment_factor =  ( 1 - 1 / Math.pow( ( 1 + apr ), term ) ) / apr;
		}

		var raw = Math.round( ( amount_financed - trade ) / payment_factor * 100 ) / 100;
		var payment = pcw_format_currency( raw );
		return payment;
	}

	const calculatePayment = () => {
		var amount_financed = meta[ invp_blocks.meta_prefix + 'price' ];
		var trade = attributes.trade;
		var apr = attributes.apr;
		var term = attributes.term;

		var periods_per_year = 12;
		var payment_factor = 0;
		apr = apr / ( periods_per_year * 100);
	
		if( 0 == apr ) {
			payment_factor = term;
		} else {
			payment_factor =  ( 1 - 1 / Math.pow( ( 1 + apr ), term ) ) / apr;
		}

		var raw = Math.round( ( amount_financed - trade ) / payment_factor * 100 ) / 100;
		var payment = pcw_format_currency( raw );
		return payment;
	}

	function pcw_format_currency( num ) {
		num = num.toString().replace(/\$|\,/g, '');
		if (isNaN(num)) { num = "0"; }
		var sign = (num == (num = Math.abs(num)));
		num = Math.floor(num * 100 + 0.50000000001);
		var cents = num % 100;
		num = Math.floor(num / 100).toString();
		if (cents < 10) { cents = "0" + cents };
		for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) {
			num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3));
		}
		return (((sign) ? '' : '-') + '$' + num + '.' + cents);
	}

	return (
		<>
			<InspectorControls>
				<PanelBody 
					title={ __( 'Payment Calculator Settings', 'invp-payment-calculator' )}
					initialOpen={true}
				>
					<PanelRow>
						<fieldset>
						<TextControl
							label={ __( 'Default APR', 'invp-payment-calculator' )}
							help={ __( 'What annual percentage rate should be pre-filled?', 'invp-payment-calculator' )}
							value={ attributes.defaultAPR }
							onChange={ updateDefaultAPR }
						/>
						</fieldset>
					</PanelRow>
				</PanelBody>
			</InspectorControls>
			<BlockControls></BlockControls>
			<div { ...blockProps } id="payment_calculator">
				<ul>
					<li>
						<TextControl
							label={ __( 'Cash/trade', 'invp-payment-calculator' ) }
							id={ 'trade' }
							value={ attributes.trade }
							onChange={ changeTradeValue }
						>
						</TextControl>
					</li>
					<li>
						<TextControl
							label={ __( 'APR %*', 'invp-payment-calculator' ) }
							id={ 'apr' }
							value={ attributes.APR ?? attributes.defaultAPR }
							onChange={ changeAPR }
						>
						</TextControl>
					</li>
					<li>
						<SelectControl
							label={ __( 'Term', 'invp-payment-calculator' ) }
							id={ 'term' }
							value={ attributes.defaultTerm }
							options={ [
								{
									label: __( '12 months', 'invp-payment-calculator' ),
									value: '12'
								},
								{
									label: __( '18 months', 'invp-payment-calculator' ),
									value: '18'
								},
								{
									label: __( '24 months', 'invp-payment-calculator' ),
									value: '24'
								},
								{
									label: __( '30 months', 'invp-payment-calculator' ),
									value: '30'
								},
								{
									label: __( '36 months', 'invp-payment-calculator' ),
									value: '36'
								},
								{
									label: __( '42 months', 'invp-payment-calculator' ),
									value: '42'
								},
								{
									label: __( '48 months', 'invp-payment-calculator' ),
									value: '48'
								},
								{
									label: __( '60 months', 'invp-payment-calculator' ),
									value: '60'
								},
								{
									label: __( '72 months', 'invp-payment-calculator' ),
									value: '72'
								},
								{
									label: __( '84 months', 'invp-payment-calculator' ),
									value: '84'
								},
							] }
						>
						</SelectControl>
					</li>
					<li>
						<TextControl
							label={ __( 'Payment', 'invp-payment-calculator' ) }
							id={ 'payment' }
							value={ pcw_calculate_payment }
							onChange={ changePayment }
						>
						</TextControl>
					</li>
				</ul>
				<p>* { attributes.disclaimer }</p>
				<input type="hidden" id="loan_amount" value={ meta[ invp_blocks.meta_prefix + 'price' ] } />
			</div>
		</>
	);
}