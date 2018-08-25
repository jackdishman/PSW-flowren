'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validationSuccess = exports.validationFailure = exports.doneValidatingField = exports.validatingField = exports.submitting = exports.submits = exports.submitted = exports.submit = exports.clearAll = exports.resetAll = exports.reset = exports.setAllTouched = exports.setTouched = exports.setAsyncSuccess = exports.setAsyncWarning = exports.setAsyncError = exports.setSuccess = exports.setWarning = exports.setError = exports.format = exports.setAllValues = exports.setValue = exports.setFormState = exports.VALIDATION_SUCCESS = exports.VALIDATION_FAILURE = exports.DONE_VALIDATING_FIELD = exports.VALIDATING_FIELD = exports.SUBMITTING = exports.SUBMITS = exports.SUBMITTED = exports.SUBMIT = exports.CLEAR_ALL = exports.RESET_ALL = exports.RESET = exports.SET_ALL_TOUCHED = exports.SET_TOUCHED = exports.SET_ASYNC_SUCCESS = exports.SET_ASYNC_WARNING = exports.SET_ASYNC_ERROR = exports.SET_SUCCESS = exports.SET_WARNING = exports.SET_ERROR = exports.FORMAT = exports.SET_ALL_VALUES = exports.SET_VALUE = exports.SET_FORM_STATE = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.preValidate = preValidate;
exports.validate = validate;
exports.asyncValidate = asyncValidate;

var _utils = require('../utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var makeAction = function makeAction(type) {
  return function (payload) {
    return { type: type, payload: payload };
  };
};

var SET_FORM_STATE = exports.SET_FORM_STATE = 'SET_FORM_STATE';
var SET_VALUE = exports.SET_VALUE = 'SET_VALUE';
var SET_ALL_VALUES = exports.SET_ALL_VALUES = 'SET_ALL_VALUES';
var FORMAT = exports.FORMAT = 'FORMAT';
var SET_ERROR = exports.SET_ERROR = 'SET_ERROR';
var SET_WARNING = exports.SET_WARNING = 'SET_WARNING';
var SET_SUCCESS = exports.SET_SUCCESS = 'SET_SUCCESS';
var SET_ASYNC_ERROR = exports.SET_ASYNC_ERROR = 'SET_ASYNC_ERROR';
var SET_ASYNC_WARNING = exports.SET_ASYNC_WARNING = 'SET_ASYNC_WARNING';
var SET_ASYNC_SUCCESS = exports.SET_ASYNC_SUCCESS = 'SET_ASYNC_SUCCESS';
var SET_TOUCHED = exports.SET_TOUCHED = 'SET_TOUCHED';
var SET_ALL_TOUCHED = exports.SET_ALL_TOUCHED = 'SET_ALL_TOUCHED';
var RESET = exports.RESET = 'RESET';
var RESET_ALL = exports.RESET_ALL = 'RESET_ALL';
var CLEAR_ALL = exports.CLEAR_ALL = 'CLEAR_ALL';
var SUBMIT = exports.SUBMIT = 'SUBMIT';
var SUBMITTED = exports.SUBMITTED = 'SUBMITTED';
var SUBMITS = exports.SUBMITS = 'SUBMITS';
var SUBMITTING = exports.SUBMITTING = 'SUBMITTING';
var VALIDATING_FIELD = exports.VALIDATING_FIELD = 'VALIDATING_FIELD';
var DONE_VALIDATING_FIELD = exports.DONE_VALIDATING_FIELD = 'DONE_VALIDATING_FIELD';
var VALIDATION_FAILURE = exports.VALIDATION_FAILURE = 'VALIDATION_FAILURE';
var VALIDATION_SUCCESS = exports.VALIDATION_SUCCESS = 'VALIDATION_SUCCESS';

var setFormState = exports.setFormState = makeAction(SET_FORM_STATE);
var setValue = exports.setValue = makeAction(SET_VALUE);
var setAllValues = exports.setAllValues = makeAction(SET_ALL_VALUES);
var format = exports.format = makeAction(FORMAT);
var setError = exports.setError = makeAction(SET_ERROR);
var setWarning = exports.setWarning = makeAction(SET_WARNING);
var setSuccess = exports.setSuccess = makeAction(SET_SUCCESS);
var setAsyncError = exports.setAsyncError = makeAction(SET_ASYNC_ERROR);
var setAsyncWarning = exports.setAsyncWarning = makeAction(SET_ASYNC_WARNING);
var setAsyncSuccess = exports.setAsyncSuccess = makeAction(SET_ASYNC_SUCCESS);
var setTouched = exports.setTouched = makeAction(SET_TOUCHED);
var setAllTouched = exports.setAllTouched = makeAction(SET_ALL_TOUCHED);
var reset = exports.reset = makeAction(RESET);
var resetAll = exports.resetAll = makeAction(RESET_ALL);
var clearAll = exports.clearAll = makeAction(CLEAR_ALL);
var submit = exports.submit = makeAction(SUBMIT);
var submitted = exports.submitted = makeAction(SUBMITTED);
var submits = exports.submits = makeAction(SUBMITS);
var submitting = exports.submitting = makeAction(SUBMITTING);
var validatingField = exports.validatingField = makeAction(VALIDATING_FIELD);
var doneValidatingField = exports.doneValidatingField = makeAction(DONE_VALIDATING_FIELD);
var validationFailure = exports.validationFailure = makeAction(VALIDATION_FAILURE);
var validationSuccess = exports.validationSuccess = makeAction(VALIDATION_SUCCESS);

