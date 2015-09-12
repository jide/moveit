'use strict';

var _slicedToArray = require('babel-runtime/helpers/sliced-to-array')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.transition = transition;
exports.animation = animation;

var _utils = require('./utils');

var _Transition = require('./Transition');

var _Transition2 = _interopRequireDefault(_Transition);

var _Animation = require('./Animation');

var _Animation2 = _interopRequireDefault(_Animation);

function init(type, DOMNode) {
  if (typeof DOMNode === 'undefined' || DOMNode === null) {
    return null;
  }

  for (var _len = arguments.length, rest = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    rest[_key - 2] = arguments[_key];
  }

  var _getArguments = _utils.getArguments.apply(undefined, [type].concat(rest));

  var _getArguments2 = _slicedToArray(_getArguments, 2);

  var definition = _getArguments2[0];
  var onEnd = _getArguments2[1];

  var instance = type === 'transition' ? new _Transition2['default'](DOMNode, definition) : new _Animation2['default'](DOMNode, definition);

  instance.start(onEnd);

  return instance;
}

function transition(DOMNode) {
  for (var _len2 = arguments.length, rest = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    rest[_key2 - 1] = arguments[_key2];
  }

  return init.apply(undefined, ['transition', DOMNode].concat(rest));
}

function animation(DOMNode) {
  for (var _len3 = arguments.length, rest = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    rest[_key3 - 1] = arguments[_key3];
  }

  return init.apply(undefined, ['animation', DOMNode].concat(rest));
}