// @flow

import React from 'react';
import { expectComponentToMatch } from './utils';
import { TableBody, TableBodyColumn } from '../src/';

describe('table body', () => {
  describe('body', () => {
    it('should pass props', () => {
      expectComponentToMatch(<TableBody name="foo" />, <tbody name="foo" />);
    });

    it('should render the given component', () => {
      const customBody = ({ name }: { name: string }) => <div>{name}</div>;
      expectComponentToMatch(
        <TableBody component={customBody} name="foo" />,
        <div>foo</div>,
      );
    });
  });

  describe('column', () => {
    it('should pass props', () => {
      expectComponentToMatch(<TableBodyColumn name="foo" />, <td name="foo" />);
    });

    it('should render the given component', () => {
      const customBody = ({ name }: { name: string }) => <div>{name}</div>;
      expectComponentToMatch(
        <TableBodyColumn component={customBody} name="foo" />,
        <div>foo</div>,
      );
    });
  });
});
