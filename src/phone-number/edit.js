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
	CheckboxControl,
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

	const updateFormat = ( newValue ) => {
		setAttributes( { format: newValue } )
	}

	const updateLocation = ( newValue ) => {
		setAttributes( { location: parseInt( newValue ) } )
	}

	const updatePhoneUids = ( newValue ) => {
		var uids = [];
		var phoneChecks = document.getElementsByName("phoneUids");
		if( phoneChecks )
		{
			for( var e=0; e<phoneChecks.length; e++ )
			{
				if( phoneChecks[e].checked )
				{
					uids.push( phoneChecks[e].value );
				}
			}
		}
		setAttributes( { phoneUids: uids } );
	}

	const phoneCheckboxes = [];
	locationTerms.hasTerms && locationTerms.terms.forEach(( term ) => {							
		if( term.id == attributes.location && 0 != term.id )
		{
			Object.keys(term.meta).forEach(( metaKey ) => {
				const phone_uid_regex = new RegExp('phone_[0-9]_uid');
				if( phone_uid_regex.test(metaKey) && '' != term.meta[metaKey])
				{
					var title = term.meta['phone_' + metaKey.replace( /[^0-9]+/g, '' ) + '_description'];
					phoneCheckboxes.push(<li><CheckboxControl
						label={ title }
						name={ "phoneUids" }
						value={ term.meta[metaKey] }
						checked={ attributes.phoneUids.indexOf( term.meta[metaKey] ) !== -1 }
						onChange={ updatePhoneUids }></CheckboxControl></li>);
				}
			});
		}
	});

	return (
		<>
			<BlockControls></BlockControls>
			<div { ...blockProps }>
			<Placeholder
				label={ __( 'Phone Number', 'inventory-presser' ) }
				instructions={ __( 'Displays a phone number from the locations taxonomy', 'inventory-presser' ) }
			>
				<SelectControl
					label={ __( 'Format', 'inventory-presser' ) }
					value={ attributes.format }
					options={
						[
							{ 
								"label": __( 'Please choose', 'inventory-presser' ),
								"value": '' 
							},
							{
								"label": __( 'Small, left label', 'inventory-presser' ),
								"value": 'small_left_label'
							},
							{
								"label": __( 'Large, no label', 'inventory-presser' ),
								"value": 'large_no_label'
							},
							{
								"label": __( 'Large tabled, left label', 'inventory-presser' ),
								"value": 'large_table_left'
							},
							{
								"label": __( 'Large, small left label', 'inventory-presser' ),
								"value": 'large_left_label'
							},
							{
								"label": __( 'Large, small right label', 'inventory-presser' ),
								"value": 'large_right_label'
							},
							{
								"label": __( 'Single line with labels', 'inventory-presser' ),
								"value": 'single_line_labels'
							},
							{
								"label": __( 'Single line no labels', 'inventory-presser' ),
								"value": 'single_line_no_labels'
							},
						]
					}
					onChange={ updateFormat }
				/>
				<SelectControl
					label={ __( 'Location', 'inventory-presser' ) }
					value={ attributes.location }
					options={ locationOptions }
					onChange={ updateLocation }
				/>
				<ul className={ "phoneUids" }>{ phoneCheckboxes }</ul>
			</Placeholder>
			</div>
		</>
	);
}