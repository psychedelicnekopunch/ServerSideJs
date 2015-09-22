// $ node cheerio.js

var test = (function()
{
	var phantom = require('phantom');

	phantom.create(function(ph)
	{
		ph.createPage(function(page)
		{
			var url  = 'http://komado.masa69.net';

			page.open(url, function(status)
			{
				if (status !== 'success') {
					ph.exit();
				}
				page.evaluate(function()
				{
					var obj = {};

					obj.body = document.querySelector('html body').innerHTML;

					return obj;
				}, function(res)
				{
					// console.log(res.body);
					var cheerio = require('cheerio');
					var $ = cheerio.load(res.body);
					// console.log($);
					console.log($('h1').html());
					// console.log(res.body);
					ph.exit();
				});
			});
		});
	});
})();
