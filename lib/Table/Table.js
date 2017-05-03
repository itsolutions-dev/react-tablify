'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _TableHeader = require('../Header/TableHeader');

var _TableHeader2 = _interopRequireDefault(_TableHeader);

var _TableHeaderColumn = require('../Header/TableHeaderColumn');

var _TableHeaderColumn2 = _interopRequireDefault(_TableHeaderColumn);

var _TableBody = require('../Body/TableBody');

var _TableBody2 = _interopRequireDefault(_TableBody);

var _TableBodyColumn = require('../Body/TableBodyColumn');

var _TableBodyColumn2 = _interopRequireDefault(_TableBodyColumn);

var _TableFooter = require('../Footer/TableFooter');

var _TableFooter2 = _interopRequireDefault(_TableFooter);

var _TableFooterColumn = require('../Footer/TableFooterColumn');

var _TableFooterColumn2 = _interopRequireDefault(_TableFooterColumn);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var getChildrenArray = function getChildrenArray(children) {
  var result = [];
  var accumulator = {
    header: [],
    body: [],
    footer: []
  };
  children.forEach(function (child) {
    switch (child.type) {
      case _TableHeaderColumn2['default']:
        accumulator.header.push(child);
        break;
      case _TableFooterColumn2['default']:
        accumulator.footer.push(child);
        break;
      case _TableBodyColumn2['default']:
        accumulator.body.push(child);
        break;
      default:
        result.push(child);
        break;
    }
  });
  if (accumulator.header.length !== 0) {
    result.unshift((0, _utils.wrapColumns)(accumulator.header, _TableHeader2['default'], 'header'));
  }
  if (accumulator.body.length !== 0) {
    result.push((0, _utils.wrapColumns)(accumulator.body, _TableBody2['default'], 'body'));
  }
  if (accumulator.footer.length !== 0) {
    result.push((0, _utils.wrapColumns)(accumulator.footer, _TableFooter2['default'], 'footer'));
  }
  return result;
};

var Table = function Table(props) {
  var data = props.data,
      children = props.children,
      others = _objectWithoutProperties(props, ['data', 'children']);

  var newChildren = children;
  if (children && Array.isArray(children)) {
    newChildren = getChildrenArray(children);
  }
  return _react2['default'].createElement(
    'table',
    others,
    newChildren
  );
};

exports['default'] = Table;