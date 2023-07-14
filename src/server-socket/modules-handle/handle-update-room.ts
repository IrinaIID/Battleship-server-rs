import { DataRoom, DataUser, UserInRoom } from "../../utils/interfaces";

export function handleUpdateRoom(rooms: DataRoom[], waitUsers: DataUser[]) {

  const roomsOneUser = rooms.filter((room) => { room.roomUsers.length === 1 });
  console.log(roomsOneUser)
  if (roomsOneUser.length === 0) {
    const newRoom: DataRoom = {
      roomId: Math.random(),
      roomUsers: [
        {
          name: waitUsers[0].name,
          index: waitUsers[0].id
        }
      ]
    }
    rooms.push(newRoom);
    console.log('rooms')
    console.log(rooms)
    return JSON.stringify({
      type: "update_room",
      data: JSON.stringify([]),
      id: 0,
    });

  } else {

    return JSON.stringify({
    type: "update_room",
    data: JSON.stringify(roomsOneUser),
    id: 0,
  });
  }

}
//   let usersInRoom: UserInRoom[] = [];
//   if( waitUsers.length === 0) {
//     usersInRoom = []
//   } else {
//     usersInRoom.push({
//       name: waitUsers[0].name,
//       index: waitUsers[0].id
//     })
//   }

//   const newRooms = JSON.stringify({
//     type: "update_room",
//     data: JSON.stringify([{
//       roomId: Math.random(),
//       roomUsers: usersInRoom
//     }]),
//     id: 0,
//   })
//   return newRooms
// }