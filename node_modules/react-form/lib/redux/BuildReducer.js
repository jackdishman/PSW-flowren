'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = BuildReducer;

var _actions = require('./actions');

var _utils = require('../utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var INITIAL_STATE = {
  values: {},
  touched: {},
  errors: undefined,
  warnings: undefined,
  successes: undefined,
  asyncErrors: undefined,
  asyncWarnings: undefined,
  asyncSuccesses: undefined,
  validating: undefined,
  validationFailed: undefined,
  validationFailures: 0,
  asyncValidations: 0,
  submitted: false,
  submits: 0,
  submitting: false
};

var setFormState = function setFormState(state, _ref) {
  var payload = _ref.payload;
  return _extends({}, INITIAL_STATE, payload);
};

var setValue = function setValue(state, _ref2) {
  var _ref2$payload = _ref2.payload,
      field = _ref2$payload.field,
      value = _ref2$payload.value;

  var newValues = _utils2.default.set(_utils2.default.clone(state.values), field, value);
  return _extends({}, state, {
    values: newValues
  });
};

// This should REPLACE all values. if that's not intended, we should
// add a `setValues` method
var setAllValues = function setAllValues(state, _ref3) {
  var values = _ref3.payload;
  return _extends({}, state, {
    values: values
  });
};

var setTouched = function setTouched(state, _ref4) {
  var _ref4$payload = _ref4.payload,
      field = _ref4$payload.field,
      value = _ref4$payload.value;

  var newTouched = _utils2.default.set(_utils2.default.clone(state.touched), field, value, true);
  return _extends({}, state, {
    touched: newTouched
  });
};

var setAllTouched = function setAllTouched(state, _ref5) {
  var touched = _ref5.payload;
  return _extends({}, state, {
    touched: touched
  });
};

var setError = function setError(state, _ref6) {
  var _ref6$payload = _ref6.payload,
      _ref6$payload$field = _ref6$payload.field,
      field = _ref6$payload$field === undefined ? '__root' : _ref6$payload$field,
      value = _ref6$payload.value;

  var newErrors = _utils2.default.cleanError(_utils2.default.set(_utils2.default.clone(state.errors), field, value, true));
  return _extends({}, state, {
    errors: newErrors
  });
};

var setWarning = function setWarning(state, _ref7) {
  var _ref7$payload = _ref7.payload,
      _ref7$payload$field = _ref7$payload.field,
      field = _ref7$payload$field === undefined ? '__root' : _ref7$payload$field,
      value = _ref7$payload.value;

  var newWarnings = _utils2.default.cleanError(_utils2.default.set(_utils2.default.clone(state.warnings), field, value, true));
  return _extends({}, state, {
    warnings: newWarnings
  });
};

var setSuccess = function setSuccess(state, _ref8) {
  var _ref8$payload = _ref8.payload,
      _ref8$payload$field = _ref8$payload.field,
      field = _ref8$payload$field === undefined ? '__root' : _ref8$payload$field,
      value = _ref8$payload.value;

  var newSuccesses = _utils2.default.cleanError(_utils2.default.set(_utils2.default.clone(state.successes), field, value, true));
  return _extends({}, state, {
    successes: newSuccesses
  });
};

var setAsyncWarning = function setAsyncWarning(state, _ref9) {
  var _ref9$payload = _ref9.payload,
      _ref9$payload$field = _ref9$payload.field,
      field = _ref9$payload$field === undefined ? '__root' : _ref9$payload$field,
      value = _ref9$payload.value;

  var newWarnings = _utils2.default.cleanError(_utils2.default.set(_utils2.default.clone(state.asyncWarnings), field, value, true));
  return _extends({}, state, {
    asyncWarnings: newWarnings
  });
};

var setAsyncError = function setAsyncError(state, _ref10) {
  var _ref10$payload = _ref10.payload,
      _ref10$payload$field = _ref10$payload.field,
      field = _ref10$payload$field === undefined ? '__root' : _ref10$payload$field,
      value = _ref10$payload.value;

  var newErrors = _utils2.default.cleanError(_utils2.default.set(_utils2.default.clone(state.asyncErrors), field, value, true));
  return _extends({}, state, {
    asyncErrors: newErrors
  });
};

var setAsyncSuccess = function setAsyncSuccess(state, _ref11) {
  var _ref11$payload = _ref11.payload,
      _ref11$payload$field = _ref11$payload.field,
      field = _ref11$payload$field === undefined ? '__root' : _ref11$payload$field,
      value = _ref11$payload.value;

  var newSuccesses = _utils2.default.cleanError(_utils2.default.set(_utils2.default.clone(state.asyncSuccesses), field, value, true));

  return _extends({}, state, {
    asyncSuccesses: newSuccesses
  });
};

var validatingField = function validatingField(state, _ref12) {
  var _ref12$payload = _ref12.payload,
      field = _ref12$payload === undefined ? '__root' : _ref12$payload;

  var validating = _utils2.default.clone(state.validating);
  var asyncValidations = state.asyncValidations;

  // Only incriment validations if this field is going from falsey to true
  asyncValidations = !_utils2.default.get(validating, field) ? asyncValidations + 1 : asyncValidations;

  validating = _utils2.default.cleanError(_utils2.default.set(validating, field, true));

  return _extends({}, state, {
    asyncValidations: asyncValidations,
    validating: validating
  });
};

