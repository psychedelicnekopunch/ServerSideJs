/*
Seconds      : 0-59
Minutes      : 0-59
Hours        : 0-23
Day of Month : 1-31
Months       : 0-11
Day of Week  : 0-6
*/

var CronJob = require('cron').CronJob;
/*
new CronJob('* * * * * *', function() {
	console.log('You will see this message every second');
}, null, true, 'America/Los_Angeles');
*/

var job = new CronJob(
{
	cronTime : '0-59/5 * * * * *',
	onTick   : function()
	{
		console.log('success');
	},
	start    : false,
	timeZone : 'Asia/Tokyo',
});

var job2 = new CronJob(
{
	cronTime : '0-59/2 * * * * *',
	onTick   : function()
	{
		console.log('success2');
	},
	start    : false,
	timeZone : 'Asia/Tokyo',
});

job.start();
job2.start();