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
	BlockControls,
	useBlockProps,
	InspectorControls,
} from '@wordpress/block-editor';

import {
	CheckboxControl,
	PanelBody,
	PanelRow,
	Placeholder
} from '@wordpress/components';

import { withSelect } from '@wordpress/data';

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

	const toggleRenderInEditor = () => {
		setAttributes( { renderInEditor: ! attributes.renderInEditor } )
	}

	const toggleStartSlideshow = () => {
		setAttributes( { startSlideshow: ! attributes.startSlideshow } )
	}

	const toggleShowThumbnails = () => {
		setAttributes( { showThumbnails: ! attributes.showThumbnails } )
	}
	
	const postId = wp.data.select( 'core/editor' ).getCurrentPostId();

	//Get all this posts' attachments
	const ImageListControl = 

		withSelect( function( select, props ) {
			return {
				posts: select( 'core' ).getEntityRecords( 'postType', 'attachment', {
					'per_page': 100,
					'parent': postId,
					'mime_type': 'image',
					'status': 'inherit',
					'orderby': 'id',
					'order': 'asc'
				} )
			}
		} ) ( function( props ) {

			if( ! attributes.renderInEditor )
			{
				return <>
					<BlockControls></BlockControls>
					<div { ...blockProps }>
						<Placeholder
							label={ __( 'Photo Slider', 'inventory-presser' ) }
							instructions={ __( 'View this vehicle to see the slider, or check Render in Editor in this block\'s settings.', 'inventory-presser' ) }
						></Placeholder>
					</div>
				</>;
			}

			// if posts found
			if( props.posts ) {

				function getListItems( size )
				{
					return props.posts.map((post) => {

						//large size might not exist, saw this immediately when testing
						const imageUrl = typeof post.media_details.sizes.large !== 'undefined' ? post.media_details.sizes.large.source_url : post.media_details.sizes.full.source_url;
	
						//need to get URL to this attachments upload folder
						const urlPath = post.guid.raw.replace( post.media_details.file, '' );
	
						let srcsets = [];
						const imageSizeKeys = Object.keys(post.media_details.sizes);
						imageSizeKeys.forEach((key, index) => {
							srcsets.push( `${urlPath}${post.media_details.sizes[key].file} ${post.media_details.sizes[key].width}w` );
						});
	
						//where does 720px in sizes come from?
						//image_constrain_size_for_editor( 1024, 682, 'large' )
						//global $content_width;
	
						const imageElement = <img
							src={ imageUrl }
							className={ ( 'thumb' == size ? 'attachment-thumb size-thumb' : 'attachment-large size-large' ) + 'invp-image' }
							loading={ `lazy` }
							draggable={ `false` }
							srcset={ srcsets.join( ', ' ) }
							sizes={ 'thumb' == size ? `(max-width: 200px) 100vw, 200px` :  `(max-width: 720px) 100vw, 720px` }
						></img>;
						
						return <li><a href={ imageUrl }>{ imageElement }</a></li>;
					});
				}

				const listItems = getListItems( 'large' );
				const thumbsListItems = getListItems( 'thumb' );

				const photosList = <div class="slider invp-flexslider"><ul class="slides">{listItems}</ul></div>;
				const thumbsList = attributes.showThumbnails ? <div class="invp-flexslider-thumbs invp-flexslider no-preview"><ul class="slides">{thumbsListItems}</ul></div> : null;

				document.dispatchEvent( renderEvent );

				return <div class="vehicle-images wp-block">
						<div class="slider-width"></div>
						{ photosList }{ thumbsList }
					</div>;

			}

			return <>
					<h2 class="wp-block">{ __( 'Photo Slider', 'inventory-presser' ) }</h2><p class="wp-block">{ __( 'Loading photos...', 'inventory-presser' ) }</p>
					</>;
		}	
	);

	const renderEvent = new Event( 'invpFlexsliderBlockLoaded' );

	return (
		<div { ...blockProps }>
			<InspectorControls>
				<PanelBody 
					title={ __( 'Settings', 'invp-photo-slider' )}
					initialOpen={true}
				>
					<PanelRow>
						<fieldset>
						<CheckboxControl
							label={ __( 'Render in Editor', 'invp-photo-slider' )}
							help={ __( 'Display and start the slider in the block editor?', 'invp-photo-slider' )}
							checked={ attributes.renderInEditor }
							onChange={ toggleRenderInEditor }
						/>
						<CheckboxControl
							label={ __( 'Automatically Cycle Slides', 'invp-photo-slider' )}
							help={ __( 'Start rotating photos in the carousel after page load?', 'invp-photo-slider' )}
							checked={ attributes.startSlideshow }
							onChange={ toggleStartSlideshow }
						/>
						<CheckboxControl
							label={ __( 'Show Thumbnails', 'invp-photo-slider' )}
							help={ __( 'Show a separate carousel of thumbnails below the full-size carousel?', 'invp-photo-slider' )}
							checked={ attributes.showThumbnails }
							onChange={ toggleShowThumbnails }
						/>
						</fieldset>
					</PanelRow>
				</PanelBody>
			</InspectorControls>
			<BlockControls></BlockControls>
			<ImageListControl></ImageListControl>
		</div>
	);
}