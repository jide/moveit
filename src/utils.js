'use strict';

import prefix from 'vendor-prefix';
import easings from './easings.js';

import { isUnitlessNumber, TRANSITIONEND_EVENT, ANIMATIONEND_EVENT } from './CSSProperty';

var DOMStyle = document.createElement('style');
DOMStyle.type = 'text/css';
document.head.appendChild(DOMStyle);

export function getAnimationText(name, keyframes) {
  let list = [];

  for (let step in keyframes) {
    let rules = keyframes[step];

    let style = [];
    for (let property in rules) {
      let CSSProperty = property.replace(/([A-Z])/g, '-$1').toLowerCase();
      let value = typeof rules[property] === 'number' ? rules[property] + 'px' : rules[property];
      style.push(`${CSSProperty}:${value};`);
    }

    list.push(`${step}{${style.join('')}}`);
  }

  let cssRuleText = list.join('');
  let keyframesRule = prefix.dash('animation').replace('animation', '') + 'keyframes';

  return `@${keyframesRule} ${name} {${cssRuleText}}`;
}

export function insertAnimation(animationName, animation) {
  let cssRuleIndex = DOMStyle.sheet.insertRule(getAnimationText(animationName, animation), DOMStyle.sheet.cssRules.length);
  return DOMStyle.sheet.rules[cssRuleIndex];
}

export function getKeyframesRuleIndex(rule) {
  for (var i = 0; i < DOMStyle.sheet.cssRules.length; ++i) {
    if (DOMStyle.sheet.cssRules[i] === rule) {
      return i;
    }
  }

  return null;
}

export function applyStyle(DOMNode, style) {
  for (let property in style) {
    DOMNode.style[property] = style[property];
  }
}

export function removeTransition(DOMNode) {
  let properties = ['transition-delay', 'transition-duration', 'transition-property', 'transition-timing-function'];

  for (let property of properties) {
    DOMNode.style.removeProperty(prefix.dash(property));
  }
}

export function removeAnimation(DOMNode) {
  let properties = ['animation-name', 'animation-duration', 'animation-timing-function', 'animation-delay', 'animation-iteration-count', 'animation-direction', 'animation-fill-mode'];

  for (let property of properties) {
    DOMNode.style.removeProperty(prefix.dash(property));
  }
}

export function removeRule(cssRule) {
  DOMStyle.sheet.deleteRule(getKeyframesRuleIndex(cssRule));
}

export function addListener(eventName, DOMNode, callback) {
  if (eventName === 'transition') {
    eventName = TRANSITIONEND_EVENT;
  }
  else {
    eventName = ANIMATIONEND_EVENT;
  }

  if (Array.isArray(eventName)) {
    eventName.forEach(eventName => DOMNode.addEventListener(eventName, callback, false));
  }
  else {
    DOMNode.addEventListener(eventName, callback, false);
  }
}

export function removeListener(eventName, DOMNode, callback) {
  if (eventName === 'transition') {
    eventName = TRANSITIONEND_EVENT;
  }
  else {
    eventName = ANIMATIONEND_EVENT;
  }

  if (Array.isArray(eventName)) {
    eventName.forEach(eventName => DOMNode.removeEventListener(eventName, callback));
  }
  else {
    DOMNode.removeEventListener(eventName, callback);
  }
}

export function getNormalizedDefinition(type, definition) {
  let newDefinition = {};

  for (let property in definition) {
    if (property === 'keyframes') {
      newDefinition.keyframes = {};

      for (let i in definition.keyframes) {
        let step = i === '0%' || i === 0 || i === '0' ? 'from' : i;
        step = step === '100%' ? 'to' : step;

        newDefinition.keyframes[step] = {};

        for (let ruleProperty in definition.keyframes[i]) {
          let value = definition.keyframes[i][ruleProperty];
          newDefinition.keyframes[step][prefix.dash(ruleProperty)] = typeof value === 'number' && !isUnitlessNumber[ruleProperty] ? value + 'px' : value;
        }
      }
    }
    else {
      property = property.replace(/([A-Z])/g, '-$1').toLowerCase();
      let value = definition[property];

      if (property === 'ease' || property === 'timing-function') {
        property = 'timing-function';
        value = easings[value];
      }
      else if (property === 'duration' && typeof value === 'number') {
        value = `${value}ms`;
      }

      newDefinition[prefix.dash(type + '-' + property)] = value;
    }
  }

  return newDefinition;
}

export function getTransition(definition) {
  let transition = { keyframes: { from: {}, to: {} } };
  let transitionableProps = [];

  for (let step in definition.keyframes) {
    for (let CSSProperty in definition.keyframes[step]) {
      transition.keyframes[step][CSSProperty] = definition.keyframes[step][CSSProperty];

      if (transitionableProps.indexOf(CSSProperty) === -1) {
        transitionableProps.push(CSSProperty);
      }
    }
  }

  // Each transition property should have a group per CSS property that is
  // transitionable. E.g: transition-duration: 1s, 1s;
  for (let property in definition) {
    if (property.indexOf('transition-') !== -1) {
      let properties = [];

      for (let i = 0; i < transitionableProps.length; i++) {
        properties[i] = definition[property];
      }

      transition[property] = properties.join(',');
    }
  }

  transition[prefix.dash('transition-property')] = transitionableProps.join(',');

  return transition;
}

export function getArguments(type, definition, ...rest) {
  let onEnd;
  let overrides = {};

  // Build args.
  if (rest.length === 1) {
    if (typeof rest[0] === 'function') {
      onEnd = rest[0];
    }
    else {
      overrides = rest[0];
    }
  }
  else {
    overrides = rest[0];
    onEnd = rest[1];
  }

  definition = getNormalizedDefinition(type, definition);
  overrides = getNormalizedDefinition(type, overrides);

  for (let i in overrides) {
    definition[i] = overrides[i];
  }

  return [definition, onEnd];
}
