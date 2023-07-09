import { WebSocketServer } from 'ws';
import { DataUsers } from '../data-base/data-base.js';


export function startServer() {
  const wss = new WebSocketServer({ port: 3000 });
  const dataUsers = new DataUsers();
  let responseToFront: string;

  wss.on('connection', function connection(ws) {

    ws.on('error', console.error);

    ws.on('message', function message(data: string) {

      const obj = JSON.parse(data);
      const type = obj.type;
      const dataResponse: string = obj.data;

      switch (type) {
        case 'reg':
          const res = dataUsers.regUser(JSON.parse(dataResponse));
          dataUsers.getAllUsers()
          if (res) {ws.send(res)}
          break;
        default:
          console.warn(`Type: ${type} unknown`);
          break;
      }
    });

    ws.send(responseToFront);
  });
}