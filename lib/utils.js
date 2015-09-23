'use strict';

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.getAnimationText = getAnimationText;
exports.insertAnimation = insertAnimation;
exports.getKeyframesRuleIndex = getKeyframesRuleIndex;
exports.applyStyle = applyStyle;
exports.removeTransition = removeTransition;
exports.removeAnimation = removeAnimation;
exports.removeRule = removeRule;
exports.addListener = addListener;
exports.removeListener = removeListener;
exports.getNormalizedDefinition = getNormalizedDefinition;
exports.getTransition = getTransition;
exports.getArguments = getArguments;

var _vendorPrefix = require('vendor-prefix');

var _vendorPrefix2 = _interopRequireDefault(_vendorPrefix);

var _easingsJs = require('./easings.js');

var _easingsJs2 = _interopRequireDefault(_easingsJs);

var _CSSProperty = require('./CSSProperty');

var DOMStyle = document.createElement('style');
DOMStyle.type = 'text/css';
document.head.appendChild(DOMStyle);

function getAnimationText(name, keyframes) {
  var list = [];

  for (var step in keyframes) {
    var rules = keyframes[step];

    var style = [];
    for (var property in rules) {
      var CSSProperty = property.replace(/([A-Z])/g, '-$1').toLowerCase();
      var value = typeof rules[property] === 'number' ? rules[property] + 'px' : rules[property];
      style.push(CSSProperty + ':' + value + ';');
    }

    list.push(step + '{' + style.join('') + '}');
  }

  var cssRuleText = list.join('');
  var keyframesRule = _vendorPrefix2['default'].dash('animation').replace('animation', '') + 'keyframes';

  return '@' + keyframesRule + ' ' + name + ' {' + cssRuleText + '}';
}

function insertAnimation(animationName, animation) {
  var cssRuleIndex = DOMStyle.sheet.insertRule(getAnimationText(animationName, animation), DOMStyle.sheet.cssRules.length);
  return DOMStyle.sheet.rules[cssRuleIndex];
}

function getKeyframesRuleIndex(rule) {
  for (var i = 0; i < DOMStyle.sheet.cssRules.length; ++i) {
    if (DOMStyle.sheet.cssRules[i] === rule) {
      return i;
    }
  }

  return null;
}

function applyStyle(DOMNode, style) {
  for (var property in style) {
    DOMNode.style[property] = style[property];
  }
}

function removeTransition(DOMNode) {
  var properties = ['transition-delay', 'transition-duration', 'transition-property', 'transition-timing-function'];

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = _getIterator(properties), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var property = _step.value;

      DOMNode.style.removeProperty(_vendorPrefix2['default'].dash(property));
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator['return']) {
        _iterator['return']();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
}

function removeAnimation(DOMNode) {
  var properties = ['animation-name', 'animation-duration', 'animation-timing-function', 'animation-delay', 'animation-iteration-count', 'animation-direction', 'animation-fill-mode'];

  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = _getIterator(properties), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var property = _step2.value;

      DOMNode.style.removeProperty(_vendorPrefix2['default'].dash(property));
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2['return']) {
        _iterator2['return']();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }
}

function removeRule(cssRule) {
  DOMStyle.sheet.deleteRule(getKeyframesRuleIndex(cssRule));
}

function addListener(eventName, DOMNode, callback) {
  if (eventName === 'transition') {
    eventName = _CSSProperty.TRANSITIONEND_EVENT;
  } else {
    eventName = _CSSProperty.ANIMATIONEND_EVENT;
  }

  if (Array.isArray(eventName)) {
    eventName.forEach(function (eventName) {
      return DOMNode.addEventListener(eventName, callback, false);
    });
  } else {
    DOMNode.addEventListener(eventName, callback, false);
  }
}

function removeListener(eventName, DOMNode, callback) {
  if (eventName === 'transition') {
    eventName = _CSSProperty.TRANSITIONEND_EVENT;
  } else {
    eventName = _CSSProperty.ANIMATIONEND_EVENT;
  }

  if (Array.isArray(eventName)) {
    eventName.forEach(function (eventName) {
      return DOMNode.removeEventListener(eventName, callback);
    });
  } else {
    DOMNode.removeEventListener(eventName, callback);
  }
}

function getNormalizedDefinition(type, definition) {
  var newDefinition = {};

  for (var property in definition) {
    if (property === 'keyframes') {
      newDefinition.keyframes = {};

      for (var i in definition.keyframes) {
        var step = i === '0%' || i === 0 || i === '0' ? 'from' : i;
        step = step === '100%' ? 'to' : step;

        newDefinition.keyframes[step] = {};

        for (var ruleProperty in definition.keyframes[i]) {
          var value = definition.keyframes[i][ruleProperty];
          newDefinition.keyframes[step][_vendorPrefix2['default'].dash(ruleProperty)] = typeof value === 'number' && !_CSSProperty.isUnitlessNumber[ruleProperty] ? value + 'px' : value;
        }
      }
    } else {
      property = property.replace(/([A-Z])/g, '-$1').toLowerCase();
      var value = definition[property];

      if (property === 'ease' || property === 'timing-function') {
        property = 'timing-function';
        value = _easingsJs2['default'][value];
      } else if (property === 'duration' && typeof value === 'number') {
        value = value + 'ms';
      }

      newDefinition[_vendorPrefix2['default'].dash(type + '-' + property)] = value;
    }
  }

  return newDefinition;
}

function getTransition(definition) {
  var transition = { keyframes: { from: {}, to: {} } };
  var transitionableProps = [];

  for (var step in definition.keyframes) {
    for (var CSSProperty in definition.keyframes[step]) {
      transition.keyframes[step][CSSProperty] = definition.keyframes[step][CSSProperty];

      if (transitionableProps.indexOf(CSSProperty) === -1) {
        transitionableProps.push(CSSProperty);
      }
    }
  }

  // Each transition property should have a group per CSS property that is
  // transitionable. E.g: transition-duration: 1s, 1s;
  for (var property in definition) {
    if (property.indexOf('transition-') !== -1) {
      var properties = [];

      for (var i = 0; i < transitionableProps.length; i++) {
        properties[i] = definition[property];
      }

      transition[property] = properties.join(',');
    }
  }

  transition[_vendorPrefix2['default'].dash('transition-property')] = transitionableProps.join(',');

  return transition;
}

function getArguments(type, definition) {
  var onEnd = undefined;
  var overrides = {};

  // Build args.

  for (var _len = arguments.length, rest = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    rest[_key - 2] = arguments[_key];
  }

  if (rest.length === 1) {
    if (typeof rest[0] === 'function') {
      onEnd = rest[0];
    } else {
      overrides = rest[0];
    }
  } else {
    overrides = rest[0];
    onEnd = rest[1];
  }

  definition = getNormalizedDefinition(type, definition);
  overrides = getNormalizedDefinition(type, overrides);

  for (var i in overrides) {
    definition[i] = overrides[i];
  }

  return [definition, onEnd];
}