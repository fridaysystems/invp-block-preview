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
	TextControl
} from '@wordpress/components';

//Needed to access post meta
import { useSelect, withSelect } from '@wordpress/data';
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
export default function Edit() {

	const blockProps = useBlockProps();
	const postType = useSelect(
		( select ) => select( 'core/editor' ).getCurrentPostType(),
		[]
	);
	const [ meta, setMeta ] = useEntityProp( 'postType', postType, 'meta' );

	const reportUrl = '' == meta[ 'inventory_presser_carfax_url_report' ] ? 'http://www.carfax.com/VehicleHistory/p/Report.cfx?vin=' + meta[ 'inventory_presser_vin' ] : meta[ 'inventory_presser_carfax_url_report' ];

	function SiteUrl() {
		const site = useSelect( ( select ) => {
			return select( 'core' ).getSite();
		}, [] );
	 
		if ( ! site ) {
			return null;
		}
	 
		return site.url;
	}

	const metaCarfaxUrlIcon = meta[ 'inventory_presser_carfax_url_icon' ];
	const updateCarfaxUrlIconMetaValue = ( newValue ) => {
		setMeta( { ...meta, inventory_presser_carfax_url_icon: newValue } );
	};

	const svgUrlLocal = SiteUrl()
		+ '/wp-content/plugins/inventory-presser/images/show-me-carfax'
		+ ( '1' == meta[ 'inventory_presser_carfax_one_owner' ] ? '-1-owner' : '' )
		+ '.svg';
	const svgUrl = '' == metaCarfaxUrlIcon ? svgUrlLocal : metaCarfaxUrlIcon;

	if( invp_blocks.use_carfax_provided_buttons && '' == metaCarfaxUrlIcon )
	{
		//We got a problem, show a text box to let the user provide an icon URL
		return ( 		
			<>
				<BlockControls></BlockControls>
				<Placeholder
					{ ...blockProps }
					label="Carfax Button"
					instructions="No button URL saved for this vehicle. The site is configured to use Carfax-provided buttons at Vehicles → Options."
				>
					<TextControl						
						label="Carfax Button URL"
						tagName="p"
						onChange={ updateCarfaxUrlIconMetaValue }
						value={ metaCarfaxUrlIcon }
					></TextControl>
				</Placeholder>

			</> 
		);
	}

	return (
		<>
			<BlockControls></BlockControls>
			<div 
				className="carfax-wrapper" 
				{ ...blockProps }
			>
				<a 
					href={ reportUrl }
					target="_blank"
					rel="noopener noreferrer"
				>
					<img  src={ svgUrl } alt="SHOW ME THE CARFAX" />
				</a>
			</div>
		</>
	);
}