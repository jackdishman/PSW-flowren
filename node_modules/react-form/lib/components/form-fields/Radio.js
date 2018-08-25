'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _withRadioGroup = require('../withRadioGroup');

var _withRadioGroup2 = _interopRequireDefault(_withRadioGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//

var Radio = (_temp = _class = function (_Component) {
  _inherits(Radio, _Component);

  function Radio() {
    _classCallCheck(this, Radio);

    return _possibleConstructorReturn(this, (Radio.__proto__ || Object.getPrototypeOf(Radio)).apply(this, arguments));
  }

  _createClass(Radio, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          _onChange = _props.onChange,
          _onBlur = _props.onBlur,
          value = _props.value,
          _props$radioGroup = _props.radioGroup,
          setValue = _props$radioGroup.setValue,
          setTouched = _props$radioGroup.setTouched,
          groupValue = _props$radioGroup.value,
          groupOnChange = _props$radioGroup.onChange,
          groupOnBlur = _props$radioGroup.onBlur,
          rest = _objectWithoutProperties(_props, ['onChange', 'onBlur', 'value', 'radioGroup']);

      return _react2.default.createElement('input', _extends({}, rest, {
        value: value,
        checked: groupValue === value,
        onChange: function onChange(e) {
          if (!e.target.checked) {
            return;
          }
          setValue(value);
          if (_onChange) {
            _onChange(e);
          }
          if (groupOnChange) {
            groupOnChange(e);
          }
        },
        onBlur: function onBlur(e) {
          setTouched();
          if (_onBlur) {
            _onBlur(e);
          }
          if (groupOnBlur) {
            groupOnBlur(e);
          }
        },
        type: 'radio'
      }));
    }
  }]);

  return Radio;
}(_react.Component), _class.contextTypes = {
  reactFormGroup: _propTypes2.default.object
}, _temp);
exports.default = (0, _withRadioGroup2.default)(Radio);
module.exports = exports['default'];