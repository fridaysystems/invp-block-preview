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
	Placeholder,
	SelectControl,
} from '@wordpress/components';

import { useSelect } from '@wordpress/data';

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

	const locationTerms = getTerms( 'location' );
	const locationOptions = [];
	if( locationTerms.hasTerms )
	{
		locationOptions.push({ label: __( 'Please choose', 'inventory-presser' ), value: 0 });
		locationTerms.terms.forEach(( term ) => {
			locationOptions.push(({ label: term.name, value: term.id }));
		});
	}

	const updateLocation = ( newValue ) => {
		setAttributes( { location: parseInt( newValue ) } )
	}

	const updateHoursUid = ( newValue ) => {
		setAttributes( { hoursUid: newValue } );
	}

	const hoursOptions = [];
	locationTerms.hasTerms && locationTerms.terms.forEach(( term ) => {							
		if( term.id == attributes.location && 0 != term.id )
		{
			Object.keys(term.meta).forEach(( metaKey ) => {
				const hours_uid_regex = new RegExp('hours_[0-9]_uid');
				if( hours_uid_regex.test(metaKey) && '' != term.meta[metaKey])
				{
					var title = term.meta['hours_' + metaKey.replace( /[^0-9]+/g, '' ) + '_title'];
					hoursOptions.push(({ label: title, value: term.meta[metaKey] }));
				}
			});
		}
	});

	return (
		<>
			<BlockControls></BlockControls>
			<div { ...blockProps }>
			<Placeholder
				label={ __( 'Hours Today', 'inventory-presser' ) }
				instructions={ __( 'A sentence describing the car lot\'s hours today or the next day it is open.', 'inventory-presser' ) }
			>
				<SelectControl
					label={ __( 'Location', 'inventory-presser' ) }
					value={ attributes.location }
					options={ locationOptions }
					onChange={ updateLocation }
				/>
				<SelectControl
					label={ __( 'Hours', 'inventory-presser' ) }
					value={ attributes.hoursUid }
					options={ hoursOptions }
					onChange={ updateHoursUid }
				/>
			</Placeholder>
			</div>
		</>
	);
}