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
	CheckboxControl,
	TextControl
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

	const updateSrc = ( newValue ) => {
		setAttributes( { src: newValue } )
	}

	const updateClass = ( newValue ) => {
		setAttributes( { class: newValue } )
	}

	const updateScrolling = ( newValue ) => {
		setAttributes( { scrolling: newValue } )
	}

	const updateHeight = ( newValue ) => {
		setAttributes( { height: newValue } )
	}

	const updateWidth = ( newValue ) => {
		setAttributes( { width: newValue } )
	}


	return (
		<>
			<BlockControls></BlockControls>
			<div { ...blockProps }>
			<Placeholder
				label={ __( 'Iframe', 'inventory-presser' ) }
				instructions={ __( 'Creates a responsive iframe.', 'inventory-presser' ) }
			>
				<p>
					<TextControl
						label={ __( 'URL', 'inventory-presser' ) }
						value={ attributes.src }
						onChange={ updateSrc }
					/>
				</p>
				<p>
					<CheckboxControl
						label={ __( 'Allow Scrolling', 'inventory-presser' ) }
						value={ attributes.scrolling }
						onChange={ updateScrolling }
					/>
				</p>
				<p>
					<TextControl
						label={ __( 'Height', 'inventory-presser' ) }
						value={ attributes.height }
						onChange={ updateHeight }
					/>
				</p>
				<p>
					<TextControl
						label={ __( 'Width', 'inventory-presser' ) }
						value={ attributes.width }
						onChange={ updateWidth }
					/>
				</p>
			</Placeholder>
			</div>
		</>
	);
}