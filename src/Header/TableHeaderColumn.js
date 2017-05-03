// @flow

import React from 'react';
import Column from '../columns/Column';
import { componentOr } from '../utils';

const TableHeaderColumn = componentOr((props: Object) => (
  <Column component="th" {...props} />
));

export default TableHeaderColumn;
