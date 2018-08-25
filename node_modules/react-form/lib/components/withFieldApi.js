'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = withFieldApi;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _FieldApi = require('./FieldApi');

var _FieldApi2 = _interopRequireDefault(_FieldApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//

function withFieldApi(name) {
  return function (Comp) {
    return function (props) {
      return _react2.default.createElement(_FieldApi2.default, _extends({ component: Comp, field: name }, props));
    };
  };
}
module.exports = exports['default'];