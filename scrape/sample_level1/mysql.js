// $ node mysql.js

var EventEmitter = require('events').EventEmitter;
var Mysql        = require('./mysqlConnect.js');

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

		return {
			get    : get,
			params : params,
		};
	})();

	ev.on('test_get', function()
	{
		console.log('Test.get() -> on.test_get');
		console.log(Test.params.lists);
	});

	Test.get();
});

Mysql.mysqlConnect.init(ev);