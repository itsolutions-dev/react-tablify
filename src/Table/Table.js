// @flow

import React from 'react';
import { toArray, flatten, cloneWithProps /* , toLowerCase */ } from '../utils';

type TableProps = {
  component: string | Function,
  pageIndex: number,
  pageSize: number,
  pagination: Function,
  onPageChange: Function,
  search: string,
  searchFor: Array<any>,
  searchComponent: Function,
  onSearch: Function,
  dataset: Array<any>,
  className: string,
  style: Object,
  children: any
};

export default class Table extends React.Component {
  static defaultProps = {
    component: 'table',
    dataset: [],
    pageSize: 10,
  };

  state = {};

  onPageChange = (...params: any) => {
    this.setState({
      ...this.state,
      pageIndex: params[0],
    });
  };

  onSearch = (/* value, { type = 'like', caseSensitive = false, fields } = {} */) => {
    // TODO
    /*
    const { searchFor, dataset } = this.props;
    let search = value;
    const criteria = fields || searchFor || [];
    dataset.filter(x =>
      criteria.reduce((acc, cur) => {
        if (acc === true) return true;
        let data = x;
        if (typeof cur === 'function') {
          data = cur(data);
        } else {
          String(cur).split('.').forEach((z: string) => {
            data = (data || {})[z];
          });
        }
        let match;
        switch (type) {
          case 'equals':
            if (typeof data === 'string' && caseSensitive === false) {
              data = toLowerCase(data);
            }
            if (typeof search === 'string' && caseSensitive === false) {
              search = toLowerCase(search);
            }
            match = data === search;
            break;
          case 'startsWith':
            data = toLowerCase(data);
            search = toLowerCase(search);
            match = data.startsWith(search);
            break;
          case 'like':
          default:
            data = toLowerCase(data);
            search = toLowerCase(search);
            match = new RegExp(search).test(data);
            break;
        }
        return match || acc;
      }, false),
    );
    */
  };

  getpageIndex = () =>
    [this.props.pageIndex, this.state.pageIndex, 0].reduce(
      (acc, cur) => (typeof acc === 'number' ? acc : cur),
    );

  getChildrenArray = () => {
    const {
      dataset,
      component,
      onPageChange,
      pageIndex,
      pageSize,
      pagination,
      children,
      className,
      style,
      ...others
    } = this.props;
    let childrenArray = [];
    if (Array.isArray(children)) {
      childrenArray = children;
    } else if (
      children !== null &&
      children !== undefined &&
      children !== false
    ) {
      childrenArray = [children];
    }
    let filteredDataset = dataset;
    if (pagination !== undefined || pageIndex !== undefined) {
      const currentPointer = this.getpageIndex() * pageSize;
      filteredDataset = filteredDataset.slice(
        currentPointer,
        currentPointer + pageSize,
      );
    }
    return childrenArray.map((container, containerIndex) => {
      let newContainer = container;
      if (container && container.props && container.props.tablifyBody) {
        const containerChildren = toArray(
          (container.props && container.props.children) || [],
          true,
        );
        const insertedRows = {};
        const toAppend = [];
        let tablifying = false;
        newContainer = React.cloneElement(
          container,
          {
            key: container.props.key !== undefined
              ? container.props.key
              : containerIndex,
          },
          // eslint-disable-next-line
          flatten(
            filteredDataset
              .map((data, dataIndex) =>
                containerChildren.map((row, rowIndex) => {
                  let newRow;
                  if (row && row.type && row.props) {
                    if (row.props.tablifyRow) {
                      tablifying = true;
                      newRow = (
                        <row.type
                          {...row.props}
                          // eslint-disable-next-line
                          key={`${dataIndex}${rowIndex}`}
                          rowIndex={rowIndex}
                          dataIndex={dataIndex}
                          dataset={dataset}
                          data={data}
                        >
                          {toArray(
                            (row.props && row.props.children) || [],
                            true,
                          ).map((column, columnIndex) =>
                            cloneWithProps(
                              column,
                              {
                                ...others,
                                rowIndex,
                                dataIndex,
                                columnIndex,
                                dataset,
                                data,
                              },
                              `${rowIndex}${columnIndex}`,
                            ),
                          )}
                        </row.type>
                      );
                    } else if (insertedRows[rowIndex] === undefined) {
                      insertedRows[rowIndex] = true;
                      const tempRow = (
                        <row.type
                          {...row.props}
                          // eslint-disable-next-line
                          key={`${dataIndex}${rowIndex}`}
                        />
                      );
                      if (tablifying === true) {
                        toAppend.push(tempRow);
                      } else {
                        newRow = tempRow;
                      }
                    }
                  }
                  return newRow;
                }),
              )
              .concat(toAppend),
          ),
        );
      }
      return newContainer;
    });
  };

  props: TableProps;

  render() {
    const {
      component,
      onPageChange,
      pageIndex,
      pageSize,
      pagination,
      search,
      searchFor,
      searchComponent,
      onSearch,
      dataset,
      children,
      ...others
    } = this.props;
    const Component = component;
    const Pagination = pagination;
    const SearchComponent = searchComponent;
    const actualPageIndex = this.getpageIndex();
    return (
      <span>
        {SearchComponent &&
          <SearchComponent
            search={search}
            onSearch={onSearch || this.onSearch}
          />}
        <Component {...others}>
          {this.getChildrenArray(this.props)}
        </Component>
        {Pagination &&
          <Pagination
            items={dataset.length}
            pageSize={pageSize}
            pageIndex={actualPageIndex}
            pageNumber={actualPageIndex + 1}
            onPageChange={onPageChange || this.onPageChange}
          />}
      </span>
    );
  }
}
