// @flow

import React from 'react';
import { expectComponentToMatch } from './utils';
import { Cell, LookupCell } from '../src/';

describe('cells', () => {
  const orders = [
    { id: 1, customerCode: 1 },
    { id: 2, customerCode: 3 },
    { id: 3, customerCode: 2 },
  ];

  const customers = [
    { code: 1, description: 'foo1' },
    { code: 2, description: 'foo2' },
    { code: 3, description: 'foo3' },
  ];

  describe('Cell', () => {
    it('should pass props', () => {
      expectComponentToMatch(<Cell name="foo" />, <td name="foo" />);
    });

    it('should render a custom component', () => {
      expectComponentToMatch(
        <Cell cellComponent="th" name="foo" />,
        <th name="foo" />,
      );
    });

    it('should render data and children', () => {
      expectComponentToMatch(
        <Cell data="foo">bar</Cell>,
        <td>
          {'foo'}
          {'bar'}
        </td>,
      );
    });

    it('should modify data in onCreate', () => {
      expectComponentToMatch(
        <Cell onCreate={x => x.toUpperCase()} data="foo" />,
        <td>FOO</td>,
      );
    });

    it('should get array field', () => {
      expectComponentToMatch(<Cell field={0} data={[1, 2, 3]} />, <td>1</td>);
    });

    it('should get object field', () => {
      expectComponentToMatch(
        <Cell field="foo" data={{ foo: 'bar' }} />,
        <td>bar</td>,
      );
    });

    it('should get nested field in object', () => {
      expectComponentToMatch(
        <Cell field="foo.bar" data={{ foo: { bar: 'foo' } }} />,
        <td>foo</td>,
      );
    });
  });

  describe('LookupCell', () => {
    it('should show the display field', () => {
      expectComponentToMatch(
        <LookupCell
          data={orders[0]}
          field="customerCode"
          displayField="description"
          valueField="code"
          dataSource={customers}
        />,
        <td>foo1</td>,
      );
    });

    it('should handle onCreate', () => {
      expectComponentToMatch(
        <LookupCell
          data={orders[0]}
          field="customerCode"
          displayField="description"
          valueField="code"
          dataSource={customers}
          onCreate={description => description.toUpperCase()}
        />,
        <td>FOO1</td>,
      );
    });

    it('should handle null dataSource', () => {
      expectComponentToMatch(
        <LookupCell
          data={orders[0]}
          field="customerCode"
          displayField="description"
          valueField="code"
          dataSource={null}
          onCreate={description => description && description.toUpperCase()}
        />,
        <td />,
      );
    });

    it('should handle empty dataSource', () => {
      expectComponentToMatch(
        <LookupCell
          data={orders[0]}
          field="customerCode"
          displayField="description"
          valueField="code"
          dataSource={[]}
          onCreate={description => description && description.toUpperCase()}
        />,
        <td />,
      );
    });
  });
});
