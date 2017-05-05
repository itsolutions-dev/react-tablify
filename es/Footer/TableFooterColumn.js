'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Column = require('../columns/Column');

var _Column2 = _interopRequireDefault(_Column);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var TableFooterColumn = (0, _utils.componentOr)(_Column2['default']);

exports['default'] = TableFooterColumn;