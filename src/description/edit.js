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
	RichText
} from '@wordpress/block-editor';

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
export default function Edit() {

	const blockProps = useBlockProps();
	const postType = useSelect(
		( select ) => select( 'core/editor' ).getCurrentPostType(),
		[]
	);
	const [ meta, setMeta ] = useEntityProp( 'postType', postType, 'meta' );

	const metaDescription = meta[ 'inventory_presser_description' ];
	const updateDescriptionMetaValue = ( newValue ) => {
		setMeta( { ...meta, inventory_presser_description: newValue } );
	};	

	return (
		<>
			<BlockControls></BlockControls>
			<RichText 
				{ ...blockProps }
				tagName="p"
				onChange={ updateDescriptionMetaValue }
				allowedFormats={ [ 'core/bold', 'core/italic', 'core/link', 'core/text-color' ] }
				value={ metaDescription }
			></RichText>
		</>
	);
}