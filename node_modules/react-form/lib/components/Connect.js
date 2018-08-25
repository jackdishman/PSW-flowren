'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Provider = undefined;
exports.connect = connect;

var _reactRedux = require('react-redux');

var STORE_KEY = 'react-form-context';

var Provider = exports.Provider = (0, _reactRedux.createProvider)(STORE_KEY);

function connect(mapStateToProps, mapDispatchToProps, mergeProps) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  options.storeKey = STORE_KEY;
  return (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps, mergeProps, options);
}