import SelectionBehavior from './selection.behavior';
import {isUndefined} from 'core/services/utility';

export default class RowSelectionBehavior extends SelectionBehavior {
	constructor(state, model, markup){
		super();

		this.state = state;
		this.model = model;
		this.markup = markup;
	}

	select(item, state) {
		if (isUndefined(item)) {
			item = this.model.view().rows;
		}

		this.state.toggle(item, state);

		this.model.selection({items: this.state.view}, {source: 'toggle'});
	}

	selectCell(cell) {
		const rows = this.model.view().rows;
		const row = rows[cell.rowIndex];
		if (row) {
			this.select(row);
		}
	}

	selectRange(startCell, endCell) {
		const startIndex = Math.min(startCell.rowIndex, endCell.rowIndex);
		const endIndex = Math.max(startCell.rowIndex, endCell.rowIndex);
		const items = this.model.view().rows.slice(startIndex, endIndex + 1);

		if (items) {
			this.reset();
			this.select(items, true);
		}
	}

	reset() {
		this.state.clear();
	}
}