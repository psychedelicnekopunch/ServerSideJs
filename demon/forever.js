// $ forever forever.js

/*
Seconds      : 0-59
Minutes      : 0-59
Hours        : 0-23
Day of Month : 1-31
Months       : 0-11
Day of Week  : 0-6
*/

var CronJob = require('cron').CronJob;

var job = new CronJob(
{
	cronTime : '0-59/5 * * * * *',
	onTick   : function()
	{
		console.log('success cron forever');
		// process.exit();
	},
	start    : false,
	timeZone : 'Asia/Tokyo',
});

job.start();