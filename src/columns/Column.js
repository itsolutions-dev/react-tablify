// @flow

import React from 'react';

export default class Column extends React.Component {
  static defaultProps = {
    component: 'td',
  };

  props: {
    component: string | Function,
    data: any,
    field: number | string,
    onCreate: any => any,
    children: any
  };

  render() {
    const {
      component,
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
    const Component = component;
    return (
      <Component {...others}>
        {newData}
        {children}
      </Component>
    );
  }
}
