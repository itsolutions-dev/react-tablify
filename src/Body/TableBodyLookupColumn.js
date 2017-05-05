import React from 'react';
import { TableBodyColumn } from '.';

export default class TableBodyLookupColumn extends React.Component {
  static propTypes = {
    key: React.PropTypes.string.isRequired,
    field: React.PropTypes.string.isRequired,
    valueField: React.PropTypes.string.isRequired,
    displayField: React.PropTypes.string.isRequired,
    notFoundText: React.PropTypes.string,
    dataSource: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    onCreate: React.PropTypes.func,
  };

  static defaultProps = {
    notFoundText: '',
    onCreate: {},
  };

  render() {
    const {
      field,
      key,
      onCreate,
      valueField,
      displayField,
      dataSource,
      notFoundText,
      ...others
    } = this.props;
    return (
      <TableBodyColumn
        key={this.props.key}
        field={this.props.field}
        onCreate={(data) => {
          let value = notFoundText || '';
          const result = dataSource.filter(x => x[valueField] === data);
          if (result.length > 0) {
            value = result[0][displayField];
          }
          if (onCreate && typeof onCreate === 'function') {
            value = onCreate(value);
          }
          return value;
        }}
        {...others}
      />
    );
  }
}
