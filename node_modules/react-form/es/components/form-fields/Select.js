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

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//

var SelectWrapper = function (_Component) {
  _inherits(SelectWrapper, _Component);

  function SelectWrapper() {
    _classCallCheck(this, SelectWrapper);

    return _possibleConstructorReturn(this, (SelectWrapper.__proto__ || Object.getPrototypeOf(SelectWrapper)).apply(this, arguments));
  }

  _createClass(SelectWrapper, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          _props$fieldApi = _props.fieldApi,
          value = _props$fieldApi.value,
          setValue = _props$fieldApi.setValue,
          setTouched = _props$fieldApi.setTouched,
          options = _props.options,
          _onChange = _props.onChange,
          _onBlur = _props.onBlur,
          placeholder = _props.placeholder,
          rest = _objectWithoutProperties(_props, ['fieldApi', 'options', 'onChange', 'onBlur', 'placeholder']);

      var resolvedOptions = options.find(function (d) {
        return d.value === '';
      }) || placeholder === false ? options : [{
        label: placeholder || 'Select One...',
        value: '',
        disabled: true
      }].concat(_toConsumableArray(options));

      var nullIndex = resolvedOptions.findIndex(function (d) {
        return d.value === '';
      });
      var selectedIndex = resolvedOptions.findIndex(function (d) {
        return d.value === value;
      });

      return _react2.default.createElement(
        'select',
        _extends({}, rest, {
          value: selectedIndex > -1 ? selectedIndex : nullIndex,
          onChange: function onChange(e) {
            var val = resolvedOptions[e.target.value].value;
            setValue(val);
            if (_onChange) {
              _onChange(val, e);
            }
          },
          onBlur: function onBlur(e) {
            setTouched();
            if (_onBlur) {
              _onBlur(e);
            }
          }
        }),
        resolvedOptions.map(function (option, i) {
          return _react2.default.createElement(
            'option',
            { key: option.value, value: i, disabled: option.disabled },
            option.label
          );
        })
      );
    }
  }]);

  return SelectWrapper;
}(_react.Component);

var Select = (0, _withField2.default)(SelectWrapper);

exports.default = Select;