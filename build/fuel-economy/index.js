/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/fuel-economy/edit.js":
/*!**********************************!*\
  !*** ./src/fuel-economy/edit.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Edit; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/core-data */ "@wordpress/core-data");
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./editor.scss */ "./src/fuel-economy/editor.scss");



/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */

 // import {
// 	Placeholder,
// 	TextControl
// } from '@wordpress/components';
//Needed to access post meta




/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */


/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */

function Edit(_ref) {
  let {
    attributes,
    setAttributes
  } = _ref;
  const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.useBlockProps)();
  const postType = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.useSelect)(select => select('core/editor').getCurrentPostType(), []);
  const [meta, setMeta] = (0,_wordpress_core_data__WEBPACK_IMPORTED_MODULE_5__.useEntityProp)('postType', postType, 'meta');

  function SiteUrl() {
    const site = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.useSelect)(select => {
      return select('core').getSite();
    }, []);

    if (!site) {
      return null;
    }

    return site.url;
  }

  const toggleIncludeAnnualStats = () => {
    setAttributes({
      includeAnnualStats: !attributes.includeAnnualStats
    });
  };

  const metaFuel1Name = meta[invp_blocks.meta_prefix + 'fuel_economy_1_name'];

  const updateFuel1NameMetaValue = newValue => {
    setMeta({ ...meta,
      [invp_blocks.meta_prefix + 'fuel_economy_1_name']: newValue
    });
  };

  const metaFuel1Combined = meta[invp_blocks.meta_prefix + 'fuel_economy_1_combined'];

  const updateFuel1CombinedMetaValue = newValue => {
    setMeta({ ...meta,
      [invp_blocks.meta_prefix + 'fuel_economy_1_combined']: newValue
    });
  };

  const metaFuel1City = meta[invp_blocks.meta_prefix + 'fuel_economy_1_city'];

  const updateFuel1CityMetaValue = newValue => {
    setMeta({ ...meta,
      [invp_blocks.meta_prefix + 'fuel_economy_1_city']: newValue
    });
  };

  const metaFuel1Highway = meta[invp_blocks.meta_prefix + 'fuel_economy_1_highway'];

  const updateFuel1HighwayMetaValue = newValue => {
    setMeta({ ...meta,
      [invp_blocks.meta_prefix + 'fuel_economy_1_highway']: newValue
    });
  }; //There could be two fuel types


  const fuelTypes = {
    count: 0
  };

  if ('' != meta[invp_blocks.meta_prefix + 'fuel_economy_1_city']) {
    fuelTypes.count++;
  }

  if ('' != meta[invp_blocks.meta_prefix + 'fuel_economy_2_city']) {
    fuelTypes.count++;
  }

  if (0 == fuelTypes.count) {
    //We got a problem, show text boxes to let the user provide values
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.BlockControls, null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.Placeholder, (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, blockProps, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Fuel Economy', 'inventory-presser'),
      instructions: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('No miles per gallon data saved for this vehicle.', 'inventory-presser')
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.TextControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Combined MPG', 'inventory-presser'),
      tagName: "p",
      onChange: updateFuel1CombinedMetaValue,
      value: metaFuel1Combined
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.TextControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Highway MPG', 'inventory-presser'),
      tagName: "p",
      onChange: updateFuel1HighwayMetaValue,
      value: metaFuel1Highway
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.TextControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('City MPG', 'inventory-presser'),
      tagName: "p",
      onChange: updateFuel1CityMetaValue,
      value: metaFuel1City
    })));
  }

  const controls = [(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    class: "fuel-name"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Fuel 1 Name', 'inventory-presser'),
    tagName: "p",
    onChange: updateFuel1NameMetaValue,
    value: metaFuel1Name,
    hideLabelFromVision: "true"
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    class: "fuel-economy-fuel"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    class: "fuel-economy-combined"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
    class: "number"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Combined MPG', 'inventory-presser'),
    tagName: "p",
    onChange: updateFuel1CombinedMetaValue,
    value: metaFuel1Combined,
    hideLabelFromVision: "true"
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    class: "fuel-economy-combined-label"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('combined', 'inventory-presser')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    class: "mpg"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('MPG', 'inventory-presser'), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("svg", {
    class: "fuel-pump",
    xmlns: "http://www.w3.org/2000/svg",
    width: "792",
    height: "720",
    viewBox: "0 0 792 720"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("path", {
    class: "fuel-pump-img",
    d: "M598.1 406c0 74.3-0.1 160.3-0.1 234.6 0 7.3 0.1 14.9 0 22.2 -0.2 29.6-1 29.6-31.6 29.6 -96.7 0.1-193.4 0-290.1-0.1 -19.1 0-38.3-0.1-58.3 0 -23.7 0.1-24.7-0.9-24.7-29.4 0.3-186.6-0.3-373.3-0.3-560 0-47.1 28.1-74.7 76.8-75 79.1-0.5 158.2-0.5 237.3-0.1 15.2 0.1 30.9 1.9 45.6 5.6 26 6.7 45.6 29.1 45.1 54.9 -0.1 3 0.3 26.1 0.3 26.1s10.2 11.7 25.5 24.5c23.7 20.1 44.9 42.9 67.7 64.1 21.8 20.2 31.2 45 31.5 73.3 0.3 35.7 2 71.4-0.5 106.9 -2.6 36.4 8 76.7 28.7 105.9 21.8 30.8 38.2 76.5 25.4 124.7 -15.5 44.3-40.7 63.6-91.2 60.2 -35.5-2.4-63-30.7-63.6-67.8 -0.7-46.1 0.3-92.3-0.1-138.4 -0.1-13.5 0-32.6-0.7-46.1C619.9 403.3 608.9 406 598.1 406zM285.7 73.3c-33.7-0.1-49.4 13.7-49.4 46 0 42.7 0.1 85.6 0.1 128.7 0 27.3 10 40.2 37.5 41.2 79.8 2.7 164.7 4 244.6 3 24.6-0.3 38.9-18.4 38.9-42.2 0.1-44-0.1-90-0.1-131.8 0-32.9-12.6-43-46.4-43.9C474.7 73.1 322.9 73.4 285.7 73.3zM598.5 378.7c53.8 0 51.5 20.6 52.1 67.6 0.6 50.3 1.1 100.5 1.3 150.8 0.2 43.6 26 49.5 46.3 48.4 27.1-1.5 47-22.7 49.1-49.7 2.2-27.9-1.6-54.6-16.8-78.5 -29-45.7-44.7-93.7-38.6-148.8 1.2-10.7-9-25.1-16.5-32.5 -55.2-53.9-45.9-58-46.4-111.9 0-4.1-0.8-41.9-0.8-41.9l-29.6-26.9C598.5 155.5 598.5 312.3 598.5 378.7z"
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    class: "fuel-economy-city"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
    class: "number"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('City MPG', 'inventory-presser'),
    tagName: "p",
    onChange: updateFuel1CityMetaValue,
    value: metaFuel1City,
    hideLabelFromVision: "true"
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    class: "fuel-economy-city-label"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('city', 'inventory-presser')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    class: "fuel-economy-highway"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
    class: "number"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Highway MPG', 'inventory-presser'),
    tagName: "p",
    onChange: updateFuel1HighwayMetaValue,
    value: metaFuel1Highway,
    hideLabelFromVision: "true"
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    class: "fuel-economy-highway-label"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('highway', 'inventory-presser'))))];

  if (attributes.includeAnnualStats) {
    const metaFuel1FiveYearSavings = meta[invp_blocks.meta_prefix + 'fuel_economy_1_five_year_savings'];

    const updateMetaFuel1FiveYearSavings = newValue => {
      setMeta({ ...meta,
        [invp_blocks.meta_prefix + 'fuel_economy_1_five_year_savings']: newValue
      });
    };

    const metaFuel1AnnualConsumption = meta[invp_blocks.meta_prefix + 'fuel_economy_1_annual_consumption'];

    const updateMetaFuel1AnnualConsumption = newValue => {
      setMeta({ ...meta,
        [invp_blocks.meta_prefix + 'fuel_economy_1_annual_consumption']: newValue
      });
    };

    const metaFuel1AnnualCost = meta[invp_blocks.meta_prefix + 'fuel_economy_1_annual_cost'];

    const updateMetaFuel1AnnualCost = newValue => {
      setMeta({ ...meta,
        [invp_blocks.meta_prefix + 'fuel_economy_1_annual_cost']: newValue
      });
    };

    const metaFuel1AnnualEmissions = meta[invp_blocks.meta_prefix + 'fuel_economy_1_annual_emissions'];

    const updateMetaFuel1AnnualEmissions = newValue => {
      setMeta({ ...meta,
        [invp_blocks.meta_prefix + 'fuel_economy_1_annual_emissions']: newValue
      });
    };

    controls.push((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("dl", {
      class: "fuel-economy-annual-stats"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("dt", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Five year savings compared to average vehicle', 'inventory-presser')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("dd", null, `$`, " ", (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.TextControl, {
      value: metaFuel1FiveYearSavings,
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Five year savings compared to average vehicle', 'inventory-presser'),
      hideLabelFromVision: "true",
      onChange: updateMetaFuel1FiveYearSavings
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("dt", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Annual fuel consumption', 'inventory-presser')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("dd", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.TextControl, {
      value: metaFuel1AnnualConsumption,
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Annual fuel consumption', 'inventory-presser'),
      hideLabelFromVision: "true",
      onChange: updateMetaFuel1AnnualConsumption
    }), " ", (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('barrels', 'inventory-presser')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("dt", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Annual fuel cost', 'inventory-presser')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("dd", null, `$`, " ", (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.TextControl, {
      value: metaFuel1AnnualCost,
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Annual fuel cost', 'inventory-presser'),
      hideLabelFromVision: "true",
      onChange: updateMetaFuel1AnnualCost
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("dt", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Annual tailpipe CO2 emissions', 'inventory-presser')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("dd", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.TextControl, {
      value: metaFuel1AnnualEmissions,
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Annual tailpipe CO2 emissions', 'inventory-presser'),
      hideLabelFromVision: "true",
      onChange: updateMetaFuel1AnnualEmissions
    }), " ", (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('grams per mile', 'inventory-presser'))));
  }

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.BlockControls, null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Settings', 'inventory-presser'),
    initialOpen: true
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("fieldset", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.CheckboxControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Show Annual Stats', 'inventory-presser'),
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Include annual consumption, cost, and emissions?', 'inventory-presser'),
    checked: attributes.includeAnnualStats,
    onChange: toggleIncludeAnnualStats
  }))))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", blockProps, controls));
}

