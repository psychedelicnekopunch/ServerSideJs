(function()
{
	'use strict';

	var moment = require('moment');

	var mysql = null;
	var ev    = null;

	var params = {
		lists: [],
	};

	var init = function(eventEmitter, mysqlConnection)
	{
		ev    = (eventEmitter) ? eventEmitter : {};
		mysql = (mysqlConnection) ? mysqlConnection : {};
		// ev.emit('test_init');
	};

	var get = function()
	{
		mysql.query('select * from test', function(err, rows)
		{
			if (err) {
				console.log(err);
				return;
			}
			// console.log(rows);
			params.lists = rows;
			ev.emit('test_get');
		});
	};

	var add = function(message)
	{
		if (!message) {
			ev.emit('test_add_error');
			return;
		}
		var params = {
			message     : message,
			action_time : moment().format('X'),
		};

		mysql.query('insert into test set ?', params, function(err, result)
		{
			if (err) {
				console.log(err);
				return;
			}
			// console.log(result);
			ev.emit('test_add');
		});
	};

	module.exports.Test = {
		init   : init,
		get    : get,
		add    : add,
		params : params,
	};
})();