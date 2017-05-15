import React from 'react';
import { expectComponentToMatch } from './utils';
import { Table } from '../src/';

describe('table', () => {
  const dataset = [{ foo: 'foo0', bar: 'bar0' }, { foo: 'foo1', bar: 'bar1' }];

  it('should render the given component', () => {
    expectComponentToMatch(<Table component="div" />, <div />);
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
      <table>
        <caption>This is a caption</caption>
        <thead>
          <tr>
            <th className="foo">foo</th>
            <th className="bar">bar</th>
          </tr>
        </thead>
      </table>,
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
      <table name="foo">
        <tbody>
          <tr>
            <td className="foo">foo</td>
            <td className="bar">bar</td>
          </tr>
        </tbody>
      </table>,
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
      </table>,
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
      </table>,
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
      <table name="foo">
        <th key="foo" className="foo">foo</th>
        <th key="lorem" className="lorem">
          lorem
        </th>
        <th key="ipsum" className="ipsum">
          ipsum
        </th>
        <th key="bar" className="bar">bar</th>
      </table>,
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
      </table>,
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
      </table>,
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
      </table>,
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
      </table>,
    );
  });
});
