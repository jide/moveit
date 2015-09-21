// Borrowed from https://github.com/angular/angular.js/blob/0fc58516f4e92a46f6d445421c1f04ff9729c549/src/ngAnimate/animateCss.js
'use strict';

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
var TRANSITIONEND_EVENT;
var ANIMATIONEND_EVENT;

if (window.ontransitionend === undefined && window.onwebkittransitionend !== undefined) {
  exports.TRANSITIONEND_EVENT = TRANSITIONEND_EVENT = ['webkitTransitionEnd', 'transitionend'];
} else {
  exports.TRANSITIONEND_EVENT = TRANSITIONEND_EVENT = 'transitionend';
}

if (window.onanimationend === undefined && window.onwebkitanimationend !== undefined) {
  exports.ANIMATIONEND_EVENT = ANIMATIONEND_EVENT = ['webkitAnimationEnd', 'animationend'];
} else {
  exports.ANIMATIONEND_EVENT = ANIMATIONEND_EVENT = 'animationend';
}

// Borrowed from React.
var isUnitlessNumber = {
  animationIterationCount: true,
  boxFlex: true,
  boxFlexGroup: true,
  boxOrdinalGroup: true,
  columnCount: true,
  flex: true,
  flexGrow: true,
  flexPositive: true,
  flexShrink: true,
  flexNegative: true,
  flexOrder: true,
  fontWeight: true,
  lineClamp: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  tabSize: true,
  widows: true,
  zIndex: true,
  zoom: true,

  // SVG-related properties
  fillOpacity: true,
  stopOpacity: true,
  strokeDashoffset: true,
  strokeOpacity: true,
  strokeWidth: true
};

function prefixKey(prefix, key) {
  return prefix + key.charAt(0).toUpperCase() + key.substring(1);
}

var prefixes = ['Webkit', 'ms', 'Moz', 'O'];

_Object$keys(isUnitlessNumber).forEach(function (prop) {
  prefixes.forEach(function (prefix) {
    isUnitlessNumber[prefixKey(prefix, prop)] = isUnitlessNumber[prop];
  });
});

exports.isUnitlessNumber = isUnitlessNumber;
exports.TRANSITIONEND_EVENT = TRANSITIONEND_EVENT;
exports.ANIMATIONEND_EVENT = ANIMATIONEND_EVENT;