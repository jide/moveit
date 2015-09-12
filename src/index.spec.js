/* global expect */

'use strict';

import { transition, animation } from './index';
import Transition from './Transition';
import Animation from './Animation';

describe('animata', () => {
  describe('return an instance when called with shortcuts', () => {
    it('should return a Transition instance when called with transition', done => {
      let node = document.createElement('div');
      node.style.background = 'red';
      node.style.width = '30px';
      node.style.height = '30px';
      node.style.position = 'fixed';
      node.style.bottom = 0;
      node.style.right = 0;

      document.body.appendChild(node);

      let definition = {
        keyframes: {
          from: {
            opacity: '0'
          },
          to: {
            opacity: '1'
          }
        },
        ease: 'ease-in',
        duration: '1s'
      };

      let callback = function() {
        callbackSpy();
        expect(callbackSpy).toHaveBeenCalled();
        done();
      }

      let callbackSpy = jasmine.createSpy('callback');

      let instance = transition(node, definition, () => callback());

      expect(instance instanceof Transition).toBeTruthy();
    });

    it('should return an Animation instance when called with animation', done => {
      let node = document.createElement('div');
      node.style.background = 'blue';
      node.style.width = '30px';
      node.style.height = '30px';
      node.style.position = 'fixed';
      node.style.bottom = 0;
      node.style.right = '30px';

      document.body.appendChild(node);

      let definition = {
        keyframes: {
          from: {
            opacity: '0'
          },
          to: {
            opacity: '1'
          }
        },
        ease: 'ease-in',
        duration: '1s'
      };

      let callback = function() {
        callbackSpy();
        expect(callbackSpy).toHaveBeenCalled();
        done();
      }

      let callbackSpy = jasmine.createSpy('callback');

      let instance = animation(node, definition, () => callback());

      expect(instance instanceof Animation).toBeTruthy();
    });
  });
});
