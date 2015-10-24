// $ casperjs casper.js

var isStop = function(status)
{
	// status is success or fail
	return (status === 'success') ? false : true;
};

var test = (function()
{
	var casper = require('casper').create();

	casper.start('http://komado.masa69.net', function() {
		this.echo(this.getTitle());
	});

	casper.run();
})();
