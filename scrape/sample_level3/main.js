// $ node main.js

var CronJob        = require('cron').CronJob;
var EventEmitter   = require('events').EventEmitter;
var MysqlConnector = require('./MysqlConnector.js').MysqlConnector;
var Test           = require('./Test.js').Test;
var Komado         = require('./Komado.js').Komado;

var ev = new EventEmitter();

var init = function()
{
	Komado.init(ev);
	MysqlConnector.init(ev);
};

var startCronJob = function()
{
	var job = new CronJob(
	{
		cronTime : '0-59/10 * * * * *',
		onTick   : function()
		{
			console.log('Start');
			Komado.scrape();
		},
		start    : false,
		timeZone : 'Asia/Tokyo',
	});

	job.start();
};

ev.on('mysql_connect', function(connection)
{
	Test.init(ev, connection);
	Komado.setModel('Test', Test);
	startCronJob();
});

init();