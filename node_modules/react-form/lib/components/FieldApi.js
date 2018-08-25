'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//

var FieldApi = function (_React$Component) {
  _inherits(FieldApi, _React$Component);

  function FieldApi() {
    _classCallCheck(this, FieldApi);

    return _possibleConstructorReturn(this, (FieldApi.__proto__ || Object.getPrototypeOf(FieldApi)).apply(this, arguments));
  }

  _createClass(FieldApi, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          render = _props.render,
          component = _props.component,
          children = _props.children,
          field = _props.field,
          rest = _objectWithoutProperties(_props, ['render', 'component', 'children', 'field']);

      var formApi = this.context.formApi;

      // Get the full field name

      var fullField = formApi.getFullField(field);

      // Get the node of that field
      var node = formApi.getNodeByField(fullField);

      // Get the field api
      var fieldApi = node ? node.api : {};

      // Get the field values
      var fieldState = node ? {
        fieldName: fullField,
        value: formApi.getValue(fullField),
        touched: formApi.getTouched(fullField),
        error: formApi.getError(fullField),
        warning: formApi.getWarning(fullField),
        success: formApi.getSuccess(fullField)
      } : {};

      var inlineProps = _extends({}, fieldApi, fieldState, rest);

      var componentProps = _extends({
        fieldApi: _extends({}, fieldApi, fieldState)
      }, rest);

      if (component) {
        return _react2.default.createElement(component, componentProps, children);
      }
      if (render) {
        return render(inlineProps);
      }
      // There's no reason for form api to simply return it's children, so only
      // support a child function
      return children(inlineProps);
    }
  }]);

  return FieldApi;
}(_react2.default.Component);

FieldApi.contextTypes = {
  formApi: _propTypes2.default.object
};

exports.default = FieldApi;
module.exports = exports['default'];