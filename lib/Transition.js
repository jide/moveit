'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _utils = require('./utils');

var Transition = (function () {
  function Transition(DOMNode, definition) {
    _classCallCheck(this, Transition);

    this.type = 'transition';
    this.DOMNode = DOMNode;
    this.definition = definition;
    this.transition = (0, _utils.getTransition)(definition);
  }

  _createClass(Transition, [{
    key: 'start',
    value: function start(onEnd) {
      var _this = this;

      if (this.transition.keyframes.from) {
        (0, _utils.applyStyle)(this.DOMNode, this.transition.keyframes.from);

        // Trigger a repaint.
        var width = this.DOMNode.offsetWidth + 1; // jshint ignore:line
      }

      var callback = function callback(event) {
        if (!event || event.target === _this.DOMNode) {
          (0, _utils.removeListener)(_this.type, _this.DOMNode, callback);
          (0, _utils.removeTransition)(_this.DOMNode);

          if (typeof onEnd === 'function') {
            onEnd();
          }
        }
      };

      var style = {};

      for (var property in this.transition) {
        if (property.indexOf('transition-') !== -1) {
          style[property] = this.transition[property];
        }
      }

      for (var property in this.transition.keyframes.to) {
        style[property] = this.transition.keyframes.to[property];
      }

      (0, _utils.applyStyle)(this.DOMNode, style);

      if (this.definition['transition-duration'] === '0ms') {
        callback();
        return;
      } else {
        (0, _utils.addListener)(this.type, this.DOMNode, callback);
      }
    }
  }]);

  return Transition;
})();

exports['default'] = Transition;
module.exports = exports['default'];