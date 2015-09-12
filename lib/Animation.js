'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _vendorPrefix = require('vendor-prefix');

var _vendorPrefix2 = _interopRequireDefault(_vendorPrefix);

var _utils = require('./utils');

var uniqueID = 0;

var Animation = (function () {
  function Animation(DOMNode, definition) {
    _classCallCheck(this, Animation);

    this.type = 'animation';
    this.DOMNode = DOMNode;
    this.definition = definition;
  }

  _createClass(Animation, [{
    key: 'start',
    value: function start(onEnd) {
      var _this = this;

      uniqueID++;

      var animationName = 'animator_' + uniqueID;
      var cssRule = (0, _utils.insertAnimation)(animationName, this.definition.keyframes);

      var callback = function callback(event) {
        if (!event || event.target === _this.DOMNode) {
          (0, _utils.removeListener)(_this.type, _this.DOMNode, callback);
          (0, _utils.removeAnimation)(_this.DOMNode);
          (0, _utils.removeRule)(cssRule);

          if (typeof onEnd === 'function') {
            onEnd();
          }
        }
      };

      var style = {};

      style[_vendorPrefix2['default'].dash('animation-name')] = animationName;

      for (var property in this.definition) {
        if (property.indexOf('animation-') !== -1) {
          style[property] = this.definition[property];
        }
      }

      (0, _utils.applyStyle)(this.DOMNode, style);

      if (this.definition.duration === '0ms') {
        callback();
        return;
      } else {
        (0, _utils.addListener)(this.type, this.DOMNode, callback);
      }
    }
  }]);

  return Animation;
})();

exports['default'] = Animation;
module.exports = exports['default'];