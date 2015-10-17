// $ pm2 start pm2.js
// $ pm2 list
// $ pm2 stop     <app_name|id|'all'|json_conf>
// $ pm2 restart  <app_name|id|'all'|json_conf>
// $ pm2 delete   <app_name|id|'all'|json_conf>

// Monitoring all processes launched:
// $ pm2 monit

// Log facilities
// $ pm2 logs ['all'|'PM2'|app_name|app_id] [--err|--out] [--lines <n>] [--raw] [--timestamp [format]]
// $ pm2 logs
// $ pm2 flush          # Clear all the logs

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
		console.log('success cron pm2');
		// process.exit();
	},
	start    : false,
	timeZone : 'Asia/Tokyo',
});

job.start();

// console.log('success');
// process.exit();