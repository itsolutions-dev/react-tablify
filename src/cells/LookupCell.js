// @flow

import React from 'react';
import Cell from './Cell';

export default class LookupCell extends React.Component {
  static defaultProps = {
    dataSource: [],
  };

  props: {
    valueField: string,
    displayField: string,
    notFoundText: string,
    dataSource: Array<Object>,
    onCreate: any => any
  };

  render() {
    const {
      onCreate,
      valueField,
      displayField,
      dataSource,
      notFoundText,
      ...others
    } = this.props;
    return (
      <Cell
        onCreate={(data) => {
          let value = notFoundText;
          const result =
            Array.isArray(dataSource) &&
            dataSource.filter(x => x[valueField] === data);
          if (
            result !== undefined &&
            result !== null &&
            result !== false &&
            result.length > 0
          ) {
            value = result[0][displayField];
          }
          if (typeof onCreate === 'function') {
            value = onCreate(value);
          }
          return value;
        }}
        {...others}
      />
    );
  }
}
