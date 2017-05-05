'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var getChildrenArray = function getChildrenArray(props) {
  var dataset = props.dataset,
      children = props.children,
      others = _objectWithoutProperties(props, ['dataset', 'children']);

  var childrenArray = [];
  if (children && Array.isArray(children)) {
    childrenArray = children;
  } else if (children !== null && children !== undefined && children !== false) {
    childrenArray = [children];
  }
  var result = [];
  var accumulator = {
    header: [],
    body: [],
    footer: [],
    raws: []
  };
  childrenArray.forEach(function (child, index) {
    if (child && child.type) {
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
        case _TableHeader2['default']:
        case _TableBody2['default']:
        case _TableFooter2['default']:
          result.push(child);
          break;
        default:
          accumulator.raws.push((0, _utils.cloneWithProps)(child, _extends({ dataset: dataset }, others), index));
          break;
      }
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
  result = result.map(function (container) {
    var newContainer = void 0;
    if (container.type === _TableBody2['default']) {
      var containerChildren = (0, _utils.toArray)(container.props.children);
      newContainer = _react2['default'].cloneElement(container, {},
      // eslint-disable-next-line
      [].concat.apply([], dataset.map(function (data, dataIndex) {
        return containerChildren.map(function (row, rowIndex) {
          return _react2['default'].createElement(
            row.type,
            row.props,
            (0, _utils.toArray)(row.props.children).map(function (column, columnIndex) {
              return (0, _utils.cloneWithProps)(column, _extends({}, others, { data: data, dataIndex: dataIndex }), '' + rowIndex + columnIndex);
            })
          );
        });
      })));
    } else {
      newContainer = _react2['default'].cloneElement(container, {}, (0, _utils.toArray)(container.props.children).map(function (row, rowIndex) {
        return _react2['default'].createElement(
          row.type,
          row.props,
          (0, _utils.toArray)(row.props.children).map(function (column, columnIndex) {
            return (0, _utils.cloneWithProps)(column, _extends({}, others), '' + rowIndex + columnIndex);
          })
        );
      }));
    }
    return newContainer;
  });
  result = [].concat(_toConsumableArray(result), _toConsumableArray(accumulator.raws));
  return result;
};

var Table = (_temp = _class = function (_React$Component) {
  _inherits(Table, _React$Component);

  function Table() {
    _classCallCheck(this, Table);

    return _possibleConstructorReturn(this, (Table.__proto__ || Object.getPrototypeOf(Table)).apply(this, arguments));
  }

  _createClass(Table, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          dataset = _props.dataset,
          children = _props.children,
          others = _objectWithoutProperties(_props, ['dataset', 'children']);

      return _react2['default'].createElement(
        'table',
        others,
        getChildrenArray(this.props)
      );
    }
  }]);

  return Table;
}(_react2['default'].Component), _class.defaultProps = {
  dataset: []
}, _temp);
exports['default'] = Table;