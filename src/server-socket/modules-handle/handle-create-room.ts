import { WebSocket } from "ws";
import { Room } from "../../utils/interfaces";

export function handleCreateRoom(connectionId: number, rooms: Room[], name: string, ws: WebSocket) {
  console.log('00000000000000');
  console.log(rooms)
  let isNeedCreate = true;

  rooms.forEach(room => {
    room.roomUsers.forEach(user => {
      if(user.index === connectionId && user.index === connectionId) {
        isNeedCreate = false;
      }
    });
  });

  if (isNeedCreate) {
    const newRoom = {
      roomId: Math.random(),
      roomUsers: [
        {
          name: name,
          index: connectionId,
          socket: ws
        }
      ]
    }
    rooms.push(newRoom)
  }
}