import {ColumnView} from '../scene';
import {ColumnModel} from './column.model';
import {TemplatePath} from '../template';

TemplatePath.register('row-indicator-cell', (template, column) => {
	return {
		model: template.for,
		resource: column.key
	};
});

export class RowIndicatorColumnModel extends ColumnModel {
	constructor() {
		super('row-indicator');

		this.key = '$row.indicator';
		this.title = 'Row Indicator';
		this.class = 'control';

		this.canEdit = false;
		this.canSort = false;
		this.canResize = false;
		this.canMove = false;
		this.canFocus = false;
		this.canHighlight = false;
		this.pin = 'left';
	}
}

export class RowIndicatorColumn extends ColumnView {
	constructor(model) {
		super(model);
	}

	static model(model) {
		return model ? RowIndicatorColumn.assign(model) : new RowIndicatorColumnModel();
	}
}