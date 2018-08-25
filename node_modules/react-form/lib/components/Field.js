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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Field = (_temp2 = _class = function (_React$Component) {
  _inherits(Field, _React$Component);

  function Field() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Field);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Field.__proto__ || Object.getPrototypeOf(Field)).call.apply(_ref, [this].concat(args))), _this), _initialiseProps.call(_this), _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Field, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var defaultValue = this.props.defaultValue;

      this.buildApi(this.props);

      if (typeof defaultValue !== 'undefined' && typeof this.getFieldValues().value === 'undefined') {
        this.fieldApi.setValue(defaultValue);
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      // If the field name or any validators change, we need to rebuild the api
      if (!_utils2.default.isShallowEqual(this.props, nextProps, ['preValidate', 'validate', 'asyncValidate']) || _utils2.default.makePathArray(this.props.field).join('.') !== _utils2.default.makePathArray(nextProps.field).join('.')) {
        // If the field is changing, we need to deregister it
        if (this.props.field !== nextProps.field) {
          this.context.formApi.deregister(this.node);
        }
        // Rebuild the api, including the field registration
        this.buildApi(nextProps);
      }
    }

    // Optimization to only rerender if nessisary

  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState, nextContext) {
      // Grab needed values
      var field = nextContext.formApi.getFullField(this.props.field);
      var currentFormState = this.context.formState;
      var nextFormState = nextContext.formState;
      var pure = nextProps.pure && nextContext.formProps.pure;

      // When pure, we need to check props and form state to determine if we
      // should update. Otherwise, update all the time.
      if (!pure) {
        return true;
      }
      // check child props for changes so we know to re-render
      var nonChildrenProps = _extends({}, this.props, {
        children: null // do not compare children, that would be an anti-pattern
      });
      var nextNonChildrenProps = _extends({}, nextProps, {
        children: null
      });

      var shouldUpdate = _utils2.default.get(nextFormState.values, field) !== _utils2.default.get(currentFormState.values, field) || _utils2.default.get(nextFormState.touched, field) !== _utils2.default.get(currentFormState.touched, field) || _utils2.default.get(nextFormState.errors, field) !== _utils2.default.get(currentFormState.errors, field) || _utils2.default.get(nextFormState.warnings, field) !== _utils2.default.get(currentFormState.warnings, field) || _utils2.default.get(nextFormState.successes, field) !== _utils2.default.get(currentFormState.successes, field) || _utils2.default.get(nextFormState.validating, field) !== _utils2.default.get(currentFormState.validating, field) || _utils2.default.get(nextFormState.validationFailed, field) !== _utils2.default.get(currentFormState.validationFailed, field) || !_utils2.default.isShallowEqual(nextNonChildrenProps, nonChildrenProps) || nextFormState.submits !== currentFormState.submits;

      return shouldUpdate || false;
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
          field = _props.field,
          pure = _props.pure,
          render = _props.render,
          component = _props.component,
          children = _props.children,
          preValidate = _props.preValidate,
          validate = _props.validate,
          asyncValidate = _props.asyncValidate,
          validateOnSubmit = _props.validateOnSubmit,
          rest = _objectWithoutProperties(_props, ['field', 'pure', 'render', 'component', 'children', 'preValidate', 'validate', 'asyncValidate', 'validateOnSubmit']);

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

  return Field;
}(_react2.default.Component), _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.buildApi = function (props) {
    // This binds all of the functions less often, and also won't trigger
    // changes when spreading the fieldApi as shallow props
    var formApi = _this2.context.formApi;
    var field = props.field;

    // Get the full field name

    var fullField = formApi.getFullField(field);

    // Wrap the formApi methods to reflect the new field context
    _this2.fieldApi = {
      setValue: function setValue(value) {
        return formApi.setValue(fullField, value);
      },
      setTouched: function setTouched(touched) {
        return formApi.setTouched(fullField, touched);
      },
      setError: function setError(error) {
        return formApi.setError(fullField, error);
      },
      setWarning: function setWarning(warning) {
        return formApi.setWarning(fullField, warning);
      },
      setSuccess: function setSuccess(success) {
        return formApi.setSuccess(fullField, success);
      },
      addValue: function addValue(subField, value) {
        return formApi.addValue([fullField, subField].filter(Boolean), value);
      },
      removeValue: function removeValue(subField, index) {
        return formApi.addValue([fullField, subField].filter(Boolean), index);
      },
      swapValues: function swapValues(subField) {
        for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          args[_key2 - 1] = arguments[_key2];
        }

        return formApi.addValue.apply(formApi, [[fullField, subField].filter(Boolean)].concat(args));
      },
      reset: function reset() {
        return formApi.reset(fullField);
      },
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
        value: formApi.getValue(fullField),
        touched: formApi.getTouched(fullField),
        error: formApi.getError(fullField),
        warning: formApi.getWarning(fullField),
        success: formApi.getSuccess(fullField)
      };
    };

    // Define the leaf node
    _this2.node = {
      field: field,
      fullField: fullField,
      api: _this2.fieldApi,
      getState: _this2.getFieldValues,
      getProps: function getProps() {
        return _this2.props;
      }

      // Register field
    };formApi.register(_this2.node);
  };
}, _temp2);


Field.contextTypes = {
  formApi: _propTypes2.default.object,
  formState: _propTypes2.default.object,
  formProps: _propTypes2.default.object
};

Field.propTypes = process.env.NODE_ENV !== "production" ? {
  field: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.array])
} : {};

Field.defaultProps = {
  pure: true
};

exports.default = Field;
module.exports = exports['default'];