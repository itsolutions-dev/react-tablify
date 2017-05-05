'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Column = require('../columns/Column');

var _Column2 = _interopRequireDefault(_Column);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var TableHeaderColumn = (0, _utils.componentOr)(function (props) {
  return _react2['default'].createElement(_Column2['default'], _extends({ component: 'th' }, props));
});

exports['default'] = TableHeaderColumn;