import {CellView} from '../scene';
import {ColumnModel} from '../column-type/column.model';
import {Model} from '../infrastructure/model';

export interface ICell{
	column: ColumnModel;
	row: any;
}

export interface IBuildRows{
	(startCell: CellView, endCell: CellView): any[];
}

export interface IBuildColumns{
	(startCell: CellView, endCell: CellView): ColumnModel[];
}

export interface IBuildCells{
	(startCell: Cell, endCell: Cell): ICell;
}

export interface IBuildMix{
	(startCell: Cell, endCell: Cell): any[];
}

export interface IBuildResult{
	(args: any[]): IBuildResult | IBuildColumns | IBuildCells | IBuildMix;
}

export declare class SelectionRange {
	constructor(model: Model);
  model: Model;
	build(): IBuildResult;
	buildRows(startCell: Cell, endCell: Cell): any[];
	buildColumns(startCell: Cell, endCell: Cell): ColumnModel[];
	buildCells(startCell: Cell, endCell: Cell): ICell[];
	buildMix(startCell: Cell, endCell: Cell): any[];
}
