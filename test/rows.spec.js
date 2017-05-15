// @flow

import React from 'react';
import expect from 'expect';
import ReactTestUtils from 'react-dom/test-utils';
import { expectComponentToMatch } from './utils';
import { Row } from '../src/';

describe('rows', () => {
  describe('Row', () => {
    it('should pass props', () => {
      expectComponentToMatch(<Row name="foo" />, <tr name="foo" />);
    });

    it('should render a custom component', () => {
      expectComponentToMatch(
        <Row component="div" name="foo" />,
        <div name="foo" />,
      );
    });

    it('should handle onCreate', () => {
      expectComponentToMatch(
        <Row onCreate={() => ({ surname: 'bar' })} name="foo" />,
        <tr name="foo" surname="bar" />,
      );
    });

    it('should handle odd and even', () => {
      expectComponentToMatch(
        <div>
          <Row odd="black" even="white" dataIndex={0} />
          <Row odd="black" even="white" dataIndex={1} />
          <Row odd="black" even="white" dataIndex={2} />
          <Row odd="black" even="white" dataIndex={3} />
        </div>,
        <div>
          <tr style={{ background: 'white' }} />
          <tr style={{ background: 'black' }} />
          <tr style={{ background: 'white' }} />
          <tr style={{ background: 'black' }} />
        </div>,
      );
    });

    it('should handle odd and even', () => {
      const colors = ['white', 'black', 'blue'];
      expectComponentToMatch(
        <div>
          <Row colors={colors} dataIndex={0} />
          <Row colors={colors} dataIndex={1} />
          <Row colors={colors} dataIndex={2} />
          <Row colors={colors} dataIndex={3} />
          <Row colors={colors} dataIndex={4} />
          <Row colors={colors} dataIndex={5} />
          <Row colors={colors} dataIndex={6} />
        </div>,
        <div>
          <tr style={{ background: 'white' }} />
          <tr style={{ background: 'black' }} />
          <tr style={{ background: 'blue' }} />
          <tr style={{ background: 'white' }} />
          <tr style={{ background: 'black' }} />
          <tr style={{ background: 'blue' }} />
          <tr style={{ background: 'white' }} />
        </div>,
      );
    });

    it('should handle click', (done) => {
      const props = {
        dataIndex: 0,
        rowIndex: 0,
        data: 'foo',
        dataset: [{ foo: 'foo' }, { foo: 'bar' }],
      };
      const onClick = (data, e) => {
        expect(data).toEqual(props);
        expect(e).toExist();
        done();
      };
      const rendered = ReactTestUtils.renderIntoDocument(
        <Row onClick={onClick} {...props} />,
      );
      const tr = ReactTestUtils.findRenderedDOMComponentWithTag(rendered, 'tr');
      ReactTestUtils.Simulate.click(tr);
    });
  });
});