var doneValidatingField = function doneValidatingField(state, _ref13) {
  var _ref13$payload = _ref13.payload,
      field = _ref13$payload === undefined ? '__root' : _ref13$payload;

  var validating = _utils2.default.clone(state.validating);
  var asyncValidations = state.asyncValidations;

  // Only incriment validations if this field is going from falsey to true
  asyncValidations = _utils2.default.get(validating, field) ? asyncValidations - 1 : asyncValidations;

  validating = _utils2.default.cleanError(_utils2.default.set(validating, field, false));

  return _extends({}, state, {
    asyncValidations: asyncValidations,
    validating: validating
  });
};

var validationFailure = function validationFailure(state, _ref14) {
  var _ref14$payload = _ref14.payload,
      _ref14$payload$field = _ref14$payload.field,
      field = _ref14$payload$field === undefined ? '__root' : _ref14$payload$field,
      value = _ref14$payload.value;

  var validationFailed = _utils2.default.clone(state.validationFailed);
  var validationFailures = state.validationFailures;

  // Only incriment validations if this field is going from falsey to true
  validationFailures = !_utils2.default.get(validationFailed, field) ? validationFailures + 1 : validationFailures;

  validationFailed = _utils2.default.cleanError(_utils2.default.set(validationFailed, field, value));

  return _extends({}, state, {
    validationFailures: validationFailures,
    validationFailed: validationFailed
  });
};

var validationSuccess = function validationSuccess(state, _ref15) {
  var _ref15$payload = _ref15.payload,
      field = _ref15$payload === undefined ? '__root' : _ref15$payload;

  var validationFailed = _utils2.default.clone(state.validationFailed);
  var validationFailures = state.validationFailures;

  // Only devcriment faulures if this field is going from true to false
  validationFailures = _utils2.default.get(validationFailed, field) ? validationFailures - 1 : validationFailures;

  validationFailed = _utils2.default.cleanError(_utils2.default.set(validationFailed, field, false));

  return _extends({}, state, {
    validationFailures: validationFailures,
    validationFailed: validationFailed
  });
};

var submits = function submits(state) {
  return _extends({}, state, {
    submits: state.submits + 1
  });
};

var submitted = function submitted(state) {
  return _extends({}, state, {
    submitted: true
  });
};

var submitting = function submitting(state, _ref16) {
  var submitting = _ref16.payload;
  return _extends({}, state, {
    submitting: submitting
  });
};

var reset = function reset(state, _ref17) {
  var _ref17$payload$field = _ref17.payload.field,
      field = _ref17$payload$field === undefined ? '__root' : _ref17$payload$field;

  var newState = _utils2.default.clone(state);

  _utils2.default.set(newState.values, field, undefined);
  _utils2.default.set(newState.touched, field, undefined);
  _utils2.default.set(newState.errors, field, undefined);
  _utils2.default.set(newState.warnings, field, undefined);
  _utils2.default.set(newState.successes, field, undefined);
  _utils2.default.set(newState.asyncErrors, field, undefined);
  _utils2.default.set(newState.asyncWarnings, field, undefined);
  _utils2.default.set(newState.asyncSuccesses, field, undefined);

  return _extends({}, state, newState);
};

//

function BuildReducer() {
  var _ref18 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref18$defaultValues = _ref18.defaultValues,
      defaultValues = _ref18$defaultValues === undefined ? {} : _ref18$defaultValues,
      _ref18$values = _ref18.values,
      values = _ref18$values === undefined ? {} : _ref18$values;

  var COMBINED_INITIAL_STATE = _extends({}, INITIAL_STATE, {
    values: _extends({}, defaultValues, values)
  });

  var reducer = function reducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : COMBINED_INITIAL_STATE;
    var action = arguments[1];

    switch (action.type) {
      case _actions.SET_FORM_STATE:
        return setFormState(state, action);
      case _actions.SET_VALUE:
        return setValue(state, action);
      case _actions.SET_ALL_VALUES:
        return setAllValues(state, action);
      case _actions.SET_ERROR:
        return setError(state, action);
      case _actions.SET_WARNING:
        return setWarning(state, action);
      case _actions.SET_SUCCESS:
        return setSuccess(state, action);
      case _actions.SET_ASYNC_ERROR:
        return setAsyncError(state, action);
      case _actions.SET_ASYNC_WARNING:
        return setAsyncWarning(state, action);
      case _actions.SET_ASYNC_SUCCESS:
        return setAsyncSuccess(state, action);
      case _actions.SET_TOUCHED:
        return setTouched(state, action);
      case _actions.SET_ALL_TOUCHED:
        return setAllTouched(state, action);
      case _actions.SUBMITTED:
        return submitted(state, action);
      case _actions.SUBMITS:
        return submits(state, action);
      case _actions.SUBMITTING:
        return submitting(state, action);
      case _actions.RESET:
        return reset(state, action);
      case _actions.RESET_ALL:
        return COMBINED_INITIAL_STATE;
      case _actions.CLEAR_ALL:
        return INITIAL_STATE;
      case _actions.VALIDATION_FAILURE:
        return validationFailure(state, action);
      case _actions.VALIDATION_SUCCESS:
        return validationSuccess(state, action);
      case _actions.DONE_VALIDATING_FIELD:
        return doneValidatingField(state, action);
      case _actions.VALIDATING_FIELD:
        return validatingField(state, action);
      default:
        return state;
    }
  };

  return reducer;
}
module.exports = exports['default'];