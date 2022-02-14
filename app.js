const Gpio = require('onoff').Gpio;
const delay = 10;
const relay1 = new Gpio(26, 'out', {
  activeLow: true
});
relay1.writeSync(0);
const relay2 = new Gpio(20, 'out', {
  activeLow: true
});
relay2.writeSync(0);
const relay3 = new Gpio(21, 'out', {
  activeLow: true
});
relay3.writeSync(0);

const io = require('socket.io-client');
const socket_key1 = '14jUnSD_oaf8p2It0';
const socket_key2 = '09oL_3wZjF_387H12';
const socket_key3 = '';
const socket_gate1 = io('http://193.176.242.201:8080/gates', {
  query: { key: socket_key1 }
});
const socket_gate2 = io('http://193.176.242.201:8080/gates', {
  query: { key: socket_key2 }
});
const socket_gate3 = io('http://193.176.242.201:8080/gates', {
  query: { key: socket_key3 }
});

socket_gate1.on('connect', () => {
  console.log('Gate #1 connected.');
  socket_gate1.on('entranceRequest', ({ account, meeting, allowed }) => {
    console.log('--------------- Gate #1 ---------------');
    console.log(new Date());
    console.log('Account:\n', account);
    console.log('Meeting:\n', meeting);
    console.log('Allowed:\n', allowed);
    if (allowed) {
		relay1.writeSync(1);
		setTimeout(() => {
			relay1.writeSync(0);
			relay2.writeSync(1);
			setTimeout(() => {
				relay2.writeSync(0);
		   	}, delay);
       	}, delay);
    }
  });
  socket_gate1.on('reconnecting', () => {
    console.log('Gate #1 reconnecting...');
  });
});

socket_gate2.on('connect', () => {
  console.log('Gate #2 connected.');
  socket_gate2.on('entranceRequest', ({ account, meeting, allowed }) => {
    console.log('--------------- Gate #2 ---------------');
    console.log(new Date());
    console.log('Account:\n', account);
    console.log('Meeting:\n', meeting);
    console.log('Allowed:\n', allowed);
    if (allowed) {
		relay1.writeSync(1);
		setTimeout(() => {
			relay1.writeSync(0);
			relay2.writeSync(1);
			setTimeout(() => {
				relay2.writeSync(0);
		   	}, delay);
       	}, delay);
    }
  });
  socket_gate2.on('reconnecting', () => {
    console.log('Gate #2 reconnecting...');
  });
});

socket_gate3.on('connect', () => {
  console.log('Gate #3 connected.');
  socket_gate3.on('entranceRequest', ({ account, meeting, allowed }) => {
    console.log('--------------- Gate #3 ---------------');
    console.log(new Date());
    console.log('Account:\n', account);
    console.log('Meeting:\n', meeting);
    console.log('Allowed:\n', allowed);
    if (allowed) {
		relay1.writeSync(1);
		setTimeout(() => {
			relay1.writeSync(0);
			relay2.writeSync(1);
			setTimeout(() => {
				relay2.writeSync(0);
		   	}, delay);
       	}, delay);
    }
  });
  socket_gate3.on('reconnecting', () => {
    //console.log('Gate #3 reconnecting...');
  });
});

process.on('SIGINT', () => {
  relay1.writeSync(0);
  relay1.unexport();
  relay2.writeSync(0);
  relay2.unexport();
  relay3.writeSync(0);
  relay3.unexport();
  process.exit();
});
