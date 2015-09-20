// $ node mysql.js

var EventEmitter   = require('events').EventEmitter;
var MysqlConnector = require('./MysqlConnector.js').MysqlConnector;

var moment = require('moment');

var ev = new EventEmitter();


ev.on('mysql_connect', function(connection)
{
	var Test = (function()
	{
		var mysql = (connection) ? connection : {};

		var params = {
			lists: [],
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

		return {
			get    : get,
			add    : add,
			params : params,
		};
	})();

	ev.on('test_add', function()
	{
		Test.get();
	});

	ev.on('test_get', function()
	{
		console.log('Test.get() -> on.test_get');
		console.log(Test.params.lists);
	});

	Test.add('test : ' + moment().format());
});

MysqlConnector.init(ev);