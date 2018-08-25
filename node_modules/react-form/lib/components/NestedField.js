'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp2, _initialiseProps;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _utils = require('../utils');

var _utils2 = _interopRequireDefault(_utils);

var _Tree = require('../utils/Tree');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//

var NestedField = (_temp2 = _class = function (_React$Component) {
  _inherits(NestedField, _React$Component);

  function NestedField() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, NestedField);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = NestedField.__proto__ || Object.getPrototypeOf(NestedField)).call.apply(_ref, [this].concat(args))), _this), _initialiseProps.call(_this), _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(NestedField, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        // Any children are now within the context of this nestedField
        formApi: this.formApi,
        formState: this.context.formState
      };
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.node = {};
      var defaultValues = this.props.defaultValues;

      this.buildApi(this.props);

      if (typeof this.fieldApi.getValue() === 'undefined') {
        this.fieldApi.setValue(undefined, defaultValues);
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      // If the field or validators change, we have to rebuild
      if (!_utils2.default.isShallowEqual(this.props, nextProps, ['preValidate', 'validate', 'asyncValidate']) || _utils2.default.makePathArray(this.props.field).join('.') !== _utils2.default.makePathArray(nextProps.field).join('.')) {
        // If the field is changing, we need to deregister it
        if (this.props.field !== nextProps.field) {
          this.context.formApi.deregister(this.node);
        }
        // Rebuild the api, including the field registration
        this.buildApi(nextProps);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.context.formApi.deregister(this.node);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          render = _props.render,
          component = _props.component,
          children = _props.children,
          rest = _objectWithoutProperties(_props, ['render', 'component', 'children']);

      var inlineProps = _extends({}, rest, this.fieldApi, this.getFieldValues());

      var componentProps = _extends({}, rest, {
        fieldApi: _extends({}, this.fieldApi, this.getFieldValues())
      });

      if (component) {
        return _react2.default.createElement(component, componentProps, children);
      }
      if (render) {
        return render(inlineProps);
      }
      if (typeof children === 'function') {
        return children(inlineProps);
      }
      return children;
    }
  }]);

  return NestedField;
}(_react2.default.Component), _class.defaultProps = {
  defaultValues: {}
}, _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.buildApi = function (props) {
    var formApi = _this2.context.formApi;
    var field = props.field;


    var fullField = formApi.getFullField(field);

    // Overrides on the form api for child nodes
    _this2.formApi = _extends({}, formApi, {
      // Override the getFullField to reflect the new field context
      getFullField: function getFullField(field) {
        return [fullField, field];
      }
    });

    var proxySubField = function proxySubField(method) {
      return function (subField) {
        for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          args[_key2 - 1] = arguments[_key2];
        }

        return method.apply(undefined, [[fullField, subField].filter(Boolean)].concat(args));
      };
    };

    // Set up the node's field-level api
    _this2.fieldApi = {
      // Most of these methods should act just like the form api methods,
      // since a nested field operates on multiple fields, not a single
      // field
      getValue: proxySubField(formApi.getValue),
      setValue: proxySubField(formApi.setValue),
      setTouched: proxySubField(formApi.setTouched),
      setError: proxySubField(formApi.setError),
      setWarning: proxySubField(formApi.setWarning),
      setSuccess: proxySubField(formApi.setSuccess),
      addValue: proxySubField(formApi.addValue),
      removeValue: proxySubField(formApi.removeValue),
      swapValues: proxySubField(formApi.swapValues),
      reset: proxySubField(formApi.reset),
      validatingField: function validatingField() {
        return formApi.validatingField(fullField);
      },
      doneValidatingField: function doneValidatingField() {
        return formApi.doneValidatingField(fullField);
      },
      validate: function validate(opts) {
        return formApi.validate(fullField, opts);
      },
      preValidate: function preValidate(opts) {
        return formApi.preValidate(fullField, opts);
      },
      asyncValidate: function asyncValidate(opts) {
        return formApi.asyncValidate(fullField, opts);
      }

      // define function to generate field values
    };_this2.getFieldValues = function () {
      return {
        fieldName: fullField,
        values: formApi.getValue(fullField),
        touched: formApi.getTouched(fullField),
        error: formApi.getError(fullField),
        warning: formApi.getWarning(fullField),
        success: formApi.getSuccess(fullField)
      };
    };

    // Build our node
    _this2.node = (0, _Tree.makeNode)(_extends({}, _this2.node, {
      nested: true,
      field: field,
      fullField: fullField,
      api: _this2.fieldApi,
      getState: _this2.getFieldValues,
      getProps: function getProps() {
        return _this2.props;
      }
    }));

    // We need to register our node after building the API
    formApi.register(_this2.node);
  };
}, _temp2);


NestedField.contextTypes = {
  formApi: _propTypes2.default.object,
  formState: _propTypes2.default.object
};

NestedField.childContextTypes = {
  formApi: _propTypes2.default.object,
  formState: _propTypes2.default.object
};

exports.default = NestedField;
module.exports = exports['default'];