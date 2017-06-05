// @flow

import React from 'react';

export default class Pagination extends React.Component {
  props: {
    pages: number,
    pageIndex: number,
    pageSize: number,
    onPageChange: Function,
    component: Function | string,
    indicators: number,
    pageIndicator: Function,
    prevIndicator: Function,
    nextIndicator: Function,
    firstIndicator: Function,
    lastIndicator: Function
  };

  getIndicator = (Component: Function, index: number, key: any) => (
    <Component
      key={key !== undefined ? key : index}
      pageIndex={index}
      pageNumber={index + 1}
      disabled={
        index === this.props.pageIndex || index < 0 || index >= this.props.pages
      }
      onPageChange={() => this.props.onPageChange(index)}
    />
  );

  getPagesIndicators = () => {
    const { pages, pageIndex, pageIndicator, indicators } = this.props;
    let centralPosition = Math.ceil(indicators / 2) - 1;
    if (indicators % 2 === 0) {
      centralPosition += 1;
    }

    let indicatorsToShow = [...Array(indicators).keys()];
    // begin
    if (pageIndex <= centralPosition) {
      // do nothing
      // end
    } else if (pageIndex >= pages - (indicators - centralPosition)) {
      indicatorsToShow = indicatorsToShow.map(x => pages - 1 - x).reverse();
      // middle
    } else {
      indicatorsToShow = indicatorsToShow.map(
        x => pageIndex - (centralPosition - x),
      );
    }
    return indicatorsToShow.map(x => this.getIndicator(pageIndicator, x));
  };

  render() {
    const {
      pages,
      pageIndex,
      pageSize,
      onPageChange,
      component,
      indicators,
      pageIndicator,
      prevIndicator,
      nextIndicator,
      firstIndicator,
      lastIndicator,
      ...others
    } = this.props;
    const Component = component !== undefined ? component : 'div';
    return (
      <Component {...others}>
        {firstIndicator !== undefined &&
          this.getIndicator(firstIndicator, 0, 'first')}
        {prevIndicator !== undefined &&
          this.getIndicator(prevIndicator, pageIndex - 1, 'prev')}
        {pageIndicator !== undefined && this.getPagesIndicators()}
        {nextIndicator !== undefined &&
          this.getIndicator(nextIndicator, pageIndex + 1, 'next')}
        {lastIndicator !== undefined &&
          this.getIndicator(lastIndicator, pages - 1, 'last')}
      </Component>
    );
  }
}
