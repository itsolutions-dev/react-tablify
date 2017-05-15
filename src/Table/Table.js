// @flow

import React from 'react';
import { toArray, flatten, cloneWithProps } from '../utils';

type TableProps = {
  component: string | Function,
  dataset: Array<any>,
  className: string,
  style: Object,
  children: any
};

const getChildrenArray = (props: TableProps) => {
  const { dataset, component, children, className, style, ...others } = props;
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
  return childrenArray.map((container) => {
    let newContainer = container;
    if (container && container.props && container.props.tablifyBody) {
      const containerChildren = toArray(
        (container.props && container.props.children) || [],
        true,
      );
      newContainer = React.cloneElement(
        container,
        {},
        // eslint-disable-next-line
        flatten(
          dataset.map((data, dataIndex) =>
            containerChildren.map((row, rowIndex) => {
              let newRow = row;
              if (row && row.type && row.props && row.props.tablifyRow) {
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
              }
              return newRow;
            }),
          ),
        ),
      );
    }
    return newContainer;
  });
};

export default class Table extends React.Component {
  static defaultProps = {
    component: 'table',
    dataset: [],
  };

  props: TableProps;

  render() {
    const { component, dataset, children, ...others } = this.props;
    const Component = component;
    return (
      <Component {...others}>
        {getChildrenArray(this.props)}
      </Component>
    );
  }
}
