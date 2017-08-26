import {View} from '../view';
import {Aggregation} from '../services';
import {Log, AppError} from '../infrastructure';
import {getFactory as valueFactory} from '../services/value';

export class FootView extends View {
	constructor(model, table) {
		super(model);

		this.table = table;
		this.rows = [];

		this.state = {
			columns: []
		};

		this.valueFactory = valueFactory;

		this.using(model.sceneChanged.watch(this.invalidate.bind(this)));
	}

	invalidate() {
		Log.info('view.foot', 'invalidate');

		this.state.columns = this.table.view.columns();
		this.rows = new Array(this.count);
	}

	columns(row, pin) {
		return this.state.columns.filter(c => c.model.pin === pin);
	}

	get count() {
		const model = this.model;
		const columns = model.data().columns;
		const resourceCount = model.foot().resource.count;

		for (let i = 0, length = columns.length; i < length; i++) {
			if (columns[i].aggregation) {
				return Math.max(resourceCount, 1);
			}
		}

		return resourceCount;
	}

	value(column) {
		if (column.aggregation) {
			const aggregation = column.aggregation;
			const aggregationOptions = column.aggregationOptions;

			if (!Aggregation.hasOwnProperty(aggregation)) {
				throw new AppError(
					'foot',
					`Aggregation ${aggregation} is not registered`);
			}

			const rows = this.model.data().rows;
			const getValue = this.valueFactory(column);

			return Aggregation[aggregation](rows, getValue, aggregationOptions);
		}
		return null;
	}
}