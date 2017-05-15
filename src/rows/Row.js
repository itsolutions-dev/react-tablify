// @flow

import React from 'react';

export default class Row extends React.Component {
  static defaultProps = {
    component: 'tr',
    style: {},
  };

  onClick = (event: any) => {
    const { onClick } = this.props;
    onClick(this.getRowData(), event);
  };

  getRowData = () => {
    const { rowIndex, dataIndex, dataset, data } = this.props;
    return {
      rowIndex,
      dataIndex,
      dataset,
      data,
    };
  };

  props: {
    component: string | Function,
    data: any,
    colors: Array<string>,
    odd: string,
    even: string,
    style: Object,
    rowIndex: number,
    dataIndex: number,
    dataset: Array<any>,
    onClick: any => void,
    onCreate: any => any
  };

  render() {
    const {
      component,
      onClick,
      onCreate,
      style,
      odd,
      even,
      colors,
      ...others
    } = this.props;
    const { dataIndex } = this.props;
    let background;
    if (odd && even) {
      background = dataIndex % 2 === 0 ? even : odd;
    } else if (colors) {
      background = colors[dataIndex % colors.length];
    }
    const newStyles = Object.assign({}, style, {
      background,
    });
    const Component = component;
    let additionalProps = {};
    if (onCreate) {
      additionalProps = onCreate(this.getRowData());
    }
    return (
      <Component
        onClick={onClick ? this.onClick : undefined}
        style={newStyles}
        {...others}
        {...additionalProps}
      />
    );
  }
}
