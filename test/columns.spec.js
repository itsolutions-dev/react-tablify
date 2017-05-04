// @flow

import React from 'react';
import { expectComponentToMatch } from './utils';
import { Column } from '../src/';

describe('columns', () => {
  describe('Column', () => {
    it('should pass props', () => {
      expectComponentToMatch(<Column name="foo" />, <td name="foo" />);
    });

    it('should render a custom component', () => {
      expectComponentToMatch(
        <Column component="th" name="foo" />,
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
});
