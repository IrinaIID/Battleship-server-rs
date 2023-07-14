import { WebSocketServer } from 'ws';
import { DataBase } from '../data-base/data-base.js';
// import { v4 as uuidv4 } from 'uuid';

export function startServer() {
  const wss = new WebSocketServer({ port: 3000 });
  const db = new DataBase();

  wss.on('connection', function connection(ws) {
    const connectionId = Math.random();
    let name = '';

    ws.on('error', console.error);

    ws.on('message', function message(data: string) {

      const type = JSON.parse(data).type;
      let dataFromFront;
      console.log('<---- front')

      switch (type) {

        case 'reg':
          dataFromFront = JSON.parse(JSON.parse(data).data);
          const resReg = db.regUser(dataFromFront);
          if (resReg) {
            ws.send(resReg);
            name = dataFromFront.name;
          }
          ws.send(db.updateWinners());
          ws.send(db.updateRooms());
          console.log('--------> front')
          console.log(name)
          console.log(resReg)
          console.log(db.updateWinners())
          console.log(db.updateRooms())
          // ws.send(dataRooms.updateRoom(dataUsers.getUsersWait()));
          // console.log('send to front')
          // console.log(dataUsers.updateWinners())
          // ws.send(dataUsers.updateWinners())
          break;

        case 'create_room':
          db.createRoom(connectionId, name, ws);
          console.log('send to front');
          ws.send(db.updateRooms());
          console.log(db.updateRooms())
          // console.log(dataRooms.updateRoom(dataUsers.getUsersWait()))
          // ws.send(dataRooms.updateRoom(dataUsers.getUsersWait()));

          // dataRooms.createRoom(dataUsers.getUsersWait());
          // ws.send(dataRooms.updateRoom(dataUsers.getUsersWait()));
          break;
        case 'add_user_to_room':
          dataFromFront = JSON.parse(JSON.parse(data).data);
          console.log(dataFromFront)
        default:
          console.warn(`Type: ${type} unknown`);
          break;
      }
    });

    // ws.send();
  });
}