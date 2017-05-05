// @flow

import React from 'react';
import { expectComponentToMatch } from './utils';
import { Column, LookupColumn } from '../src/';

describe('columns', () => {
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

  describe('Column', () => {
    it('should pass props', () => {
      expectComponentToMatch(<Column name="foo" />, <td name="foo" />);
    });

    it('should render a custom component', () => {
      expectComponentToMatch(
        <Column cell="th" name="foo" />,
        <th name="foo" />,
      );
    });

    it('should render data and children', () => {
      expectComponentToMatch(
        <Column data="foo">bar</Column>,
        <td>
          {'foo'}
          {'bar'}
        </td>,
      );
    });

    it('should modify data in onCreate', () => {
      expectComponentToMatch(
        <Column onCreate={x => x.toUpperCase()} data="foo" />,
        <td>FOO</td>,
      );
    });

    it('should get array field', () => {
      expectComponentToMatch(<Column field={0} data={[1, 2, 3]} />, <td>1</td>);
    });

    it('should get object field', () => {
      expectComponentToMatch(
        <Column field="foo" data={{ foo: 'bar' }} />,
        <td>bar</td>,
      );
    });

    it('should get nested field in object', () => {
      expectComponentToMatch(
        <Column field="foo.bar" data={{ foo: { bar: 'foo' } }} />,
        <td>foo</td>,
      );
    });
  });

  describe('LookupColumn', () => {
    it('should show the display field', () => {
      expectComponentToMatch(
        <LookupColumn
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
        <LookupColumn
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
  });
});
