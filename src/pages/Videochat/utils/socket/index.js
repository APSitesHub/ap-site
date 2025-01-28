import {io} from 'socket.io-client';

const options = {
  "force new connection": true,
  reconnectionAttempts: "Infinity",
  timeout : 10000, 
  transports : ["websocket"]
}

const socket = io(`wss://ap-server-8qi1.onrender.com`, options);
// const socket = io(`ws://localhost:3001`, options);

export default socket;
