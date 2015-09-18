// $ node cron_phantom.js

var objectForScrapeInterface = function()
{
	return {
		h1 : null,
		h2 : null,
		h3 : null,
	};
};

var isStop = function(status)
{
	// status is success or fail
	return (status === 'success') ? false : true;
};


var testScrape = function()
{
	var phantom = require('phantom');

	phantom.create(function(ph)
	{
		ph.createPage(function(page)
		{
			var url  = 'http://komado.masa69.net';

			page.open(url, function(status)
			{
				if (isStop(status)) {
					ph.exit();
				}
				page.evaluate(function(objInterface)
				{
					var obj = objInterface;

					obj.h1 = document.querySelector('h1').innerText;
					obj.h2 = document.querySelector('h2').innerText;
					obj.h3 = document.querySelector('h3').innerText;

					return obj;
				}, function(res)
				{
					console.log('h1  -> ' + res.h1);
					console.log('h2  -> ' + res.h2);
					console.log('h3  -> ' + res.h3);
					ph.exit();
				}, objectForScrapeInterface());
			});
		});
	});
};


var CronJob = require('cron').CronJob;

var job = new CronJob(
{
	cronTime : '0-59/5 * * * * *',
	onTick   : function()
	{
		console.log('Start');
		testScrape();
	},
	start    : false,
	timeZone : 'Asia/Tokyo',
});

job.start();
