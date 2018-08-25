'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.makeNode = makeNode;

var _utils = require('../utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var defaultNode = function defaultNode() {
  return {
    api: {
      preValidate: _utils2.default.noop,
      validate: _utils2.default.noop,
      asyncValidate: _utils2.default.noop
    },
    children: {},
    getProps: function getProps() {
      return {};
    }
  };
};

function makeNode() {
  var node = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return _extends({}, defaultNode(), node);
}

var Tree = function () {
  function Tree(rootNode) {
    _classCallCheck(this, Tree);

    this.root = makeNode(rootNode);
  }

  _createClass(Tree, [{
    key: 'addNode',
    value: function addNode(node) {
      var parent = this.root;
      // Step 1: Break the nodes field into parts
      var path = _utils2.default.makePathArray(node.fullField);
      // Step 2: Go down the tree
      while (path.length > 1) {
        // Ensure a linkage node is preset
        if (!parent.children[path[0]]) {
          parent.children[path[0]] = makeNode({
            nested: true,
            field: path[0],
            fullField: _utils2.default.makePathArray([parent.fullField, path[0]]),
            parent: parent
          });
        }

        // Child grows up, becomes the new parent
        parent = parent.children[path[0]];
        path.shift();
      }

      // Create the last node in the chain
      var newNode = makeNode(_extends({}, node, {
        field: path[0],
        parent: parent
      }));
      parent.children[path[0]] = newNode;
    }
  }, {
    key: 'removeNode',
    value: function removeNode(node) {
      var parent = this.root;
      // Step 1: Break the nodes field into parts
      var path = _utils2.default.makePathArray(node.fullField);
      // Step 2: Go down the tree
      while (path.length > 1) {
        // Bail out if the child field doesn't exist
        if (!parent.children[path[0]]) {
          return;
        }
        // Child grows up, becomes the new parent
        parent = parent.children[path[0]];
        path.shift();
      }

      // Create the last node in the chain
      delete parent.children[path[0]];
    }
  }, {
    key: 'getNodeByField',
    value: function getNodeByField(field) {
      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          closest = _ref.closest;

      // Initialize the parent to the target
      var parent = this.root;
      // Step 1: Break the nodes field into parts
      var path = _utils2.default.makePathArray(field);
      // Step 2: Go down the tree
      while (path.length) {
        if (parent.children && parent.children[path[0]]) {
          parent = parent.children[path[0]];
        } else {
          return closest ? parent : null;
        }
        path.shift();
      }
      return parent;
    }
  }]);

  return Tree;
}();

exports.default = Tree;