'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wrapColumns = exports.componentOr = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _TableRow = require('./Table/TableRow');

var _TableRow2 = _interopRequireDefault(_TableRow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

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
      _TableRow2['default'],
      null,
      columns
    )
  );
};