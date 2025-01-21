import {io} from 'socket.io-client';

const options = {
  "force new connection": true,
  reconnectionAttempts: "Infinity",
  timeout : 10000, 
  transports : ["websocket"]
}

console.log(window.location.hostname);
let socket;

if (window.location.hostname === 'localhost') {
  socket = io('ws://localhost:3001', options);
}
else {
  socket = io(`ws://${window.location.hostname}:3001`, options);

}

// const socket = io('ws://localhost:3001', options); // TODO: change ws url to correct

export default socket;