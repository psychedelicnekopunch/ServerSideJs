// $ phantomjs phantom.js

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

var test = (function()
{
	var page = require('webpage').create();

	var url  = 'http://komado.masa69.net';
	console.log(page.settings.userAgent);

	page.open(url, function(status) {
		if (isStop(status)) {
			phantom.exit();
		}
		var data = page.evaluate(function(objInterface)
		{
			var obj = objInterface;

			obj.h1 = document.querySelector('h1').innerText;
			obj.h2 = document.querySelector('h2').innerText;
			obj.h3 = document.querySelector('h3').innerText;

			return obj;
		}, objectForScrapeInterface());
		console.log('url -> ' + page.url);
		console.log('h1  -> ' + data.h1);
		console.log('h2  -> ' + data.h2);
		console.log('h3  -> ' + data.h3);
		phantom.exit();
	});
})();
