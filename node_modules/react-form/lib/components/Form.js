'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _BuildReducer = require('../redux/BuildReducer');

var _BuildReducer2 = _interopRequireDefault(_BuildReducer);

var _actions = require('../redux/actions');

var actions = _interopRequireWildcard(_actions);

var _utils = require('../utils');

var _utils2 = _interopRequireDefault(_utils);

var _Tree = require('../utils/Tree');

var _Tree2 = _interopRequireDefault(_Tree);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* ---------------------------- Helper Methods ----------------------------- */

/* ----- Recursive Check to see if form is valid  ----- */

var isInvalid = function isInvalid(errors) {
  if (Array.isArray(errors)) {
    return errors.some(function (k) {
      return isInvalid(k);
    });
  } else if (errors !== null && (typeof errors === 'undefined' ? 'undefined' : _typeof(errors)) === 'object') {
    return Object.keys(errors).some(function (k) {
      return isInvalid(errors[k]);
    });
  }
  return errors;
};

/* -------------- Generates a new state ------------- */

// TODO figure out way to make state immutable
var newState = function newState(state) {
  return JSON.parse(JSON.stringify(state));
};

/* ----------------- Form Component ---------------- */

var Form = function (_Component) {
  _inherits(Form, _Component);

  function Form(props) {
    var _this2 = this;

    _classCallCheck(this, Form);

    var _this = _possibleConstructorReturn(this, (Form.__proto__ || Object.getPrototypeOf(Form)).call(this, props));

    _this.getFormState = function () {
      return newState(_this.props.formState);
    };

    _this.recurseUpFromNode = function (field, cb, isAsync) {
      // Find the node using the field
      var target = _this.tree.getNodeByField(field, { closest: true });

      // If there is no target at all, stop
      if (!target) {
        return;
      }

      var stopped = false;
      var stop = function stop() {
        stopped = true;
      };

      // Define recur function
      var recurse = isAsync ? function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(node) {
          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return cb(node, stop);

                case 2:
                  // If we have parent recur up
                  if (!stopped && node.parent) {
                    recurse(node.parent);
                  }

                case 3:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, _this2);
        }));

        return function (_x) {
          return _ref.apply(this, arguments);
        };
      }() : function (node) {
        // Call the cb with the node
        cb(node, stop);
        // If we have parent recur up
        if (!stopped && node.parent) {
          recurse(node.parent);
        }
      };

      // start recursion from the target
      try {
        return recurse(target);
      } catch (err) {
        throw err;
      }
    };

    _this.recurseUpAllNodes = function (cb) {
      // Define recurse function

      var recurse = function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee2(node, parentStop) {
          var stopped, stop;
          return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  stopped = false;

                  stop = function stop() {
                    stopped = true;
                  };
                  // If we have children recurse down


                  if (!node.children) {
                    _context2.next = 5;
                    break;
                  }

                  _context2.next = 5;
                  return Promise.all(_utils2.default.mapObject(node.children, function (d) {
                    return recurse(d, stop);
                  }));

                case 5:
                  if (!stopped) {
                    _context2.next = 9;
                    break;
                  }

                  // If stopped, propagate up
                  parentStop();
                  _context2.next = 11;
                  break;

                case 9:
                  _context2.next = 11;
                  return cb(node, parentStop);

                case 11:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, _this2);
        }));

        return function recurse(_x2, _x3) {
          return _ref2.apply(this, arguments);
        };
      }();

      // start recursion from the target
      return recurse(_this.node, function () {});
    };

    _this.getFieldProps = function (field) {
      var node = field ? _this.tree.getNodeByField(field) || (0, _Tree.makeNode)() : _this.node;
      return node.getProps();
    };

    _this.getNodeByField = function (field) {
      var node = _this.tree.getNodeByField(field);
      return node;
    };

    _this.setValue = function (field, value) {
      _this.props.dispatch(actions.setValue({ field: field, value: value }));
      // Validate up the tree
      _this.validateUpFromNode(field);
    };

    _this.setTouched = function (field) {
      var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      _this.props.dispatch(actions.setTouched({ field: field, value: value }));
      // Validate up the tree
      _this.validateUpFromNode(field);
    };

    _this.setError = function (field, value) {
      _this.props.dispatch(actions.setError({ field: field, value: value }));
    };

    _this.setWarning = function (field, value) {
      _this.props.dispatch(actions.setWarning({ field: field, value: value }));
    };

    _this.setSuccess = function (field, value) {
      _this.props.dispatch(actions.setSuccess({ field: field, value: value }));
    };

    _this.preValidate = function (field) {
      var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      // Get the preValidate prop from the field node
      var _this$getFieldProps = _this.getFieldProps(field),
          preValidate = _this$getFieldProps.preValidate,
          validateOnSubmit = _this$getFieldProps.validateOnSubmit;

      if (preValidate === _utils2.default.noop || !opts.submitting && (_this.props.validateOnSubmit || validateOnSubmit)) {
        return;
      }
      _this.props.dispatch(actions.preValidate({ field: field, validator: preValidate }));
    };

    _this.validate = function (field) {
      var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      // Get the validate prop from the field node
      var _this$getFieldProps2 = _this.getFieldProps(field),
          validate = _this$getFieldProps2.validate,
          validateOnSubmit = _this$getFieldProps2.validateOnSubmit;

      if (validate === _utils2.default.noop || !opts.submitting && (_this.props.validateOnSubmit || validateOnSubmit)) {
        return;
      }
      return _this.props.dispatch(actions.validate({ field: field, validator: validate }));
    };

    _this.asyncValidate = function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee3(field) {
        var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var _this$getFieldProps3, asyncValidate, validateOnSubmit;

        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                // Get the asyncValidate prop from the field node
                _this$getFieldProps3 = _this.getFieldProps(field), asyncValidate = _this$getFieldProps3.asyncValidate, validateOnSubmit = _this$getFieldProps3.validateOnSubmit;

                if (!(asyncValidate === _utils2.default.noop || !opts.submitting && (_this.props.validateOnSubmit || validateOnSubmit))) {
                  _context3.next = 3;
                  break;
                }

                return _context3.abrupt('return');

              case 3:
                return _context3.abrupt('return', _this.props.dispatch(actions.asyncValidate({
                  field: field,
                  validator: asyncValidate,
                  validationPromiseIDs: _this.validationPromiseIDs
                })));

              case 4:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, _this2);
      }));

      return function (_x7) {
        return _ref3.apply(this, arguments);
      };
    }();

    _this.validateUpFromNode = function (field) {
      // comboValidate all fields up from the node
      _this.recurseUpFromNode(field, function (node) {
        return node.api.preValidate();
      });
      _this.recurseUpFromNode(field, function (node, stop) {
        // If a validation causes an error, stop all parent validation
        if (node.api.validate()) {
          stop();
        }
      });
      _this.recurseUpFromNode(field, function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee4(node, stop) {
          return _regenerator2.default.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  _context4.next = 2;
                  return node.api.asyncValidate();

                case 2:
                  if (!_context4.sent) {
                    _context4.next = 4;
                    break;
                  }

                  stop();

                case 4:
                case 'end':
                  return _context4.stop();
              }
            }
          }, _callee4, _this2);
        }));

        return function (_x9, _x10) {
          return _ref4.apply(this, arguments);
        };
      }(), true);
    };

    _this.setAllValues = function () {
      var values = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return _this.props.dispatch(actions.setAllValues(_extends({}, _this.props.defaultValues, values)));
    };

    _this.setAllTouched = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee5() {
      var touched;
      return _regenerator2.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              touched = {};
              // Set touched is unique because we dont want to set touched on nested fields
              // We also dont want to call the internal setTouched because that would
              // Execute validation.

              _context5.next = 3;
              return _this.recurseUpAllNodes(function (node) {
                if (node.nested) {
                  return;
                }
                if (node.fullField) {
                  touched = _utils2.default.set(touched, node.fullField, true);
                }
              });

            case 3:
              _this.props.dispatch(actions.setAllTouched(touched));

            case 4:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, _this2);
    }));

    _this.preValidateAll = function () {
      _this.recurseUpAllNodes(function (node) {
        if (node.api.preValidate) {
          node.api.preValidate({ submitting: true });
        }
      });
    };

    _this.validateAll = function () {
      return _this.recurseUpAllNodes(function (node, stop) {
        if (node.api.validate) {
          // Stop all parent validation if error is encountered
          if (node.api.validate({ submitting: true })) {
            stop();
          }
        }
      });
    };

    _this.asyncValidateAll = function () {
      return _this.recurseUpAllNodes(function () {
        var _ref6 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee6(node, stop) {
          return _regenerator2.default.wrap(function _callee6$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  if (!node.api.asyncValidate) {
                    _context6.next = 5;
                    break;
                  }

                  _context6.next = 3;
                  return node.api.asyncValidate({ submitting: true });

                case 3:
                  if (!_context6.sent) {
                    _context6.next = 5;
                    break;
                  }

                  stop();

                case 5:
                case 'end':
                  return _context6.stop();
              }
            }
          }, _callee6, _this2);
        }));

        return function (_x12, _x13) {
          return _ref6.apply(this, arguments);
        };
      }());
    };

    _this.setFormState = function (formState) {
      _this.props.dispatch(actions.setFormState(formState));
    };

    _this.getTouched = function (field) {
      return _utils2.default.get(_this.props.formState.touched, field);
    };

    _this.getValue = function (field) {
      return _utils2.default.get(_this.props.formState.values, field);
    };

    _this.getError = function (field) {
      return _utils2.default.get(_this.props.formState.errors, field);
    };

    _this.getWarning = function (field) {
      return _utils2.default.get(_this.props.formState.warnings, field);
    };

    _this.getSuccess = function (field) {
      return _utils2.default.get(_this.props.formState.successes, field);
    };

    _this.getFullField = function (field) {
      return field;
    };

    _this.addValue = function (field, value) {
      _this.props.dispatch(actions.setValue({
        field: field,
        value: [].concat(_toConsumableArray(_utils2.default.get(_this.props.formState.values, field) || []), [value])
      }));
    };

    _this.removeValue = function (field, index) {
      [{ attribute: 'values', action: 'setValue' }, { attribute: 'touched', action: 'setTouched' }, { attribute: 'errors', action: 'setError' }].forEach(function (_ref7) {
        var attribute = _ref7.attribute,
            action = _ref7.action;

        var fieldAttribute = _utils2.default.get(_this.props.formState[attribute], field) || [];
        _this.props.dispatch(actions[action]({
          field: field,
          value: [].concat(_toConsumableArray(fieldAttribute.slice(0, index)), _toConsumableArray(fieldAttribute.slice(index + 1)))
        }));
      });
    };

    _this.swapValues = function (field, index, destIndex) {
      var min = Math.min(index, destIndex);
      var max = Math.max(index, destIndex);

      var fieldValues = _utils2.default.get(_this.props.formState.values, field) || [];

      _this.props.dispatch(actions.setValue({
        field: field,
        value: [].concat(_toConsumableArray(fieldValues.slice(0, min)), [fieldValues[max]], _toConsumableArray(fieldValues.slice(min + 1, max)), [fieldValues[min]], _toConsumableArray(fieldValues.slice(max + 1)))
      }));
    };

    _this.register = function (node) {
      return _this.tree.addNode(node);
    };

    _this.deregister = function (node) {
      _this.tree.removeNode(node);
    };

    _this.reset = function (field) {
      _this.props.dispatch(actions.reset({ field: field }));
    };

    _this.resetAll = function () {
      _this.props.dispatch(actions.resetAll());
    };

    _this.clearAll = function () {
      _this.props.dispatch(actions.clearAll());
    };

    _this.preSubmit = function () {
      var _ref8 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee7(values) {
        var newValues;
        return _regenerator2.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                newValues = _utils2.default.clone(values);
                _context7.next = 3;
                return _this.recurseUpAllNodes(function (node) {
                  var _node$getProps = node.getProps(),
                      preSubmit = _node$getProps.preSubmit;

                  if (preSubmit) {
                    _utils2.default.set(newValues, node.fullField, preSubmit(_utils2.default.get(newValues, node.fullField)));
                  }
                });

              case 3:
                return _context7.abrupt('return', newValues);

              case 4:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, _this2);
      }));

      return function (_x14) {
        return _ref8.apply(this, arguments);
      };
    }();

    _this.submitForm = function () {
      var _ref9 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee8(e) {
        var _this$props$formState, _errors, _asyncErrors, _invalid, _this$props$formState2, errors, asyncErrors, invalid, asyncInvalid, values;

        return _regenerator2.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _this.props.dispatch(actions.submitting(true));
                _this.props.dispatch(actions.submits());
                _this.setAllTouched();
                _this.preValidateAll();
                _this.validateAll();

                // We prevent default, by default, unless override is passed
                if (e && e.preventDefault && _this.props.preventDefault) {
                  e.preventDefault(e);
                }
                // We need to prevent default if override is passed and form is invalid
                if (!_this.props.preventDefault) {
                  // Pull off errors from form state
                  _this$props$formState = _this.props.formState, _errors = _this$props$formState.errors, _asyncErrors = _this$props$formState.asyncErrors;
                  // Check to see if its invalid

                  _invalid = isInvalid(_errors) || isInvalid(_asyncErrors);
                  // Prevent default becaues form is invalid

                  if (_invalid && e && e.preventDefault) {
                    e.preventDefault(e);
                  }
                }

                // Call asynchronous validators
                _context8.prev = 7;
                _context8.next = 10;
                return _this.asyncValidateAll();

              case 10:
                _context8.next = 16;
                break;

              case 12:
                _context8.prev = 12;
                _context8.t0 = _context8['catch'](7);

                // Let the user know we are done submitting
                _this.props.dispatch(actions.submitting(false));
                throw _context8.t0;

              case 16:
                // Pull off errors from form state
                _this$props$formState2 = _this.props.formState, errors = _this$props$formState2.errors, asyncErrors = _this$props$formState2.asyncErrors;
                // Only submit if we have no errors

                invalid = isInvalid(errors);
                asyncInvalid = isInvalid(asyncErrors);
                // Call on validation fail if we are invalid

                if ((invalid || asyncInvalid) && _this.props.onSubmitFailure) {
                  _this.props.onSubmitFailure(errors, null, _this.getFormApi());
                }
                // Only update submitted if we are not invalid
                // And there are no active asynchronous validations

                if (!(!(invalid || asyncInvalid) && _this.props.formState.asyncValidations === 0)) {
                  _context8.next = 39;
                  break;
                }

                values = JSON.parse(JSON.stringify(_this.props.formState.values));
                // Call pre submit

                _context8.next = 24;
                return _this.preSubmit(values);

              case 24:
                values = _context8.sent;

                // Update submitted
                _this.props.dispatch(actions.submitted());
                // If onSubmit was passed then call it

                if (!_this.props.onSubmit) {
                  _context8.next = 39;
                  break;
                }

                _context8.prev = 27;
                _context8.next = 30;
                return _this.props.onSubmit(values, e, _this.getFormApi());

              case 30:
                _context8.next = 39;
                break;

              case 32:
                _context8.prev = 32;
                _context8.t1 = _context8['catch'](27);

                if (!_this.props.onSubmitFailure) {
                  _context8.next = 38;
                  break;
                }

                _this.props.onSubmitFailure({}, _context8.t1, _this.getFormApi());
                _context8.next = 39;
                break;

              case 38:
                throw _context8.t1;

              case 39:
                // Let the user know we are done submitting
                _this.props.dispatch(actions.submitting(false));

              case 40:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, _this2, [[7, 12], [27, 32]]);
      }));

      return function (_x15) {
        return _ref9.apply(this, arguments);
      };
    }();

    _this.tree = new _Tree2.default({
      nested: true,
      children: {},
      api: _extends({}, _this.getFormApi(), {
        validate: function validate(opts) {
          return _this.validate(undefined, opts);
        },
        preValidate: function preValidate(opts) {
          return _this.preValidate(undefined, opts);
        },
        asyncValidate: function asyncValidate(opts) {
          return _this.asyncValidate(undefined, opts);
        }
      }),
      getProps: function getProps() {
        return _this.props;
      }
    });
    _this.node = _this.tree.root;
    _this.validationPromiseIDs = new Map();
    return _this;
  }

  _createClass(Form, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        formApi: this.getFormApi(),
        formState: this.getFormState(),
        formProps: this.props
      };
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      if (this.props.getApi) {
        this.props.getApi(this.getFormApi());
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.validateOnMount) {
        this.preValidateAll();
        this.validateAll();
        this.asyncValidateAll();
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var didUpdate = !_utils2.default.isDeepEqual(nextProps.formState, this.props.formState);
      if (this.props.onChange && didUpdate) {
        this.props.onChange(newState(nextProps.formState), this.getFormApi());
      }
      if (!_utils2.default.isDeepEqual(nextProps.values, this.props.values)) {
        this.setAllValues(nextProps.values);
      }
    }
  }, {
    key: 'getFormApi',
    value: function getFormApi() {
      return {
        submitForm: this.submitForm,
        setValue: this.setValue,
        getValue: this.getValue,
        setTouched: this.setTouched,
        getTouched: this.getTouched,
        getWarning: this.getWarning,
        getError: this.getError,
        getSuccess: this.getSuccess,
        getFormState: this.getFormState,
        setFormState: this.setFormState,
        setError: this.setError,
        setWarning: this.setWarning,
        setSuccess: this.setSuccess,
        resetAll: this.resetAll,
        reset: this.reset,
        clearAll: this.clearAll,
        addValue: this.addValue,
        removeValue: this.removeValue,
        setAllValues: this.setAllValues,
        setAllTouched: this.setAllTouched,
        swapValues: this.swapValues,
        register: this.register,
        deregister: this.deregister,
        asyncValidate: this.asyncValidate,
        validate: this.validate,
        preValidate: this.preValidate,
        getFullField: this.getFullField,
        getNodeByField: this.getNodeByField
      };
    }

    // Utils

    // Public Api

  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          component = _props.component,
          render = _props.render;


      var formApi = this.getFormApi();
      var formState = this.getFormState();

      var inlineProps = _extends({}, formApi, formState);

      var componentProps = {
        formApi: _extends({}, formApi, formState)
      };

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

  return Form;
}(_react.Component);

