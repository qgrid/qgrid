import {View} from '../view/view';
import {Cell} from '../scene/cell';
import {SelectionState} from './state/selection.state';
import {SelectionModel} from './selection.model';
import {ColumnModel} from '../column-type/column.model';
import {CommandManager} from '../command/command.manager';
import {Command} from '../command/command';
import {Model} from '../infrastructure/model';
import {Table} from '../dom/table';
import {GridService} from '../services/grid';

export interface IToggleResult {
  (): void;
}

export interface ISelectResult {
  (): void;
}

export declare class SelectionView extends View {
  constructor(model: Model, table: Table, commandManager: CommandManager, gridService: GridService);

  readonly selection: SelectionModel;
  readonly rows: any[];
  readonly columns: ColumnModel[];

  toggleRow: Command;
  toggleCell: Command;
  toggleColumn: Command

  selectRange(startCell: Cell, endCell: Cell, source?: string): void;

  state(item: any): boolean;

  isIndeterminate(item: any): boolean;

  destroy(): void;
}
