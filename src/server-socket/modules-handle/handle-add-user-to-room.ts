import WebSocket from "ws";
import { Game, PlayerInGame, Room } from "../../utils/interfaces";

export function handleAddUserInRoom(indexRoom: number, rooms: Room[], name: string, connectionId: number, ws: WebSocket, games: Game[]) {
  const idGame = Math.random();
  const room = rooms.filter(room => room.roomId === indexRoom);
  const roomIndexOf = rooms.findIndex(room => room.roomId === indexRoom);
  const players: PlayerInGame[] = [];

  const idOne = Math.random();
  const idTwo = Math.random();

  players.push({
    name: room[0].roomUsers[0].name,
    idPlayerInGame: idOne,
    socket: room[0].roomUsers[0].socket,
    isTurn: true,
    shipsDot: [],
    ships: []
  });
  players.push({
    name: name,
    idPlayerInGame: idTwo,
    socket: ws,
    isTurn: false,
    shipsDot: [],
    ships: []
  })

  games.push({
    idGame: idGame,
    playersInGame: players
  });

  room[0].roomUsers[0].socket.send(JSON.stringify({
    type: 'create_game',
    data: JSON.stringify({
      idGame: idGame,
      idPlayer: idOne
    }),
    id: 0
  }));

  ws.send(JSON.stringify({
    type: 'create_game',
    data: JSON.stringify({
      idGame: idGame,
      idPlayer: idTwo
    }),
    id: 0
  }));


  rooms.splice(roomIndexOf, 1);
}