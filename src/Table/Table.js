// @flow

import React from 'react';
import TableHeader from '../Header/TableHeader';
import TableHeaderColumn from '../Header/TableHeaderColumn';
import TableBody from '../Body/TableBody';
import TableBodyColumn from '../Body/TableBodyColumn';
import TableFooter from '../Footer/TableFooter';
import TableFooterColumn from '../Footer/TableFooterColumn';
import { toArray, wrapColumns, cloneWithProps } from '../utils';

type TableProps = {
  data: Array<Object>,
  children: any
};

const getChildrenArray = (props: TableProps) => {
  const { children, ...others } = props;
  let result = [];
  const accumulator = {
    header: [],
    body: [],
    footer: [],
    raws: [],
  };
  children.forEach((child, index) => {
    if (child && child.type) {
      switch (child.type) {
        case TableHeaderColumn:
          accumulator.header.push(child);
          break;
        case TableFooterColumn:
          accumulator.footer.push(child);
          break;
        case TableBodyColumn:
          accumulator.body.push(child);
          break;
        case TableHeader:
        case TableBody:
        case TableFooter:
          result.push(child);
          break;
        default:
          accumulator.raws.push(cloneWithProps(child, { ...others }, index));
          break;
      }
    }
  });
  if (accumulator.header.length !== 0) {
    result.unshift(wrapColumns(accumulator.header, TableHeader, 'header'));
  }
  if (accumulator.body.length !== 0) {
    result.push(wrapColumns(accumulator.body, TableBody, 'body'));
  }
  if (accumulator.footer.length !== 0) {
    result.push(wrapColumns(accumulator.footer, TableFooter, 'footer'));
  }
  result = result.map(container =>
    React.cloneElement(
      container,
      {},
      (toArray(container.props.children) || [])
        .map((row, rowIndex) =>
          React.cloneElement(
            row,
            {},
            (toArray(row.props.children) || [])
              .map((column, columnIndex) =>
                cloneWithProps(
                  column,
                  { ...others },
                  `${rowIndex}${columnIndex}`,
                ),
              ),
          ),
        ),
    ),
  );
  result = [...result, ...accumulator.raws];
  return result;
};

const Table = (props: TableProps) => {
  const { data, children, ...others } = props;
  let newChildren = children;
  if (children && Array.isArray(children)) {
    newChildren = getChildrenArray(props);
  }
  return (
    <table {...others}>
      {newChildren}
    </table>
  );
};

export default Table;
