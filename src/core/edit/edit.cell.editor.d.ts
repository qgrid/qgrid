import {Fetch} from '../infrastructure/fetch';
import {INoopResult} from '../utility/utility';
import {ICell} from "../cell/cell";
import {ColumnModel, IEditorOptions} from "../column-type/column.model";

declare class CellEditorCore {
	constructor();

	value: any;
	fetch: INoopResult;
	resetFetch: INoopResult;

	commit(): void;

	reset(): void;

	get options(): IEditorOptions;
}

export declare class CellEditor extends CellEditorCore {
	constructor(public cell: ICell);

	value: any;
	label: any;

	get title(): string;

	get column(): ColumnModel;

	getLabel(item: object): any;

	fetchFactory(): Fetch;

	static get empty(): CellEditorCore;
}