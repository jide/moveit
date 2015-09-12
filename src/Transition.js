'use strict';

import { getTransition, applyStyle, removeTransition, addListener, removeListener } from './utils';

export default class Transition {

  constructor(DOMNode, definition) {
    this.type = 'transition';
    this.DOMNode = DOMNode;
    this.definition = definition;
    this.transition = getTransition(definition);
  }

  start(onEnd) {
    if (this.transition.keyframes.from) {
      applyStyle(this.DOMNode, this.transition.keyframes.from);

      // Trigger a repaint.
      let width = this.DOMNode.offsetWidth + 1; // jshint ignore:line
    }

    let callback = (event) => {
      if (!event || event.target === this.DOMNode) {
        removeListener(this.type, this.DOMNode, callback);
        removeTransition(this.DOMNode);

        if (typeof onEnd === 'function') {
          onEnd();
        }
      }
    };

    let style = {};

    for (let property in this.transition) {
      if (property.indexOf('transition-') !== -1) {
        style[property] = this.transition[property];
      }
    }

    for (let property in this.transition.keyframes.to) {
      style[property] = this.transition.keyframes.to[property];
    }

    applyStyle(this.DOMNode, style);

    if (this.definition['transition-duration'] === '0ms') {
      callback();
      return;
    }
    else {
      addListener(this.type, this.DOMNode, callback);
    }
  }

}
