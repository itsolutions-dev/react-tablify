// @flow

import React from 'react';
import { expectComponentToMatch } from './utils';
import { TableHeader, TableHeaderColumn } from '../src/';

describe('table header', () => {
  describe('header', () => {
    it('should pass props', () => {
      expectComponentToMatch(<TableHeader name="foo" />, <thead name="foo" />);
    });

    it('should render the given component', () => {
      const customHeader = ({ name }: { name: string }) => <div>{name}</div>;
      expectComponentToMatch(
        <TableHeader component={customHeader} name="foo" />,
        <div>foo</div>,
      );
    });
  });

  describe('column', () => {
    it('should pass props', () => {
      expectComponentToMatch(
        <TableHeaderColumn name="foo" />,
        <th name="foo" />,
      );
    });

    it('should render the given component', () => {
      const customHeader = ({ name }: { name: string }) => <div>{name}</div>;
      expectComponentToMatch(
        <TableHeaderColumn cellComponent={customHeader} name="foo" />,
        <div>foo</div>,
      );
    });
  });
});
