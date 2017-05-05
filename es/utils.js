'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wrapColumns = exports.componentOr = exports.setRowComponent = exports.cloneWithProps = exports.toArray = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var toArray = exports.toArray = function toArray(array) {
  var result = [];
  var isArray = Array.isArray(array);
  if (isArray) {
    result = array;
  } else if (array !== undefined && array !== null && !isArray) {
    result = [array];
  }
  return result;
};

var cloneWithProps = exports.cloneWithProps = function cloneWithProps(element, props, key) {
  var newProps = Object.assign({}, props, element.props);
  if (newProps.key === undefined) newProps.key = key;
  return _react2['default'].createElement(element.type, newProps);
};

var Row = void 0;
var setRowComponent = exports.setRowComponent = function setRowComponent(Component) {
  Row = Component;
};

var componentOr = function componentOr(fallback) {
  return function (_ref) {
    var component = _ref.component,
        others = _objectWithoutProperties(_ref, ['component']);

    var Component = component || fallback;
    return _react2['default'].createElement(Component, others);
  };
};

exports.componentOr = componentOr;
var wrapColumns = exports.wrapColumns = function wrapColumns(columns, Component, key) {
  return _react2['default'].createElement(
    Component,
    { key: key },
    _react2['default'].createElement(
      Row,
      null,
      columns
    )
  );
};