(function()
{
	'use strict';

	var mysql      = require('mysql');
	var connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'me',
		password : 'secret',
		database : 'my_db'
	});

	var ev;

	var init = function(eventEmitter)
	{
		ev = (eventEmitter) ? eventEmitter : {};
		connection.connect(function(err)
		{
			if (err) {
				console.error('error connecting: ' + err.stack);
				return;
			}
			console.log('connected as id ' + connection.threadId);
			ev.emit('mysql_connect', connection);
		});
	};

	module.exports.MysqlConnector = {
		init: init,
	};
})();