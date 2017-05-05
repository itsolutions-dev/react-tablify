// @flow

import React from 'react';

export default class Cell extends React.Component {
  static defaultProps = {
    cellComponent: 'td',
  };

  props: {
    cellComponent: string | Function,
    data: any,
    field: number | string,
    onCreate: any => any,
    children: any
  };

  render() {
    const {
      cellComponent,
      data,
      field,
      onCreate,
      children,
      ...others
    } = this.props;
    let newData = data;
    if (typeof field === 'string') {
      field.split('.').forEach((x: string) => {
        newData = (newData || {})[x];
      });
    } else if (typeof field === 'number') {
      newData = data[field];
    }
    if (onCreate) newData = onCreate(newData);
    const Component = cellComponent;
    return (
      <Component {...others}>
        {newData}
        {children}
      </Component>
    );
  }
}
