// @flow

import React from 'react';
import Column from '../columns/Column';
import { componentOr } from '../utils';

const TableHeaderColumn = componentOr('cell')((props: Object) => (
  <Column cell="th" {...props} />
));

export default TableHeaderColumn;
