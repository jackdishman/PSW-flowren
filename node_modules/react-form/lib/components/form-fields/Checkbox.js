'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _withField = require('../withField');

var _withField2 = _interopRequireDefault(_withField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//

var CheckboxWrapper = function (_Component) {
  _inherits(CheckboxWrapper, _Component);

  function CheckboxWrapper() {
    _classCallCheck(this, CheckboxWrapper);

    return _possibleConstructorReturn(this, (CheckboxWrapper.__proto__ || Object.getPrototypeOf(CheckboxWrapper)).apply(this, arguments));
  }

  _createClass(CheckboxWrapper, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          _props$fieldApi = _props.fieldApi,
          value = _props$fieldApi.value,
          setValue = _props$fieldApi.setValue,
          setTouched = _props$fieldApi.setTouched,
          _onChange = _props.onChange,
          _onBlur = _props.onBlur,
          rest = _objectWithoutProperties(_props, ['fieldApi', 'onChange', 'onBlur']);

      return _react2.default.createElement('input', _extends({}, rest, {
        checked: !!value,
        onChange: function onChange(e) {
          setValue(e.target.checked);
          if (_onChange) {
            _onChange(e.target.checked, e);
          }
        },
        onBlur: function onBlur(e) {
          setTouched();
          if (_onBlur) {
            _onBlur(e);
          }
        },
        type: 'checkbox'
      }));
    }
  }]);

  return CheckboxWrapper;
}(_react.Component);

var Checkbox = (0, _withField2.default)(CheckboxWrapper);

exports.default = Checkbox;
module.exports = exports['default'];