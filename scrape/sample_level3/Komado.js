(function()
{
	'use strict';

	var model = {};
	var ev;

	var init = function(eventEmitter)
	{
		ev = (eventEmitter) ? eventEmitter : {};
		ev.on('test_add', function()
		{
			model.Test.get();
		});
		ev.on('test_get', function()
		{
			console.log(model.Test.params.lists);
		});
	};

	var setModel = function(key, modelData)
	{
		if (modelData) {
			model[key] = modelData;
		}
	};

	var scrape = function()
	{
		var phantom = require('phantom');

		var objectForScrapeInterface = function()
		{
			return {
				h1 : null,
				h2 : null,
				h3 : null,
			};
		};

		phantom.create(function(ph)
		{
			// console.log(ph);
			ph.createPage(function(page)
			{
				// console.log(page);
				var url = 'http://komado.masa69.net';

				page.open(url, function(status)
				{
					if (status !== 'success') {
						console.log(status);
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
						// console.log('h1  -> ' + res.h1);
						// console.log('h2  -> ' + res.h2);
						// console.log('h3  -> ' + res.h3);
						var message = 'h1  -> ' + res.h1 + "\n" + 'h2  -> ' + res.h2 + "\n" + 'h3  -> ' + res.h3;
						model.Test.add(message);
						ph.exit();
					}, objectForScrapeInterface());
				});
			});
		});
	};

	module.exports.Komado = {
		init     : init,
		setModel : setModel,
		scrape   : scrape,
	};
})();