import { WebSocketServer } from 'ws';
import { DataRooms, DataUsers } from '../data-base/data-base.js';


export function startServer() {
  const wss = new WebSocketServer({ port: 3000 });
  const dataUsers = new DataUsers();
  const dataRooms = new DataRooms();
  let responseToFront: string;

  wss.on('connection', function connection(ws) {

    ws.on('error', console.error);

    ws.on('message', function message(data: string) {

      const obj = JSON.parse(data);
      const type = obj.type;
      const dataResponse: string = obj.data;
      console.log(`get from front`);
      console.log(obj);


      switch (type) {

        case 'reg':
          const resReg = dataUsers.regUser(JSON.parse(dataResponse));
          if (resReg) ws.send(resReg);
          console.log('send to front')
          console.log(dataRooms.updateRoom(dataUsers.getUsersWait()))
          ws.send(dataRooms.updateRoom(dataUsers.getUsersWait()));
          console.log('send to front')
          console.log(dataUsers.updateWinners())
          ws.send(dataUsers.updateWinners())
          break;

        case 'create_room':
          console.log('send to front')
          console.log(dataRooms.updateRoom(dataUsers.getUsersWait()))
          ws.send(dataRooms.updateRoom(dataUsers.getUsersWait()));

          // dataRooms.createRoom(dataUsers.getUsersWait());
          // ws.send(dataRooms.updateRoom(dataUsers.getUsersWait()));

          break;
        default:
          console.warn(`Type: ${type} unknown`);
          break;
      }
    });

    ws.send(responseToFront);
  });
}