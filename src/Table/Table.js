// @flow

import React from 'react';
import { toArray, flatten, cloneWithProps } from '../utils';

type TableProps = {
  component: string | Function,
  pageNumber: number,
  pageSize: number,
  pagination: Function,
  onPageChange: Function,
  dataset: Array<any>,
  className: string,
  style: Object,
  children: any
};

export default class Table extends React.Component {
  static defaultProps = {
    component: 'table',
    dataset: [],
  };

  state = {}

  onPageChange = (...params: any) => {
    const { onPageChange } = this.props;
    if (typeof onPageChange === 'function') {
      onPageChange(...params);
    } else {
      this.setState({
        ...this.state,
        pageNumber: params[0],
      });
    }
  };

  getChildrenArray = () => {
    const {
      dataset,
      component,
      onPageChange,
      pageNumber,
      pageSize,
      pagination,
      children,
      className,
      style,
      ...others
    } = this.props;
    let childrenArray = [];
    if (Array.isArray(children)) {
      childrenArray = children;
    } else if (
      children !== null &&
      children !== undefined &&
      children !== false
    ) {
      childrenArray = [children];
    }
    let filteredDataset = dataset;
    const effectivePageNumber = typeof pageNumber === 'number'
      ? pageNumber
      : this.state.pageNumber;
    if (typeof pageSize === 'number') {
      const currentPointer = effectivePageNumber * pageSize;
      filteredDataset = filteredDataset.slice(
        currentPointer,
        currentPointer + pageSize,
      );
    }
    return childrenArray.map((container, containerIndex) => {
      let newContainer = container;
      if (container && container.props && container.props.tablifyBody) {
        const containerChildren = toArray(
          (container.props && container.props.children) || [],
          true,
        );
        const insertedRows = {};
        const toAppend = [];
        let tablifying = false;
        newContainer = React.cloneElement(
          container,
          {
            key: container.props.key !== undefined
              ? container.props.key
              : containerIndex,
          },
          // eslint-disable-next-line
          flatten(
            filteredDataset
              .map((data, dataIndex) =>
                containerChildren.map((row, rowIndex) => {
                  let newRow;
                  if (row && row.type && row.props) {
                    if (row.props.tablifyRow) {
                      tablifying = true;
                      newRow = (
                        <row.type
                          {...row.props}
                          // eslint-disable-next-line
                          key={`${dataIndex}${rowIndex}`}
                          rowIndex={rowIndex}
                          dataIndex={dataIndex}
                          dataset={dataset}
                          data={data}
                        >
                          {toArray(
                            (row.props && row.props.children) || [],
                            true,
                          ).map((column, columnIndex) =>
                            cloneWithProps(
                              column,
                              {
                                ...others,
                                rowIndex,
                                dataIndex,
                                columnIndex,
                                dataset,
                                data,
                              },
                              `${rowIndex}${columnIndex}`,
                            ),
                          )}
                        </row.type>
                      );
                    } else if (insertedRows[rowIndex] === undefined) {
                      insertedRows[rowIndex] = true;
                      const tempRow = (
                        <row.type
                          {...row.props}
                          // eslint-disable-next-line
                          key={`${dataIndex}${rowIndex}`}
                        />
                      );
                      if (tablifying === true) {
                        toAppend.push(tempRow);
                      } else {
                        newRow = tempRow;
                      }
                    }
                  }
                  return newRow;
                }),
              )
              .concat(toAppend),
          ),
        );
      }
      return newContainer;
    });
  };

  props: TableProps;

  render() {
    const {
      component,
      onPageChange,
      pageNumber,
      pageSize,
      pagination,
      dataset,
      children,
      ...others
    } = this.props;
    const Component = component;
    const Pagination = pagination;
    return (
      <span>
        <Component {...others}>
          {this.getChildrenArray(this.props)}
        </Component>
        {Pagination &&
          <Pagination
            items={dataset.length}
            pageSize={pageSize}
            pageNumber={pageNumber}
            onPageChange={this.onPageChange}
          />}
      </span>
    );
  }
}
