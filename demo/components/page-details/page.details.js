import Component from '../../../src/components/component';
require('./page.details.scss');

class PageDetails extends Component {
	constructor() {
		super();
	}
}

PageDetails.$inject = [];

export default {
	template: require('./page.details.html'),
	controller: PageDetails,
	bindings: {
		'selection': '<'
	}
};