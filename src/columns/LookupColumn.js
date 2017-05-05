// @flow

import React from 'react';
import Column from './Column';

export default class LookupColumn extends React.Component {
  static defaultProps = {
    notFoundText: '',
    onCreate: {},
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
      <Column
        onCreate={(data) => {
          let value = notFoundText || '';
          const result = dataSource.filter(x => x[valueField] === data);
          if (result.length > 0) {
            value = result[0][displayField];
          }
          if (onCreate && typeof onCreate === 'function') {
            value = onCreate(value);
          }
          return value;
        }}
        {...others}
      />
    );
  }
}
