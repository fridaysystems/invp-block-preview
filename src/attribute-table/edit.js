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
			|| ! meta[ 'inventory_presser_' + metaSuffix ] )
		{
			return false;
		}
		const term = termsArray.terms.find( term => term.name == meta[ 'inventory_presser_' + metaSuffix ]);
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
		setMeta( { ...meta, "inventory_presser_transmission": term ? term.name : '' } );
	};

	const driveTypeTerms = getTerms( 'drive_type' );
	const driveTypeTermID = findTermID( 'drive_type', driveTypeTerms );
	const updateDriveTypeMetaValue = ( terms ) => ( newValue ) => {
		if( ! terms.hasTerms )
		{
			return;
		}
		const term = terms.hasTerms && terms.terms.find(term => term.id == newValue && 0 != term.id );
		setMeta( { ...meta, "inventory_presser_drive_type": term ? term.name : '' } );
	};

	const fuelTerms = getTerms( 'fuel' );
	const fuelTermID = findTermID( 'fuel', fuelTerms );
	const updateFuelMetaValue = ( terms ) => ( newValue ) => {
		if( ! terms.hasTerms )
		{
			return;
		}
		const term = terms.hasTerms && terms.terms.find(term => term.id == newValue && 0 != term.id );
		setMeta( { ...meta, "inventory_presser_fuel": term ? term.name : '' } );
	};

	const cylindersTerms = getTerms( 'cylinders' );
	const cylindersTermID = findTermID( 'cylinders', cylindersTerms );
	const updateCylindersMetaValue = ( terms ) => ( newValue ) => {
		if( ! terms.hasTerms )
		{
			return;
		}
		const term = terms.hasTerms && terms.terms.find(term => term.id == newValue && 0 != term.id );
		setMeta( { ...meta, "inventory_presser_cylinders": term ? term.name : '' } );
	};

	const bodyStyleTerms = getTerms( 'style' );
	const bodyStyleTermID = findTermID( 'body_style', bodyStyleTerms );
	const updateBodyStyleMetaValue = ( terms ) => ( newValue ) => {
		if( ! terms.hasTerms )
		{
			return;
		}
		const term = terms.hasTerms && terms.terms.find(term => term.id == newValue && 0 != term.id );
		setMeta( { ...meta, "inventory_presser_body_style": term ? term.name : '' } );
	};

	const typeTerms = getTerms( 'type' );
	const typeTermID = findTermID( 'type', typeTerms );
	const updateTypeMetaValue = ( terms ) => ( newValue ) => {
		if( ! terms.hasTerms )
		{
			return;
		}
		const term = terms.hasTerms && terms.terms.find(term => term.id == newValue && 0 != term.id );
		setMeta( { ...meta, "inventory_presser_type": term ? term.name : '' } );
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
			termsArray.terms.unshift( { id: 0, name: 'Please choose' } );
		}
	} );

	//Odometer
	const metaOdometerValue = meta[ 'inventory_presser_odometer' ];
	const updateOdometerMetaValue = ( newValue ) => {
		//allow only digits
		setMeta( { ...meta, inventory_presser_odometer: newValue.replace( /[^0-9]+/g, '' ) } );
	};

	//Color
	const metaColorValue = meta[ 'inventory_presser_color' ];
	const updateColorMetaValue = ( newValue ) => {
		setMeta( { ...meta, inventory_presser_color: newValue } );
	};

	//Interior Color
	const metaInteriorColorValue = meta[ 'inventory_presser_interior_color' ];
	const updateInteriorColorMetaValue = ( newValue ) => {
		setMeta( { ...meta, inventory_presser_interior_color: newValue } );
	};

	//Stock number
	const metaStockNumberValue = meta[ 'inventory_presser_stock_number' ];
	const updateStockNumberMetaValue = ( newValue ) => {
		setMeta( { ...meta, inventory_presser_stock_number: newValue } );
	};

	//VIN
	const metaVinValue = meta[ 'inventory_presser_vin' ];
	const updateVinMetaValue = ( newValue ) => {
		setMeta( { ...meta, inventory_presser_vin: newValue } );
	};	

	return (
		<div { ...blockProps }>
			<BlockControls></BlockControls>
			<TextControl
				label="Odometer"
				value={ metaOdometerValue }
				onChange={ updateOdometerMetaValue }
			/>
			<SelectControl
				label="Type"
				value={ typeTermID }
				options={ typeTerms.hasTerms 
					&& typeTerms.terms.map( term => ({ label: term.name, value: term.id }))}
				onChange={ updateTypeMetaValue( typeTerms ) }
			/>
			<SelectControl
				label="Body Style"
				value={ bodyStyleTermID }
				options={ bodyStyleTerms.hasTerms 
					&& bodyStyleTerms.terms.map( term => ({ label: term.name, value: term.id }))}
				onChange={ updateBodyStyleMetaValue( bodyStyleTerms ) }
			/>
			<TextControl
				label="Color"
				value={ metaColorValue }
				onChange={ updateColorMetaValue }
			/>
			<TextControl
				label="Interior Color"
				value={ metaInteriorColorValue }
				onChange={ updateInteriorColorMetaValue }
			/>
			<SelectControl
				label="Cylinders"
				value={ cylindersTermID }
				options={ cylindersTerms.hasTerms 
					&& cylindersTerms.terms.map( term => ({ label: term.name, value: term.id }))}
				onChange={ updateCylindersMetaValue( cylindersTerms ) }
			/>
			<SelectControl
				label="Fuel"
				value={ fuelTermID }
				options={ fuelTerms.hasTerms 
					&& fuelTerms.terms.map( term => ({ label: term.name, value: term.id }))}
				onChange={ updateFuelMetaValue( fuelTerms ) }
			/>
			<SelectControl
				label="Transmission"
				value={ transmissionTermID }
				options={ transmissionTerms.hasTerms 
					&& transmissionTerms.terms.map( term => ({ label: term.name, value: term.id }))}
				onChange={ updateTransmissionMetaValue( transmissionTerms ) }
			/>
			<SelectControl
				label="Drive Type"
				value={ driveTypeTermID }
				options={ driveTypeTerms.hasTerms
					&& driveTypeTerms.terms.map( term => ({ label: term.name, value: term.id }))}
				onChange={ updateDriveTypeMetaValue( driveTypeTerms ) }
			/>
			<TextControl
				label="Stock"
				value={ metaStockNumberValue }
				onChange={ updateStockNumberMetaValue }
			/>
			<TextControl
				label="VIN"
				value={ metaVinValue }
				onChange={ updateVinMetaValue }
			/>
		</div>
	);
}