Form.childContextTypes = {
  formApi: _propTypes2.default.object,
  formState: _propTypes2.default.object,
  formProps: _propTypes2.default.object
};

Form.defaultProps = {
  pure: true,
  preventDefault: true,
  defaultValues: {}

  /* ---------- Container ---------- */

};var mapStateToProps = function mapStateToProps(state) {
  return {
    formState: state
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    dispatch: dispatch
  };
};

var FormContainer = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Form);

/* ---------- Exports ---------- */

var ReactForm = function (_Component2) {
  _inherits(ReactForm, _Component2);

  function ReactForm(props) {
    _classCallCheck(this, ReactForm);

    var _this3 = _possibleConstructorReturn(this, (ReactForm.__proto__ || Object.getPrototypeOf(ReactForm)).call(this, props));

    var defaultValues = props.defaultValues,
        values = props.values;


    _this3.store = (0, _redux.createStore)((0, _BuildReducer2.default)({
      defaultValues: defaultValues,
      values: values
    }), (0, _redux.applyMiddleware)(_reduxThunk2.default // lets us dispatch() functions
    // createLogger() // neat middleware that logs actions
    ));
    return _this3;
  }

  _createClass(ReactForm, [{
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          children = _props2.children,
          rest = _objectWithoutProperties(_props2, ['children']);

      return _react2.default.createElement(
        FormContainer,
        _extends({ store: this.store }, rest),
        children
      );
    }
  }]);

  return ReactForm;
}(_react.Component);

exports.default = ReactForm;
module.exports = exports['default'];