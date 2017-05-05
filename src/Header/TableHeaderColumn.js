// @flow

import React from 'react';
import Column from '../cells/Cell';
import { componentOr } from '../utils';

const TableHeaderColumn = componentOr('cellComponent')((props: Object) => (
  <Column cellComponent="th" {...props} />
));

export default TableHeaderColumn;
