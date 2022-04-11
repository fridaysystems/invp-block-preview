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
} from '@wordpress/block-editor';

// import {
// 	Placeholder,
// 	TextControl
// } from '@wordpress/components';

//Needed to access post meta
import { useSelect } from '@wordpress/data';
import { useEntityProp } from '@wordpress/core-data';

import {
	Placeholder,
	TextControl,
	CheckboxControl,
	PanelBody,
	PanelRow,
} from '@wordpress/components';

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

	function SiteUrl() {
		const site = useSelect( ( select ) => {
			return select( 'core' ).getSite();
		}, [] );
	 
		if ( ! site ) {
			return null;
		}
	 
		return site.url;
	}

	const toggleIncludeAnnualStats = () => {
		setAttributes( { includeAnnualStats: ! attributes.includeAnnualStats } )
	}

	const metaFuel1Name = meta[ invp_blocks.meta_prefix + 'fuel_economy_1_name' ];
	const updateFuel1NameMetaValue = ( newValue ) => {
		setMeta( { ...meta, [invp_blocks.meta_prefix + 'fuel_economy_1_name']: newValue } );
	};

	const metaFuel1Combined = meta[ invp_blocks.meta_prefix + 'fuel_economy_1_combined' ];
	const updateFuel1CombinedMetaValue = ( newValue ) => {
		setMeta( { ...meta, [invp_blocks.meta_prefix + 'fuel_economy_1_combined']: newValue } );
	};
	const metaFuel1City = meta[ invp_blocks.meta_prefix + 'fuel_economy_1_city' ];
	const updateFuel1CityMetaValue = ( newValue ) => {
		setMeta( { ...meta, [invp_blocks.meta_prefix + 'fuel_economy_1_city']: newValue } );
	};
	const metaFuel1Highway = meta[ invp_blocks.meta_prefix + 'fuel_economy_1_highway' ];
	const updateFuel1HighwayMetaValue = ( newValue ) => {
		setMeta( { ...meta, [invp_blocks.meta_prefix + 'fuel_economy_1_highway']: newValue } );
	};

	//There could be two fuel types
	const fuelTypes = { count: 0 };

	if( '' != meta[ invp_blocks.meta_prefix + 'fuel_economy_1_city' ] )
	{
		fuelTypes.count++;
	}
	if( '' != meta[ invp_blocks.meta_prefix + 'fuel_economy_2_city' ] )
	{
		fuelTypes.count++;
	}

	if( 0 == fuelTypes.count )
	{
		//We got a problem, show text boxes to let the user provide values
		return ( 		
			<>
				<BlockControls></BlockControls>
				<Placeholder
					{ ...blockProps }
					label="Fuel Economy"
					instructions="No miles per gallon data saved for this vehicle."
				>
					<TextControl						
						label="Combined MPG"
						tagName="p"
						onChange={ updateFuel1CombinedMetaValue }
						value={ metaFuel1Combined }
					></TextControl>
					<TextControl						
						label="Highway MPG"
						tagName="p"
						onChange={ updateFuel1HighwayMetaValue }
						value={ metaFuel1Highway }
					></TextControl>
					<TextControl						
						label="City MPG"
						tagName="p"
						onChange={ updateFuel1CityMetaValue }
						value={ metaFuel1City }
					></TextControl>
				</Placeholder>
			</> 
		);
	}

	const controls = [
		<>
			<div class="fuel-name">
				<TextControl
					label="Fuel 1 Name"
					tagName="p"
					onChange={ updateFuel1NameMetaValue }
					value={ metaFuel1Name }
					hideLabelFromVision="true"
				></TextControl>
			</div>
			<div class="fuel-economy-fuel">
				<div class="fuel-economy-combined">
					<span class="number">
					<TextControl						
						label="Combined MPG"
						tagName="p"
						onChange={ updateFuel1CombinedMetaValue }
						value={ metaFuel1Combined }
						hideLabelFromVision="true"
					></TextControl>
					</span>
				</div>
				<div class="fuel-economy-combined-label">
					{ __( 'combined', 'inventory-presser' ) }
				</div>
				<div class="mpg">
					{ __( 'MPG', 'inventory-presser' ) }
					<svg class="fuel-pump" xmlns="http://www.w3.org/2000/svg" width="792" height="720" viewBox="0 0 792 720"><path class="fuel-pump-img" d="M598.1 406c0 74.3-0.1 160.3-0.1 234.6 0 7.3 0.1 14.9 0 22.2 -0.2 29.6-1 29.6-31.6 29.6 -96.7 0.1-193.4 0-290.1-0.1 -19.1 0-38.3-0.1-58.3 0 -23.7 0.1-24.7-0.9-24.7-29.4 0.3-186.6-0.3-373.3-0.3-560 0-47.1 28.1-74.7 76.8-75 79.1-0.5 158.2-0.5 237.3-0.1 15.2 0.1 30.9 1.9 45.6 5.6 26 6.7 45.6 29.1 45.1 54.9 -0.1 3 0.3 26.1 0.3 26.1s10.2 11.7 25.5 24.5c23.7 20.1 44.9 42.9 67.7 64.1 21.8 20.2 31.2 45 31.5 73.3 0.3 35.7 2 71.4-0.5 106.9 -2.6 36.4 8 76.7 28.7 105.9 21.8 30.8 38.2 76.5 25.4 124.7 -15.5 44.3-40.7 63.6-91.2 60.2 -35.5-2.4-63-30.7-63.6-67.8 -0.7-46.1 0.3-92.3-0.1-138.4 -0.1-13.5 0-32.6-0.7-46.1C619.9 403.3 608.9 406 598.1 406zM285.7 73.3c-33.7-0.1-49.4 13.7-49.4 46 0 42.7 0.1 85.6 0.1 128.7 0 27.3 10 40.2 37.5 41.2 79.8 2.7 164.7 4 244.6 3 24.6-0.3 38.9-18.4 38.9-42.2 0.1-44-0.1-90-0.1-131.8 0-32.9-12.6-43-46.4-43.9C474.7 73.1 322.9 73.4 285.7 73.3zM598.5 378.7c53.8 0 51.5 20.6 52.1 67.6 0.6 50.3 1.1 100.5 1.3 150.8 0.2 43.6 26 49.5 46.3 48.4 27.1-1.5 47-22.7 49.1-49.7 2.2-27.9-1.6-54.6-16.8-78.5 -29-45.7-44.7-93.7-38.6-148.8 1.2-10.7-9-25.1-16.5-32.5 -55.2-53.9-45.9-58-46.4-111.9 0-4.1-0.8-41.9-0.8-41.9l-29.6-26.9C598.5 155.5 598.5 312.3 598.5 378.7z"/></svg>
				</div>
				<div class="fuel-economy-city">
					<span class="number">
					<TextControl						
						label="City MPG"
						tagName="p"
						onChange={ updateFuel1CityMetaValue }
						value={ metaFuel1City }
						hideLabelFromVision="true"
					></TextControl>						
					</span>
				</div>
				<div class="fuel-economy-city-label">
					{ __( 'city', 'inventory-presser' ) }
				</div>
				<div class="fuel-economy-highway">
					<span class="number">
					<TextControl						
						label="City MPG"
						tagName="p"
						onChange={ updateFuel1HighwayMetaValue }
						value={ metaFuel1Highway }
						hideLabelFromVision="true"
					></TextControl>	
					</span>
				</div>
				<div class="fuel-economy-highway-label">
					{ __( 'highway', 'inventory-presser' ) }
				</div>
			</div>			
		</>
	];

	if( attributes.includeAnnualStats )
	{
		const metaFuel1FiveYearSavings = meta[ invp_blocks.meta_prefix + 'fuel_economy_1_five_year_savings' ];
		const updateMetaFuel1FiveYearSavings = ( newValue ) => {
			setMeta( { ...meta, [invp_blocks.meta_prefix + 'fuel_economy_1_five_year_savings']: newValue } );
		};
		const metaFuel1AnnualConsumption = meta[ invp_blocks.meta_prefix + 'fuel_economy_1_annual_consumption' ];
		const updateMetaFuel1AnnualConsumption = ( newValue ) => {
			setMeta( { ...meta, [invp_blocks.meta_prefix + 'fuel_economy_1_annual_consumption']: newValue } );
		};
		const metaFuel1AnnualCost = meta[ invp_blocks.meta_prefix + 'fuel_economy_1_annual_cost' ];
		const updateMetaFuel1AnnualCost = ( newValue ) => {
			setMeta( { ...meta, [invp_blocks.meta_prefix + 'fuel_economy_1_annual_cost']: newValue } );
		};
		const metaFuel1AnnualEmissions = meta[ invp_blocks.meta_prefix + 'fuel_economy_1_annual_emissions' ];
		const updateMetaFuel1AnnualEmissions = ( newValue ) => {
			setMeta( { ...meta, [invp_blocks.meta_prefix + 'fuel_economy_1_annual_emissions']: newValue } );
		};

		controls.push(
			<dl class="fuel-economy-annual-stats">
				<dt>
					{ __( 'Five year savings compared to average vehicle', 'inventory-presser' ) }
				</dt>
				<dd>
					{ `$` } <TextControl
						value = { metaFuel1FiveYearSavings }
						label = { __( 'Five year savings compared to average vehicle', 'inventory-presser' ) }
						hideLabelFromVision = "true"
						onChange = { updateMetaFuel1FiveYearSavings }
					></TextControl>
				</dd>
				<dt>
					{ __( 'Annual fuel consumption', 'inventory-presser' ) }
				</dt>
				<dd>
					<TextControl
						value = { metaFuel1AnnualConsumption }
						label = { __( 'Annual fuel consumption', 'inventory-presser' ) }
						hideLabelFromVision = "true"
						onChange = { updateMetaFuel1AnnualConsumption }
					></TextControl> { __( 'barrels', 'inventory-presser' ) }
				</dd>
				<dt>
					{ __( 'Annual fuel cost', 'inventory-presser' ) }
				</dt>
				<dd>
					{ `$` } <TextControl
						value = { metaFuel1AnnualCost }
						label = { __( 'Annual fuel cost', 'inventory-presser' ) }
						hideLabelFromVision = "true"
						onChange = { updateMetaFuel1AnnualCost }
					></TextControl>
				</dd>
				<dt>
					{ __( 'Annual tailpipe CO2 emissions', 'inventory-presser') }
				</dt>
				<dd>
				<TextControl
						value = { metaFuel1AnnualEmissions }
						label = { __( 'Annual tailpipe CO2 emissions', 'inventory-presser' ) }
						hideLabelFromVision = "true"
						onChange = { updateMetaFuel1AnnualEmissions }
					></TextControl> { __( 'grams per mile', 'inventory-presser' ) }
				</dd>
			</dl>
		 );
	}





	return (
		<>
			<BlockControls></BlockControls>
			<InspectorControls>
				<PanelBody 
					title={ __( 'Fuel Economy Settings', 'inventory-presser' )}
					initialOpen={true}
				>
					<PanelRow>
						<fieldset>
						<CheckboxControl
							label={ __( 'Show Annual Stats', 'inventory-presser' )}
							help={ __( 'Include annual consumption, cost, and emissions?', 'inventory-presser' )}
							checked={ attributes.includeAnnualStats }
							onChange={ toggleIncludeAnnualStats }
						/>
						</fieldset>
					</PanelRow>
				</PanelBody>
			</InspectorControls>
			<div 
				{ ...blockProps }				
			>
				{ controls }
			</div>
		</>
	);
}