// @flow

import React from 'react';

type ComponentOrProps = { component: any, others: any };

export const toArray = (array: any) => {
  let result = [];
  const isArray = Array.isArray(array);
  if (isArray) {
    result = array;
  } else if (array !== undefined && array !== null && !isArray) {
    result = [array];
  }
  return result;
};

export const cloneWithProps = (element: Object, props: Object, key: any) => {
  const newProps = Object.assign({}, props, element.props);
  if (newProps.key === undefined) newProps.key = key;
  return <element.type {...newProps} />;
};

let Row;
export const setRowComponent = (Component: string | Function) => {
  Row = Component;
};

export const componentOr = (fallback: string | Function) => ({
  component,
  ...others
}: ComponentOrProps) => {
  const Component = component || fallback;
  return <Component {...others} />;
};

export const wrapColumns = (
  columns: Array<Object>,
  Component: Object,
  key: string,
) => (
  <Component key={key}>
    <Row>
      {columns}
    </Row>
  </Component>
);
