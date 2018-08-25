'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = {
  clone: clone,
  get: get,
  set: set,
  isObject: isObject,
  isArray: isArray,
  isShallowEqual: isShallowEqual,
  isDeepEqual: isDeepEqual,
  noop: noop,
  makePathArray: makePathArray,
  mapObject: mapObject,
  cleanError: cleanError
};


function isArray(a) {
  return Array.isArray(a);
}

function isObject(a) {
  return !Array.isArray(a) && (typeof a === 'undefined' ? 'undefined' : _typeof(a)) === 'object' && a !== null;
}

function flattenDeep(arr) {
  var newArr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  if (!isArray(arr)) {
    newArr.push(arr);
  } else {
    for (var i = 0; i < arr.length; i++) {
      flattenDeep(arr[i], newArr);
    }
  }
  return newArr;
}

function makePathArray(obj) {
  var path = [];
  var flat = flattenDeep(obj);
  flat.forEach(function (part) {
    if (typeof part === 'string') {
      path = path.concat(part.replace(/\[(\d*)\]/gm, '.__int__$1').replace('[', '.').replace(']', '').split('.').map(function (d) {
        if (d.indexOf('__int__') === 0) {
          return parseInt(d.substring(7), 10);
        }
        return d;
      }));
    } else {
      path.push(part);
    }
  });
  return path.filter(function (d) {
    return typeof d !== 'undefined';
  });
}

function clone(obj) {
  try {
    return JSON.parse(JSON.stringify(obj));
  } catch (err) {
    return obj;
  }
}

// TODO figure out way to make state immutable
function set() {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var path = arguments[1];
  var value = arguments[2];
  var deleteWhenFalsey = arguments[3];

  if (!path) {
    return value;
  }
  var keys = makePathArray(path);

  var cursor = obj;

  while (keys.length > 1) {
    var key = keys[0];
    var nextKey = keys[1];
    if (typeof nextKey === 'number' && !isArray(cursor[key])) {
      cursor[key] = [];
    }
    if (typeof nextKey !== 'number' && !isObject(cursor[key])) {
      cursor[key] = {};
    }
    cursor = cursor[key];
    keys.shift();
  }

  if (!value && deleteWhenFalsey) {
    delete cursor[keys[0]];
  } else {
    cursor[keys[0]] = value;
  }

  return obj;
}

function get(obj, path, def) {
  if (!path) {
    return obj;
  }
  var pathArray = makePathArray(path);
  var pathObj = pathArray;
  var val = pathObj.reduce(function (current, pathPart) {
    if (typeof current !== 'undefined' && current !== null) {
      return current[pathPart];
    }
    return undefined;
  }, obj);
  return typeof val !== 'undefined' ? val : def;
}

function isShallowEqual(obj1, obj2, keys) {
  if (!keys && Object.keys(obj1).length !== Object.keys(obj2).length) {
    return false;
  }
  var isEqual = Object.keys(obj1).every(function (prop) {
    if (keys) {
      if (keys.includes(prop)) {
        return obj1[prop] === obj2[prop];
      }
      return true;
    }
    return obj1[prop] === obj2[prop];
  });
  if (!isEqual) {
    return false;
  }
  return true;
}

function isDeepEqual(a, b) {
  if (a === b) return true;

  var arrA = Array.isArray(a);
  var arrB = Array.isArray(b);
  var i = void 0;

  if (arrA && arrB) {
    if (a.length !== b.length) return false;
    for (i = 0; i < a.length; i++) {
      if (!isDeepEqual(a[i], b[i])) return false;
    }return true;
  }

  if (arrA !== arrB) return false;

  if (a && b && (typeof a === 'undefined' ? 'undefined' : _typeof(a)) === 'object' && (typeof b === 'undefined' ? 'undefined' : _typeof(b)) === 'object') {
    var keys = Object.keys(a);
    if (keys.length !== Object.keys(b).length) return false;

    var dateA = a instanceof Date;
    var dateB = b instanceof Date;
    if (dateA && dateB) return a.getTime() === b.getTime();
    if (dateA !== dateB) return false;

    var regexpA = a instanceof RegExp;
    var regexpB = b instanceof RegExp;
    if (regexpA && regexpB) return a.toString() === b.toString();
    if (regexpA !== regexpB) return false;

    for (i = 0; i < keys.length; i++) {
      if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;
    }

    for (i = 0; i < keys.length; i++) {
      if (!isDeepEqual(a[keys[i]], b[keys[i]])) return false;
    }return true;
  }

  return false;
}

function noop() {}

function mapObject(obj, cb) {
  return Object.keys(obj).map(function (key) {
    return cb(obj[key], key);
  });
}

function cleanError(obj) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      removeSuccess = _ref.removeSuccess;

  if (!obj) {
    return undefined;
  }
  if (isObject(obj)) {
    mapObject(obj, function (val, key) {
      obj[key] = cleanError(obj[key]); // clean nested objects
      if (removeSuccess && key === 'success') {
        delete obj[key];
      }
      if (!obj[key]) {
        delete obj[key]; // remove falsey keys
      }
    });
    if (!Object.keys(obj).length) {
      return undefined;
    }
  }
  if (isArray(obj)) {
    obj = obj.map(cleanError); // clean nested falsey arrays
    if (!obj.length || obj.every(function (d) {
      return !d;
    })) {
      return undefined;
    }
  }
  return obj;
}
module.exports = exports['default'];