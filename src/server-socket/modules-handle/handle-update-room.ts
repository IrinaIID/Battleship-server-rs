import { Room } from "../../utils/interfaces";

export function handleUpdateRoom(rooms: Room[]) {

  const roomsOneUser = rooms.filter(room =>  room.roomUsers.length === 1 );
  const roomsUpdate = roomsOneUser.map(room => {
    return {
      roomId: room.roomId,
      roomUsers: [
        {
          name: room.roomUsers[0].name,
          index: room.roomUsers[0].index
        }
      ]
    }
  }
  )
  return JSON.stringify({
    type: 'update_room',
    data: JSON.stringify(roomsUpdate),
    id: 0
  });
}
