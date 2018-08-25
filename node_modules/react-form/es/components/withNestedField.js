'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = withNestedField;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _NestedField = require('./NestedField');

var _NestedField2 = _interopRequireDefault(_NestedField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//

function withNestedField(Comp, defaults) {
  return function ConnectedNestedField(props) {
    return _react2.default.createElement(_NestedField2.default, _extends({ component: Comp }, defaults, props));
  };
}