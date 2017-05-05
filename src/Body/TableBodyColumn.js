// @flow

import Column from '../cells/Cell';
import { componentOr } from '../utils';

const TableBodyColumn = componentOr('cellComponent')(Column);

export default TableBodyColumn;
