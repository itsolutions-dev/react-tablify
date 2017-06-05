// @flow

import React from 'react';
import expect from 'expect';
import ReactTestUtils from 'react-dom/test-utils';
import { expectComponentToMatch } from './utils';
import { Table } from '../src/';

describe('table', () => {
  const dataset = [{ foo: 'foo0', bar: 'bar0' }, { foo: 'foo1', bar: 'bar1' }];
  const Td = (props: Object) => <td>{props.data}</td>;

  it('should render the given component', () => {
    expectComponentToMatch(<Table component="div" />, <span><div /></span>);
  });

  it('should render unknown components', () => {
    expectComponentToMatch(
      <Table>
        <caption>This is a caption</caption>
        <thead>
          <tr>
            <th key="foo" className="foo">foo</th>
            <th key="bar" className="bar">bar</th>
          </tr>
        </thead>
      </Table>,
      <span>
        <table>
          <caption>This is a caption</caption>
          <thead>
            <tr>
              <th className="foo">foo</th>
              <th className="bar">bar</th>
            </tr>
          </thead>
        </table>
      </span>,
    );
  });

  it('should have a body', () => {
    expectComponentToMatch(
      <Table name="foo">
        <tbody>
          <tr>
            <td className="foo">foo</td>
            <td className="bar">bar</td>
          </tr>
        </tbody>
      </Table>,
      <span>
        <table name="foo">
          <tbody>
            <tr>
              <td className="foo">foo</td>
              <td className="bar">bar</td>
            </tr>
          </tbody>
        </table>
      </span>,
    );
  });

  it('should provide data', () => {
    expectComponentToMatch(
      <Table dataset={dataset}>
        <tbody tablifyBody>
          <tr tablifyRow>
            <td className="foo" />
            <td className="bar" />
          </tr>
        </tbody>
      </Table>,
      <span>
        <table>
          <tbody tablifyBody>
            <tr
              rowIndex={0}
              dataIndex={0}
              dataset={dataset}
              data={dataset[0]}
              tablifyRow
            >
              <td
                className="foo"
                rowIndex={0}
                dataset={dataset}
                data={dataset[0]}
                columnIndex={0}
                dataIndex={0}
              />
              <td
                className="bar"
                rowIndex={0}
                dataset={dataset}
                data={dataset[0]}
                columnIndex={1}
                dataIndex={0}
              />
            </tr>
            <tr
              rowIndex={0}
              dataIndex={1}
              dataset={dataset}
              data={dataset[1]}
              tablifyRow
            >
              <td
                className="foo"
                rowIndex={0}
                dataset={dataset}
                data={dataset[1]}
                columnIndex={0}
                dataIndex={1}
              />
              <td
                className="bar"
                rowIndex={0}
                dataset={dataset}
                data={dataset[1]}
                columnIndex={1}
                dataIndex={1}
              />
            </tr>
          </tbody>
        </table>
      </span>,
    );
  });

  it('should handle mixed rows', () => {
    expectComponentToMatch(
      <Table dataset={dataset}>
        <tbody tablifyBody>
          <tr>
            <td>Header</td>
          </tr>
          <tr tablifyRow>
            <td className="foo" />
            <td className="bar" />
          </tr>
          <tr>
            <td>Footer</td>
          </tr>
        </tbody>
      </Table>,
      <span>
        <table>
          <tbody tablifyBody>
            <tr>
              <td>Header</td>
            </tr>
            <tr
              rowIndex={1}
              dataIndex={0}
              dataset={dataset}
              data={dataset[0]}
              tablifyRow
            >
              <td
                className="foo"
                rowIndex={1}
                dataset={dataset}
                data={dataset[0]}
                columnIndex={0}
                dataIndex={0}
              />
              <td
                className="bar"
                rowIndex={1}
                dataset={dataset}
                data={dataset[0]}
                columnIndex={1}
                dataIndex={0}
              />
            </tr>
            <tr
              rowIndex={1}
              dataIndex={1}
              dataset={dataset}
              data={dataset[1]}
              tablifyRow
            >
              <td
                className="foo"
                rowIndex={1}
                dataset={dataset}
                data={dataset[1]}
                columnIndex={0}
                dataIndex={1}
              />
              <td
                className="bar"
                rowIndex={1}
                dataset={dataset}
                data={dataset[1]}
                columnIndex={1}
                dataIndex={1}
              />
            </tr>
            <tr>
              <td>Footer</td>
            </tr>
          </tbody>
        </table>
      </span>,
    );
  });

  it('should handle nested children', () => {
    expectComponentToMatch(
      <Table name="foo">
        <th key="foo" className="foo">foo</th>
        {[
          <th key="lorem" className="lorem">
            lorem
          </th>,
          <th key="ipsum" className="ipsum">
            ipsum
          </th>,
        ]}
        <th key="bar" className="bar">bar</th>
      </Table>,
      <span>
        <table name="foo">
          <th key="foo" className="foo">foo</th>
          <th key="lorem" className="lorem">
            lorem
          </th>
          <th key="ipsum" className="ipsum">
            ipsum
          </th>
          <th key="bar" className="bar">bar</th>
        </table>
      </span>,
    );

    expectComponentToMatch(
      <Table name="foo">
        <thead>
          <tr>
            <th key="foo" className="foo">foo</th>
          </tr>
          {[
            <tr key="foo">
              <th key="foo" className="foo">foo</th>
            </tr>,
            <tr key="bar">
              <th key="foo" className="foo">foo</th>
            </tr>,
          ]}
          <tr>
            <th key="foo" className="foo">foo</th>
          </tr>
        </thead>
      </Table>,
      <span>
        <table name="foo">
          <thead>
            <tr>
              <th key="foo" className="foo">foo</th>
            </tr>
            <tr>
              <th key="foo" className="foo">foo</th>
            </tr>
            <tr>
              <th key="foo" className="foo">foo</th>
            </tr>
            <tr>
              <th key="foo" className="foo">foo</th>
            </tr>
          </thead>
        </table>
      </span>,
    );

    expectComponentToMatch(
      <Table name="foo">
        <thead>
          <tr>
            <th key="foo" className="foo">foo</th>
          </tr>
        </thead>
        {[
          <tbody key="foo">
            <tr>
              <td key="foo" className="foo">foo</td>
            </tr>
          </tbody>,
          <tfoot key="bar">
            <tr>
              <td key="foo" className="foo">foo</td>
            </tr>
          </tfoot>,
        ]}
      </Table>,
      <span>
        <table name="foo">
          <thead>
            <tr>
              <th key="foo" className="foo">foo</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td key="foo" className="foo">foo</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td key="foo" className="foo">foo</td>
            </tr>
          </tfoot>
        </table>
      </span>,
    );

    expectComponentToMatch(
      <Table dataset={dataset}>
        <tbody tablifyBody>
          <tr tablifyRow>
            <td name="foo" />
            {[<td name="bar" key="foo" />, <td name="lorem" key="bar" />]}
            <td name="ipsum" />
          </tr>
        </tbody>
      </Table>,
      <span>
        <table>
          <tbody tablifyBody>
            <tr tablifyRow>
              <td name="foo" />
              <td name="bar" />
              <td name="lorem" />
              <td name="ipsum" />
            </tr>
            <tr tablifyRow>
              <td name="foo" />
              <td name="bar" />
              <td name="lorem" />
              <td name="ipsum" />
            </tr>
          </tbody>
        </table>
      </span>,
    );

    expectComponentToMatch(
      <Table dataset={dataset}>
        <tbody tablifyBody>
          <tr tablifyRow>
            <td name="foo" />
          </tr>
          {[
            <tr key="foo" tablifyRow>
              <td name="bar" />
            </tr>,
            <tr key="bar" tablifyRow>
              <td name="lorem" />
            </tr>,
          ]}
          <tr tablifyRow>
            <td name="ipsum" />
          </tr>
        </tbody>
      </Table>,
      <span>
        <table>
          <tbody tablifyBody>
            <tr tablifyRow>
              <td name="foo" />
            </tr>
            <tr tablifyRow>
              <td name="bar" />
            </tr>
            <tr tablifyRow>
              <td name="lorem" />
            </tr>
            <tr tablifyRow>
              <td name="ipsum" />
            </tr>
            <tr tablifyRow>
              <td name="foo" />
            </tr>
            <tr tablifyRow>
              <td name="bar" />
            </tr>
            <tr tablifyRow>
              <td name="lorem" />
            </tr>
            <tr tablifyRow>
              <td name="ipsum" />
            </tr>
          </tbody>
        </table>
      </span>,
    );
  });

  describe('pagination', () => {
    it('should render a pagination', () => {
      expectComponentToMatch(
        <Table
          dataset={dataset}
          pageNumber={0}
          pageSize={20}
          pagination={props => <div {...props} />}
        />,
        <span>
          <table />
          <div items={2} pageNumber={0} pageSize={20} />
        </span>,
      );

      expectComponentToMatch(
        <Table dataset={dataset} pagination={props => <div {...props} />} />,
        <span>
          <table />
          <div items={2} pageNumber={0} pageSize={10} />
        </span>,
      );
    });

    it('should render the correct page', () => {
      expectComponentToMatch(
        <Table dataset={[...Array(10).keys()]} pageNumber={2} pageSize={3}>
          <tbody tablifyBody>
            <tr tablifyRow>
              <Td />
            </tr>
          </tbody>
        </Table>,
        <span>
          <table>
            <tbody>
              <tr>
                <td>6</td>
              </tr>
              <tr>
                <td>7</td>
              </tr>
              <tr>
                <td>8</td>
              </tr>
            </tbody>
          </table>
        </span>,
      );

      expectComponentToMatch(
        <Table dataset={[...Array(7).keys()]} pageNumber={2} pageSize={3}>
          <tbody tablifyBody>
            <tr tablifyRow>
              <Td />
            </tr>
          </tbody>
        </Table>,
        <span>
          <table>
            <tbody>
              <tr>
                <td>6</td>
              </tr>
            </tbody>
          </table>
        </span>,
      );
    });

    it('should call onPageChange', (done) => {
      const rendered = ReactTestUtils.renderIntoDocument(
        <Table
          onPageChange={(page) => {
            expect(page).toEqual(42);
            done();
          }}
          pagination={props => (
            <button onClick={() => props.onPageChange(42)} />
          )}
        />,
      );
      const button = ReactTestUtils.findRenderedDOMComponentWithTag(
        rendered,
        'button',
      );
      ReactTestUtils.Simulate.click(button);
    });

    it('should use internal pagination', () => {
      const rendered = ReactTestUtils.renderIntoDocument(
        <Table
          pagination={props => (
            <button onClick={() => props.onPageChange(42)} />
          )}
        />,
      );
      const table = ReactTestUtils.findRenderedComponentWithType(
        rendered,
        Table,
      );
      expect(table.state.pageNumber).toEqual(undefined);
      const button = ReactTestUtils.findRenderedDOMComponentWithTag(
        rendered,
        'button',
      );
      ReactTestUtils.Simulate.click(button);
      expect(table.state.pageNumber).toEqual(42);
    });
  });

  describe('search', () => {
    it('should render a search component', () => {
      expectComponentToMatch(
        <Table
          dataset={dataset}
          searchComponent={props => <div name="foo" {...props} />}
        />,
        <span>
          <div name="foo" />
          <table />
        </span>,
      );
    });

    it('should call onSearch', (done) => {
      const rendered = ReactTestUtils.renderIntoDocument(
        <Table
          onSearch={(page) => {
            expect(page).toEqual('foo');
            done();
          }}
          searchComponent={props => (
            <button onClick={() => props.onSearch('foo')} />
          )}
        />,
      );
      const button = ReactTestUtils.findRenderedDOMComponentWithTag(
        rendered,
        'button',
      );
      ReactTestUtils.Simulate.click(button);
    });

    //  TODO : test internal search
  });
});
