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
          dataset.map((data, dataIndex) =>
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
                  const tempRow =
                    // eslint-disable-next-line
                    <row.type {...row.props} key={`${dataIndex}${rowIndex}`} />;
                  if (tablifying === true) {
                    toAppend.push(tempRow);
                  } else {
                    newRow = tempRow;
                  }
                }
              }
              return newRow;
            }),
          ).concat(toAppend),
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
