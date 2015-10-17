// $ node q.js

(function()
{
	'use strict';

	var q = require('q');

	console.log(q);

	function test()
	{
		return 'success';
	}

	q.Promise.resolve(test())
		.then(function(val)
		{
			return '--------------\n' + val;
		})
		.then(function(val)
		{
			console.log(val);
		});
})();