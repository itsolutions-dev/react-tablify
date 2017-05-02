import expect from 'expect';
import React from 'react';
// import ReactTestUtils from 'react-dom/test-utils';
import ReactTestRenderer from 'react-test-renderer';
import Component from '../src/';

describe('index', () => {
  it('should render a div with name', () => {
    const rendered = ReactTestRenderer.create(
      <Component name="foo" />,
    ).toJSON();
    expect(rendered).toEqual({
      type: 'div',
      props: {},
      children: ['foo'],
    });
  });
});
