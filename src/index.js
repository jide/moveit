'use strict';

import { getArguments } from './utils';
import Transition from './Transition';
import Animation from './Animation';

function init(type, DOMNode, ...rest) {
  if (typeof DOMNode === 'undefined' || DOMNode === null) {
    return null;
  }

  let [definition, onEnd] = getArguments(type, ...rest);

  let instance = type === 'transition' ? new Transition(DOMNode, definition) : new Animation(DOMNode, definition);

  instance.start(onEnd);

  return instance;
}

export function transition(DOMNode, ...rest) {
  return init('transition', DOMNode, ...rest);
}

export function animation(DOMNode, ...rest) {
  return init('animation', DOMNode, ...rest);
}
