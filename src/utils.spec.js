/* global expect */

'use strict';

import { getAnimationText, applyStyle, insertAnimation, removeTransition, getNormalizedDefinition, getArguments, getTransition } from './utils';
import easings from './easings.js';

describe('utils', () => {

  describe('getAnimationText', () => {
    it('should return the correct keyframes string', () => {
      let keyframes = {
        from: {
          background: 'blue'
        },
        '50%': {
          background: 'yellow'
        },
        to: {
          background: 'green'
        }
      };

      let text = /@(.*)keyframes test {from{background:blue;}50%{background:yellow;}to{background:green;}}/;

      expect(getAnimationText('test', keyframes)).toMatch(text);
    });
  });

  describe('insertAnimation', () => {
    it('should insert an animation rule', () => {
      let keyframes = {
        from: {
          width: '30px'
        },
        to: {
          width: '200px'
        }
      };

      let rule = insertAnimation('test', keyframes);

      let rules = document.styleSheets[document.styleSheets.length - 1].rules;
      let toRule = rules[rules.length - 1];

      expect(rule).toEqual(toRule);
    });
  });

  describe('applyStyle', () => {
    it('should apply style to node without style', () => {
      let node = document.createElement('div');
      let style = {
        background: 'blue',
        color: 'red',
        width: '100px'
      };

      applyStyle(node, style);

      for (let property in style) {
        expect(node.style[property]).toEqual(style[property]);
      }
    });

    it('should apply style to node with style', () => {
      let node = document.createElement('div');
      node.style.height = '20px';
      node.style.background = 'yellow';

      let style = {
        background: 'blue',
        color: 'red',
        width: '100px'
      };

      applyStyle(node, style);

      for (let property in style) {
        expect(node.style[property]).toEqual(style[property]);
      }

      expect(node.style.height).toEqual('20px');
    });
  });

  describe('removeTransition', () => {
    it('should remove transition styles from node', () => {
      let node = document.createElement('div');

      let style = {
        background: 'blue',
        color: 'red',
        'transition-duration': '1s',
        'transition-property': 'opacity',
        'transition-timing-function': 'linear'
      };

      applyStyle(node, style);

      removeTransition(node, style);

      expect(node.style.background).toEqual('blue');
      expect(node.style.color).toEqual('red');
      expect(node.style['transition-duration']).toEqual('');
      expect(node.style['transition-property']).toEqual('');
      expect(node.style['transition-timing-function']).toEqual('');
    });
  });

  describe('getNormalizedDefinition', () => {
    it('should return normalized definition', () => {
      let easing = easings['ease-in-sine'];

      let definition = {
        keyframes: {
          0: {
            opacity: '0',
            width: 10
          },
          '100%': {
            opacity: '1',
            width: 100
          }
        },
        ease: 'ease-in-sine',
        duration: '1s'
      };

      let normalizedDefinition = {
        keyframes: {
          from: {
            opacity: '0',
            width: '10px'
          },
          to: {
            opacity: '1',
            width: '100px'
          }
        },
        'transition-timing-function': easing,
        'transition-duration': '1s'
      };

      expect(getNormalizedDefinition('transition', definition)).toEqual(normalizedDefinition);
    });
  });

  describe('getTransition', () => {
    it('should return a correct transition object', () => {
      let definition = {
        keyframes: {
          from: {
            opacity: '0',
            height: '100px'
          },
          to: {
            opacity: '1',
            width: '100px',
            height: '100px'
          }
        },
        'transition-timing-function': 'ease-in',
        'transition-duration': '1s'
      };

      let transition = {
        keyframes: {
          from: {
            opacity: '0',
            height: '100px'
          },
          to: {
            opacity: '1',
            width: '100px',
            height: '100px'
          }
        },
        'transition-timing-function': 'ease-in,ease-in,ease-in',
        'transition-duration': '1s,1s,1s',
        'transition-property': 'opacity,height,width'
      };

      expect(getTransition(definition)).toEqual(transition);
    });
  });

  describe('getArguments', () => {
    it('should return correct arguments', () => {
      let definition = {
        keyframes: {
          '0%': {
            opacity: '0',
            height: 100
          },
          to: {
            opacity: '1',
            width: 100,
            height: 100
          }
        },
        ease: 'ease-in',
        duration: '1s'
      };

      let overrides = {
        keyframes: {
          from: {
            opacity: '1',
            width: 30
          },
          to: {
            height: 200
          }
        },
        duration: '10s',
        ease: 'ease-out'
      };

      let onEnd = () => console.log('done');

      let toDefinition = {
        keyframes: {
          from: {
            opacity: '1',
            width: '30px'
          },
          to: {
            height: '200px'
          }
        },
        'transition-timing-function': 'ease-out',
        'transition-duration': '10s'
      };

      let args = [toDefinition, onEnd];

      expect(getArguments('transition', definition, overrides, onEnd)).toEqual(args);
    });
  });

});
