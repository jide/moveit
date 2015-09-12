'use strict';

import prefix from 'vendor-prefix';
import { applyStyle, insertAnimation, removeRule, removeAnimation, addListener, removeListener } from './utils';

var uniqueID = 0;

export default class Animation {

  constructor(DOMNode, definition) {
    this.type = 'animation';
    this.DOMNode = DOMNode;
    this.definition = definition;
  }

  start(onEnd) {
    uniqueID++;

    let animationName = `animator_${uniqueID}`;
    let cssRule = insertAnimation(animationName, this.definition.keyframes);

    let callback = (event) => {
      if (!event || event.target === this.DOMNode) {
        removeListener(this.type, this.DOMNode, callback);
        removeAnimation(this.DOMNode);
        removeRule(cssRule);

        if (typeof onEnd === 'function') {
          onEnd();
        }
      }
    };

    let style = {};

    style[prefix.dash('animation-name')] = animationName;

    for (let property in this.definition) {
      if (property.indexOf('animation-') !== -1) {
        style[property] = this.definition[property];
      }
    }

    applyStyle(this.DOMNode, style);

    if (this.definition.duration === '0ms') {
      callback();
      return;
    }
    else {
      addListener(this.type, this.DOMNode, callback);
    }
  }

}