/***/ }),

/***/ "./src/fuel-economy/index.js":
/*!***********************************!*\
  !*** ./src/fuel-economy/index.js ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.scss */ "./src/fuel-economy/style.scss");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./edit */ "./src/fuel-economy/edit.js");
/* harmony import */ var _save__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./save */ "./src/fuel-economy/save.js");
/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */


/**
 * Internal dependencies
 */



/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */

(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)('inventory-presser/invp-fuel-economy', {
  /**
   * @see ./edit.js
   */
  edit: _edit__WEBPACK_IMPORTED_MODULE_2__["default"],

  /**
   * @see ./save.js
   */
  save: _save__WEBPACK_IMPORTED_MODULE_3__["default"]
});

/***/ }),

/***/ "./src/fuel-economy/save.js":
/*!**********************************!*\
  !*** ./src/fuel-economy/save.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ save; }
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */


/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */

function save() {
  return null;
}

/***/ }),

/***/ "./src/fuel-economy/editor.scss":
/*!**************************************!*\
  !*** ./src/fuel-economy/editor.scss ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/fuel-economy/style.scss":
/*!*************************************!*\
  !*** ./src/fuel-economy/style.scss ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ (function(module) {

module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ (function(module) {

module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ (function(module) {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/core-data":
/*!**********************************!*\
  !*** external ["wp","coreData"] ***!
  \**********************************/
/***/ (function(module) {

module.exports = window["wp"]["coreData"];

/***/ }),

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/***/ (function(module) {

module.exports = window["wp"]["data"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ (function(module) {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ (function(module) {

module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/extends.js":
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/extends.js ***!
  \************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _extends; }
/* harmony export */ });
function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	!function() {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = function(result, chunkIds, fn, priority) {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var chunkIds = deferred[i][0];
/******/ 				var fn = deferred[i][1];
/******/ 				var priority = deferred[i][2];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every(function(key) { return __webpack_require__.O[key](chunkIds[j]); })) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	!function() {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"fuel-economy/index": 0,
/******/ 			"fuel-economy/style-index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = function(chunkId) { return installedChunks[chunkId] === 0; };
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = function(parentChunkLoadingFunction, data) {
/******/ 			var chunkIds = data[0];
/******/ 			var moreModules = data[1];
/******/ 			var runtime = data[2];
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some(function(id) { return installedChunks[id] !== 0; })) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkinvp_block_boilerplate"] = self["webpackChunkinvp_block_boilerplate"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["fuel-economy/style-index"], function() { return __webpack_require__("./src/fuel-economy/index.js"); })
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map