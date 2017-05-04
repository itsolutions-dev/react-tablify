import React from 'react';
import { expectComponentToMatch } from './utils';
import {
  Table,
  TableRow,
  TableHeader,
  TableHeaderColumn,
  TableBody,
  TableBodyColumn,
  TableFooter,
  TableFooterColumn,
} from '../src/';

describe('table', () => {
  const dataset = [{ foo: 'foo0', bar: 'bar0' }, { foo: 'foo1', bar: 'bar1' }];

  it('should pass props', () => {
    expectComponentToMatch(
      <Table dataset={[]} name="foo" />,
      <table name="foo" />,
    );
    expectComponentToMatch(
      <Table dataset={[]} name="foo">
        <div key="1" foo="bar">bar</div>
        <div key="2" foo="foo">bar</div>
      </Table>,
      <table name="foo">
        <div dataset={[]} key="1" name="foo" foo="bar">bar</div>
        <div dataset={[]} key="2" name="foo" foo="foo">bar</div>
      </table>,
    );
  });

  it('should have an header', () => {
    expectComponentToMatch(
      <Table name="foo">
        <TableHeader>
          <TableRow>
            <TableHeaderColumn key="foo" className="foo">foo</TableHeaderColumn>
            <TableHeaderColumn key="bar" className="bar">bar</TableHeaderColumn>
          </TableRow>
        </TableHeader>
      </Table>,
      <table name="foo">
        <thead>
          <tr>
            <th className="foo">foo</th>
            <th className="bar">bar</th>
          </tr>
        </thead>
      </table>,
    );
  });

  it('should inject an header', () => {
    expectComponentToMatch(
      <Table name="foo">
        <TableHeaderColumn key="foo" className="foo">foo</TableHeaderColumn>
        <TableHeaderColumn key="bar" className="bar">bar</TableHeaderColumn>
      </Table>,
      <table name="foo">
        <thead>
          <tr>
            <th className="foo">foo</th>
            <th className="bar">bar</th>
          </tr>
        </thead>
      </table>,
    );
  });

  it('should have a footer', () => {
    expectComponentToMatch(
      <Table name="foo">
        <TableFooter>
          <TableRow>
            <TableFooterColumn className="foo">foo</TableFooterColumn>
            <TableFooterColumn className="bar">bar</TableFooterColumn>
          </TableRow>
        </TableFooter>
      </Table>,
      <table name="foo">
        <tfoot>
          <tr>
            <td className="foo">foo</td>
            <td className="bar">bar</td>
          </tr>
        </tfoot>
      </table>,
    );
  });

  it('should inject a footer', () => {
    expectComponentToMatch(
      <Table name="foo">
        <TableFooterColumn key="foo" className="foo">foo</TableFooterColumn>
        <TableFooterColumn key="bar" className="bar">bar</TableFooterColumn>
      </Table>,
      <table name="foo">
        <tfoot>
          <tr>
            <td className="foo">foo</td>
            <td className="bar">bar</td>
          </tr>
        </tfoot>
      </table>,
    );
  });

  it('should have a body', () => {
    expectComponentToMatch(
      <Table name="foo">
        <TableBody>
          <TableRow>
            <TableBodyColumn className="foo">foo</TableBodyColumn>
            <TableBodyColumn className="bar">bar</TableBodyColumn>
          </TableRow>
        </TableBody>
      </Table>,
      <table name="foo">
        <tbody />
      </table>,
    );
  });

  it('should inject a body', () => {
    expectComponentToMatch(
      <Table name="foo">
        <TableBodyColumn key="foo" className="foo">foo</TableBodyColumn>
        <TableBodyColumn key="bar" className="bar">bar</TableBodyColumn>
      </Table>,
      <table name="foo">
        <tbody />
      </table>,
    );
  });

  it('should have header, footer and body', () => {
    expectComponentToMatch(
      <Table name="foo">
        <TableHeader>
          <TableRow>
            <TableHeaderColumn className="foo">foo</TableHeaderColumn>
            <TableHeaderColumn className="bar">bar</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableBodyColumn className="foo">foo</TableBodyColumn>
            <TableBodyColumn className="bar">bar</TableBodyColumn>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableFooterColumn className="foo">foo</TableFooterColumn>
            <TableFooterColumn className="bar">bar</TableFooterColumn>
          </TableRow>
        </TableFooter>
      </Table>,
      <table name="foo">
        <thead>
          <tr>
            <th className="foo">foo</th>
            <th className="bar">bar</th>
          </tr>
        </thead>
        <tbody />
        <tfoot>
          <tr>
            <td className="foo">foo</td>
            <td className="bar">bar</td>
          </tr>
        </tfoot>
      </table>,
    );
  });

  it('should inject header, footer and body', () => {
    expectComponentToMatch(
      <Table name="foo">
        <TableHeaderColumn key="fooHeader" className="foo">
          foo
        </TableHeaderColumn>
        <TableHeaderColumn key="barHeader" className="bar">
          bar
        </TableHeaderColumn>
        <TableBodyColumn key="fooBody" className="foo">
          foo
        </TableBodyColumn>
        <TableBodyColumn key="barBody" className="bar">
          bar
        </TableBodyColumn>
        <TableFooterColumn key="fooFooter" className="foo">
          foo
        </TableFooterColumn>
        <TableFooterColumn key="barFooter" className="bar">
          bar
        </TableFooterColumn>
      </Table>,
      <table name="foo">
        <thead>
          <tr>
            <th className="foo">foo</th>
            <th className="bar">bar</th>
          </tr>
        </thead>
        <tbody />
        <tfoot>
          <tr>
            <td className="foo">foo</td>
            <td className="bar">bar</td>
          </tr>
        </tfoot>
      </table>,
    );
  });

  it('should provide data', () => {
    expectComponentToMatch(
      <Table dataset={dataset}>
        <TableBodyColumn key="foo" className="foo" field="foo" />
        <TableBodyColumn key="bar" className="bar" field="bar" />
      </Table>,
      <table>
        <tbody>
          <tr>
            <td className="foo">foo0</td>
            <td className="bar">bar0</td>
          </tr>
          <tr>
            <td className="foo">foo1</td>
            <td className="bar">bar1</td>
          </tr>
        </tbody>
      </table>,
    );

    expectComponentToMatch(
      <Table dataset={dataset}>
        <TableBody>
          <TableRow>
            <TableBodyColumn key="foo" className="foo" field="foo" />
            <TableBodyColumn key="bar" className="bar" field="bar" />
          </TableRow>
        </TableBody>
      </Table>,
      <table>
        <tbody>
          <tr>
            <td className="foo">foo0</td>
            <td className="bar">bar0</td>
          </tr>
          <tr>
            <td className="foo">foo1</td>
            <td className="bar">bar1</td>
          </tr>
        </tbody>
      </table>,
    );
  });
});
