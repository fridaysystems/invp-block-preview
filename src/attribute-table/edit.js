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
	BlockControls
} from '@wordpress/block-editor';

import {
	TextControl,
	SelectControl
} from '@wordpress/components';

//Needed to access post meta
import { useSelect } from '@wordpress/data';
import { useEntityProp } from '@wordpress/core-data';

//Needed to access terms
import { store as coreStore } from '@wordpress/core-data';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

function getTerms( taxonomy ) {
	return useSelect(
		( select ) => {
			const taxonomyArgs = [
				'taxonomy',
				taxonomy,
				{
					per_page: -1,
					hide_empty: false,
					context: 'view'
				},
			];
			const { getEntityRecords, isResolving } = select( coreStore );
			const terms = getEntityRecords( ...taxonomyArgs );
			const _isLoading = isResolving( 'getEntityRecords', taxonomyArgs );

			return {
				terms: terms,
				isLoading: _isLoading,
				hasTerms: !! terms?.length,
			};
		},
		[ taxonomy ]
	);
}

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

	//Using a term name stored in a meta field, find the matching term ID
	const findTermID = ( metaSuffix, termsArray ) => {
		if( ! termsArray.hasTerms 
			|| ! meta[ invp_blocks.meta_prefix + metaSuffix ] )
		{
			return false;
		}
		const term = termsArray.terms.find( term => term.name == meta[ invp_blocks.meta_prefix + metaSuffix ]);
		return term ? term.id : false;
	};

	/**
	 * The meta value we save is the term name, but the value of the <option>
	 * elements in the drop down are the term IDs.
	 */
	const transmissionTerms = getTerms( 'transmission' );
	const transmissionTermID = findTermID( 'transmission', transmissionTerms );
	const updateTransmissionMetaValue = ( terms ) => ( newValue ) => {
		if( ! terms.hasTerms )
		{
			return;
		}
		const term = terms.hasTerms && terms.terms.find(term => term.id == newValue && 0 != term.id );
		setMeta( { ...meta, [invp_blocks.meta_prefix + 'transmission']: term ? term.name : '' } );
	};

	const driveTypeTerms = getTerms( 'drive_type' );
	const driveTypeTermID = findTermID( 'drive_type', driveTypeTerms );
	const updateDriveTypeMetaValue = ( terms ) => ( newValue ) => {
		if( ! terms.hasTerms )
		{
			return;
		}
		const term = terms.hasTerms && terms.terms.find(term => term.id == newValue && 0 != term.id );
		setMeta( { ...meta, [invp_blocks.meta_prefix + 'drive_type']: term ? term.name : '' } );
	};

	const fuelTerms = getTerms( 'fuel' );
	const fuelTermID = findTermID( 'fuel', fuelTerms );
	const updateFuelMetaValue = ( terms ) => ( newValue ) => {
		if( ! terms.hasTerms )
		{
			return;
		}
		const term = terms.hasTerms && terms.terms.find(term => term.id == newValue && 0 != term.id );
		setMeta( { ...meta, [invp_blocks.meta_prefix + 'fuel']: term ? term.name : '' } );
	};

	const cylindersTerms = getTerms( 'cylinders' );
	const cylindersTermID = findTermID( 'cylinders', cylindersTerms );
	const updateCylindersMetaValue = ( terms ) => ( newValue ) => {
		if( ! terms.hasTerms )
		{
			return;
		}
		const term = terms.hasTerms && terms.terms.find(term => term.id == newValue && 0 != term.id );
		setMeta( { ...meta, [invp_blocks.meta_prefix + 'cylinders']: term ? term.name : '' } );
	};

	const bodyStyleTerms = getTerms( 'style' );
	const bodyStyleTermID = findTermID( 'body_style', bodyStyleTerms );
	const updateBodyStyleMetaValue = ( terms ) => ( newValue ) => {
		if( ! terms.hasTerms )
		{
			return;
		}
		const term = terms.hasTerms && terms.terms.find(term => term.id == newValue && 0 != term.id );
		setMeta( { ...meta, [invp_blocks.meta_prefix + 'body_style']: term ? term.name : '' } );
	};

	const typeTerms = getTerms( 'type' );
	const typeTermID = findTermID( 'type', typeTerms );
	const updateTypeMetaValue = ( terms ) => ( newValue ) => {
		if( ! terms.hasTerms )
		{
			return;
		}
		const term = terms.hasTerms && terms.terms.find(term => term.id == newValue && 0 != term.id );
		setMeta( { ...meta, [invp_blocks.meta_prefix + 'type']: term ? term.name : '' } );
	};

	[
		transmissionTerms,
		driveTypeTerms,
		fuelTerms,
		cylindersTerms,
		bodyStyleTerms,
		typeTerms
	].forEach( ( termsArray ) => {
		//Add a "Please choose" item at the beginning so users can unset the value
		if( termsArray.hasTerms && 0 != termsArray.terms[0].id )
		{
			termsArray.terms.unshift( { id: 0, name: __( 'Please choose', 'inventory-presser' ) } );
		}
	} );

	//Odometer
	const metaOdometerValue = meta[ invp_blocks.meta_prefix + 'odometer' ];
	const updateOdometerMetaValue = ( newValue ) => {
		//allow only digits
		setMeta( { ...meta, [invp_blocks.meta_prefix + 'odometer']: newValue.replace( /[^0-9]+/g, '' ) } );
	};

	//Color
	const metaColorValue = meta[ invp_blocks.meta_prefix + 'color' ];
	const updateColorMetaValue = ( newValue ) => {
		setMeta( { ...meta, [invp_blocks.meta_prefix + 'color']: newValue } );
	};

	//Interior Color
	const metaInteriorColorValue = meta[ invp_blocks.meta_prefix + 'interior_color' ];
	const updateInteriorColorMetaValue = ( newValue ) => {
		setMeta( { ...meta, [invp_blocks.meta_prefix + 'interior_color']: newValue } );
	};

	//Stock number
	const metaStockNumberValue = meta[ invp_blocks.meta_prefix + 'stock_number' ];
	const updateStockNumberMetaValue = ( newValue ) => {
		setMeta( { ...meta, [invp_blocks.meta_prefix + 'stock_number']: newValue } );
	};

	//VIN
	const metaVinValue = meta[ invp_blocks.meta_prefix + 'vin' ];
	const updateVinMetaValue = ( newValue ) => {
		setMeta( { ...meta, [invp_blocks.meta_prefix + 'vin']: newValue } );
	};	

	return (
		<div { ...blockProps }>
			<BlockControls></BlockControls>
			<TextControl
				label={ __( 'Odometer', 'inventory-presser' ) }
				value={ metaOdometerValue }
				onChange={ updateOdometerMetaValue }
			/>
			<SelectControl
				label={ __( 'Type', 'inventory-presser' ) }
				value={ typeTermID }
				options={ typeTerms.hasTerms 
					&& typeTerms.terms.map( term => ({ label: term.name, value: term.id }))}
				onChange={ updateTypeMetaValue( typeTerms ) }
			/>
			<SelectControl
				label={ __( 'Body Style', 'inventory-presser' ) }
				value={ bodyStyleTermID }
				options={ bodyStyleTerms.hasTerms 
					&& bodyStyleTerms.terms.map( term => ({ label: term.name, value: term.id }))}
				onChange={ updateBodyStyleMetaValue( bodyStyleTerms ) }
			/>
			<TextControl
				label={ __( 'Color', 'inventory-presser' ) }
				value={ metaColorValue }
				onChange={ updateColorMetaValue }
			/>
			<TextControl
				label={ __( 'Interior Color', 'inventory-presser' ) }
				value={ metaInteriorColorValue }
				onChange={ updateInteriorColorMetaValue }
			/>
			<SelectControl
				label={ __( 'Cylinders', 'inventory-presser' ) }
				value={ cylindersTermID }
				options={ cylindersTerms.hasTerms 
					&& cylindersTerms.terms.map( term => ({ label: term.name, value: term.id }))}
				onChange={ updateCylindersMetaValue( cylindersTerms ) }
			/>
			<SelectControl
				label={ __( 'Fuel', 'inventory-presser' ) }
				value={ fuelTermID }
				options={ fuelTerms.hasTerms 
					&& fuelTerms.terms.map( term => ({ label: term.name, value: term.id }))}
				onChange={ updateFuelMetaValue( fuelTerms ) }
			/>
			<SelectControl
				label={ __( 'Transmission', 'inventory-presser' ) }
				value={ transmissionTermID }
				options={ transmissionTerms.hasTerms 
					&& transmissionTerms.terms.map( term => ({ label: term.name, value: term.id }))}
				onChange={ updateTransmissionMetaValue( transmissionTerms ) }
			/>
			<SelectControl
				label={ __( 'Drive Type', 'inventory-presser' ) }
				value={ driveTypeTermID }
				options={ driveTypeTerms.hasTerms
					&& driveTypeTerms.terms.map( term => ({ label: term.name, value: term.id }))}
				onChange={ updateDriveTypeMetaValue( driveTypeTerms ) }
			/>
			<TextControl
				label={ __( 'Stock', 'inventory-presser' ) }
				value={ metaStockNumberValue }
				onChange={ updateStockNumberMetaValue }
			/>
			<TextControl
				label={ __( 'VIN', 'inventory-presser' ) }
				value={ metaVinValue }
				onChange={ updateVinMetaValue }
			/>
		</div>
	);
}