function preValidate(_ref) {
  var field = _ref.field,
      validator = _ref.validator;

  return function (dispatch, getState) {
    if (validator && validator !== _utils2.default.noop) {
      // Call the validation function
      var result = validator(_utils2.default.get(getState().values, field));
      if (typeof result === 'undefined') {
        console.info('You have returned undefined from preValidate for the field: ' + field.toString() + '. If this was intentional, disregard this message.');
      }
      dispatch(setValue({ field: field, value: result }));
    }
  };
}

function validate(_ref2) {
  var field = _ref2.field,
      validator = _ref2.validator;

  return function (dispatch, getState) {
    if (!validator || validator === _utils2.default.noop) {
      return;
    }
    // Call the validation function and clean the result
    var result = validator(_utils2.default.get(getState().values, field));

    var recurse = function recurse(current, path) {
      // Normalize fieldPath
      path = _utils2.default.makePathArray(path);

      // If it's a non object/array, treat it as an error
      if (!_utils2.default.isObject(current) && !_utils2.default.isArray(current)) {
        // Nested errors aren't allowed if using string errors, so return
        return dispatch(setError({ field: path, value: current }));
      }

      // If it's an error object, set a clean slate
      if (current.error || current.warning || current.success) {
        dispatch(setError({ field: path, value: false }));
        dispatch(setWarning({ field: path, value: false }));
        dispatch(setSuccess({ field: path, value: false }));

        // Now handle accordingly
        if (current.error) {
          dispatch(setError({ field: path, value: current.error }));
        }
        if (current.warning) {
          dispatch(setWarning({ field: path, value: current.warning }));
        }
        if (current.success) {
          dispatch(setSuccess({ field: path, value: current.success }));
        }
        return;
      }

      // If result is an array, recurse into each item
      if (_utils2.default.isArray(current)) {
        return current.map(function (subResult, i) {
          return recurse(subResult, [path, i]);
        });
      }

      // It must be a normal object, recurse on each key to set nested errors!
      _utils2.default.mapObject(current, function (subResult, key) {
        return recurse(subResult, [path, key]);
      });
    };

    // Recurse to set all errors
    recurse(result, field);

    return _utils2.default.cleanError(result, { removeSuccess: true });
  };
}

function asyncValidate(_ref3) {
  var _this = this;

  var field = _ref3.field,
      validator = _ref3.validator,
      validationPromiseIDs = _ref3.validationPromiseIDs;

  return function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(dispatch, getState) {
      var fieldPathArray, uid, result, recurse;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(!validator || validator === _utils2.default.noop)) {
                _context.next = 2;
                break;
              }

              return _context.abrupt('return');

            case 2:
              // We are validating the specified field
              dispatch(validatingField(field));

              fieldPathArray = _utils2.default.makePathArray(field).join('.');

              // Set up an autoincrementing promise UID for this field on the form

              uid = (validationPromiseIDs.get(fieldPathArray) || 0) + 1;

              validationPromiseIDs.set(fieldPathArray, uid);

              result = void 0;
              _context.prev = 7;
              _context.next = 10;
              return validator(_utils2.default.get(getState().values, field));

            case 10:
              result = _context.sent;

              if (!(validationPromiseIDs.get(fieldPathArray) !== uid)) {
                _context.next = 13;
                break;
              }

              return _context.abrupt('return');

            case 13:

              // Set up the error recursion
              recurse = function recurse(current, path) {
                // Normalize fieldPath
                path = _utils2.default.makePathArray(path);

                // If it's a non object/array, treat it as an error
                if (!_utils2.default.isObject(current) && !_utils2.default.isArray(current)) {
                  // Nested errors aren't allowed if using string errors, so return
                  return dispatch(setAsyncError({ field: path, value: current }));
                }

                // If it's an error object, respond accordingly
                if (current.error || current.warning || current.success) {
                  dispatch(setAsyncError({ field: path, value: false }));
                  dispatch(setAsyncWarning({ field: path, value: false }));
                  dispatch(setAsyncSuccess({ field: path, value: false }));
                  if (current.error) {
                    dispatch(setAsyncError({ field: path, value: current.error }));
                  }
                  if (current.warning) {
                    dispatch(setAsyncWarning({ field: path, value: current.warning }));
                  }
                  if (current.success) {
                    dispatch(setAsyncSuccess({ field: path, value: current.success }));
                  }
                  return;
                }

                // If result is an array, recurse into each item
                if (_utils2.default.isArray(current)) {
                  return current.map(function (subResult, i) {
                    return recurse(subResult, [path, i]);
                  });
                }

                // It must be a normal object, recurse on each key to set nested errors!
                _utils2.default.mapObject(current, function (subResult, key) {
                  return recurse(subResult, [path, key]);
                });
              };

              // Handle the error


              recurse(result, field);

              // We successfully validated so dispatch
              dispatch(validationSuccess(field));
              _context.next = 22;
              break;

            case 18:
              _context.prev = 18;
              _context.t0 = _context['catch'](7);

              // An validation error happened!
              // Set the error result to true to stop further validation up the chain
              result = true;
              dispatch(validationFailure({ field: field, value: _context.t0 }));

            case 22:

              // Mark the field as done validating
              dispatch(doneValidatingField(field));

              return _context.abrupt('return', _utils2.default.cleanError(result, { removeSuccess: true }));

            case 24:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this, [[7, 18]]);
    }));

    return function (_x, _x2) {
      return _ref4.apply(this, arguments);
    };
  }();
}