// @flow

import { componentOr, setRowComponent } from '../utils';

const TableRow = componentOr('tr');

setRowComponent(TableRow);

export default TableRow;
