import {yes} from 'core/services/utility';

export default function build(filterBy, op = 'and') {
	const expressions = [];
	for (let [key, filter] of Object.entries(filterBy)) {
		if (filter) {
			switch (key) {
				case '$expression':
					expressions.push(filter.expression);
					break;
				default:
					if (filter.items && filter.items.length) {
						expressions.push(toExpression(key, filter.items));
					}
			}
		}
	}

	return compile(expressions, op) || yes;
}

function toExpression(key, items) {
	return {
		kind: 'group',
		op: 'and',
		left: {
			kind: 'condition',
			left: key,
			op: 'in',
			right: Array.from(items)

		},
		right: null
	};
}

function compile(expressions, op) {
	const root = {
		kind: 'group',
		op: op,
		left: null,
		right: null
	};

	let current = root;

	expressions.forEach(expr => {
		if (!current.left) {
			current.left = expr;
		}
		else {
			const next = {
				kind: 'group',
				op: op,
				left: expr,
				right: null
			};

			current.right = next;
			current = next;
		}
	});


	return root.left ? root : null;
}