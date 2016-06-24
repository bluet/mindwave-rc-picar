var exec = require('exec');
var net = require('net');


var action = [
	[1, 0, 0, 0],
	[0, 1, 0, 0],
	[0, 0, 1, 0],
	[0, 0, 0, 1]
];

console.log(action);

var client = new net.Socket();
client.connect(54321, '10.105.12.160', function() {
	console.log('Connected');
	client.write('Hello, server! Love, Client.');
});

client.on('data', function(data) {
	//~ data = JSON.stringify(data);
	data = data.toString('utf8');
	var obj = data.split(":");
	console.log('Received: ' + obj);
	if (obj[0] == 'attention' && obj[1] > 50) {
		set_movement(1, 6);
		set_movement(0, 13);
		set_movement(0, 19);
		set_movement(1, 26);
	} else if (obj[0] == 'meditation' && obj[1] > 50) {
		set_movement(0, 6);
		set_movement(1, 13);
		set_movement(1, 19);
		set_movement(0, 26);
	} else {
		set_movement(0, 6);
		set_movement(0, 13);
		set_movement(0, 19);
		set_movement(0, 26);
	}
		
	//~ client.destroy(); // kill client after server's response
});

client.on('close', function() {
	console.log('Connection closed');
});

//~ exec(['ls', '-lha'], function(err, out, code) {
	//~ if (err instanceof Error)
		//~ throw err;
	//~ process.stderr.write(err);
	//~ process.stdout.write(out);
	//~ process.exit(code);
//~ });


function set_movement (v, port) {
	//~ var command = '/home/bluet/rc_car/set_move.sh ' + v + ' > /sys/class/gpio/gpio' + port + '/value';
	//~ console.log(command);
	exec(['/home/bluet/rc_car/set_move.sh', v, port], function(err, out, code) {
		if (err instanceof Error)
			throw err;
		process.stderr.write(err);
		process.stdout.write(out);
		//~ process.exit(code);
	});
}
