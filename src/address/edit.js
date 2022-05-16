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
	InspectorControls
} from '@wordpress/block-editor';

import {
	CheckboxControl,
	PanelBody,
	PanelRow,
	Placeholder,
	SelectControl
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

//https://stackoverflow.com/a/2919363/338432
function nl2br (str, is_xhtml) {   
    var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';    
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1'+ breakTag +'$2');
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

	const updateSingleLine = ( newValue ) => {
		setAttributes( { singleLine: newValue } )
	}

	const updateLocations = ( newValue ) => {
		var location_ids = [];
		var checks = document.getElementsByName("locations");
		if( checks )
		{
			for( var e=0; e<checks.length; e++ )
			{
				if( checks[e].checked )
				{
					location_ids.push( parseInt( checks[e].value ) );
				}
			}
		}
		console.log( location_ids );
		setAttributes( { locations: location_ids } );
	}

	const checkboxes = [];
	const controls = [];
	locationTerms.hasTerms && locationTerms.terms.forEach(( term ) => {
		checkboxes.push(<li><CheckboxControl
			label={ term.name }
			name={ "locations" }
			value={ term.id }
			checked={ attributes.locations.indexOf( term.id ) !== -1 }
			onChange={ updateLocations }></CheckboxControl></li>);

		if( attributes.locations.length )
		{
			if( -1 === attributes.locations.indexOf( term.id ) )
			{
				return;
			}
			if( attributes.singleLine )
			{
				//\n is not equivalent to PHP_EOL
				controls.push( <span>{ term.description.replace( '\n', ', ' ) } </span> );
			}
			else
			{
				controls.push( <div dangerouslySetInnerHTML={{__html: nl2br( term.description ) }}></div> );
			}
		}
	});
	
	if( 0 == attributes.locations.length )
	{
		//This placeholder should say
		//Choose an address in the block settings panel.
		//or if there are none, shows the same controls as the Add Term page
		//name, street1, street2, city, state, zip at least & saves terms
		controls.push( [
			<Placeholder
				label={ __( 'Address', 'inventory-presser' ) }
				instructions={ __( 'Displays addresses from the locations taxonomy. Choose an address in the block settings panel.', 'inventory-presser' ) }
			>
			</Placeholder>
		] );
	}

	return (
		<>
			<BlockControls></BlockControls>
			<InspectorControls>
				<PanelBody 
					title={ __( 'Settings', 'inventory-presser' )}
					initialOpen={true}
				>
					<PanelRow>
						<fieldset>
							<h3>{ __( 'Addresses to Show', 'inventory-presser' ) }</h3>
							<ul className={ "locations" }>{ checkboxes }</ul>
						</fieldset>
					</PanelRow>
					<PanelRow>
						<fieldset>
							<h3>{ __( 'Other Settings', 'inventory-presser' ) }</h3>
							<CheckboxControl
								label={ __( 'Display on Single Line', 'inventory-presser' ) }
								help={ __( 'Turn on for an inline <span>. Default behavior is a <div> containing line breaks.', 'inventory-presser' ) }
								checked={ attributes.singleLine }
								onChange={ updateSingleLine }
							/>
						</fieldset>
					</PanelRow>
				</PanelBody>
			</InspectorControls>
			<div { ...blockProps }>
				{ controls }
			</div>
		</>
	);
}