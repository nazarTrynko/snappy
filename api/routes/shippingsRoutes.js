'use strict';

module.exports = function(app) {
	var todoList = require('../controllers/shippingsController');

	// shippings Routes
	app.route('/shippings')
		.get(todoList.list_all_shippings)
		.post(todoList.create_a_shipping);
};
