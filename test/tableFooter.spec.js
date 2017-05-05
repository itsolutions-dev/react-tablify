// @flow

import React from 'react';
import { expectComponentToMatch } from './utils';
import { TableFooter, TableFooterColumn } from '../src/';

describe('table footer', () => {
  describe('footer', () => {
    it('should pass props', () => {
      expectComponentToMatch(<TableFooter name="foo" />, <tfoot name="foo" />);
    });

    it('should render the given component', () => {
      const customFooter = ({ name }: { name: string }) => <div>{name}</div>;
      expectComponentToMatch(
        <TableFooter component={customFooter} name="foo" />,
        <div>foo</div>,
      );
    });
  });

  describe('column', () => {
    it('should pass props', () => {
      expectComponentToMatch(
        <TableFooterColumn name="foo" />,
        <td name="foo" />,
      );
    });

    it('should render the given component', () => {
      const customFooter = ({ name }: { name: string }) => <div>{name}</div>;
      expectComponentToMatch(
        <TableFooterColumn cell={customFooter} name="foo" />,
        <div>foo</div>,
      );
    });
  });
});
