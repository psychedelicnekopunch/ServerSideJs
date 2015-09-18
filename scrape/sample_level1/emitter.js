var EventEmitter = require('events').EventEmitter;

var ev = new EventEmitter();

console.log(ev);

ev.on('test', function()
{
	console.log('success');
});

console.log(ev);

ev.emit('test');