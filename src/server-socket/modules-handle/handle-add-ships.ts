import { AddShipsData, Game, OneShip, ShipsDotData } from "../../utils/interfaces";

export function handleAddShips(data: AddShipsData, games: Game[]) {
  const idGame = data.gameId;
  const indexGame = games.findIndex(game => game.idGame === idGame);

  const arrShipsDot: OneShip[] = [];

  data.ships.forEach(ship => {
    const oneShip: ShipsDotData[] = [];
    if (ship.direction === false) {
      for (let i = 0; i < ship.length; i++) {
        oneShip.push({
          x: ship.position.x + i,
          y: ship.position.y
        });
      }
    }
    if (ship.direction === true) {
      for (let i = 0; i < ship.length; i++) {
        oneShip.push({
          x: ship.position.x,
          y: ship.position.y + i
        });
      }
    }
    arrShipsDot.push(oneShip);
  });

  if (games[indexGame].playersInGame[0].idPlayerInGame === data.indexPlayer) {
    games[indexGame].playersInGame[0].ships = data.ships;
    games[indexGame].playersInGame[0].shipsDot = arrShipsDot;
  }
  if (games[indexGame].playersInGame[1].idPlayerInGame === data.indexPlayer) {
    games[indexGame].playersInGame[1].ships = data.ships;
    games[indexGame].playersInGame[1].shipsDot = arrShipsDot;
  }

  if (games[indexGame].playersInGame[0].ships.length > 0 &&
  games[indexGame].playersInGame[1].ships.length > 0) {

    games[indexGame].playersInGame.forEach(player => {
      player.socket.send(JSON.stringify({
        type: 'start_game',
        data: JSON.stringify({
          ships: player.ships,
          currentPlayerIndex: player.idPlayerInGame
        }),
        id: 0
      }));
    });

    games[indexGame].playersInGame[0].socket.send(JSON.stringify({
      type: 'turn',
      data: JSON.stringify({
        currentPlayer: games[indexGame].playersInGame[0].idPlayerInGame
      }),
      id: 0
    }));

    games[indexGame].playersInGame[1].socket.send(JSON.stringify({
      type: 'turn',
      data: JSON.stringify({
        currentPlayer: games[indexGame].playersInGame[0].idPlayerInGame
      }),
      id: 0
    }));

  }

}

// interface Game {
//   idGame: number,
//   playersInGame: PlayerInGame[]
// }

// interface PlayerInGame {
//   name: string,
//   idPlayerInGame: number,
//   socket: WebSocket,
//   isTurn: boolean,
//   shipsDot: [],
//   ships: []
// }