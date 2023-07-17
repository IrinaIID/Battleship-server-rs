import { AttackData, Game } from "../../utils/interfaces";

export function handleAttackData(data: AttackData, games: Game[]) {
  const idGame = data.gameId;
  const indexGame = games.findIndex(game => game.idGame === idGame);
  const thisGame = games[indexGame];

  let indexPlayer = thisGame.playersInGame.findIndex(player => player.idPlayerInGame === data.indexPlayer);
  if (!thisGame.playersInGame[indexPlayer].isTurn) {
    console.log('not your turn')
    return
  }

  const indexPlayerBoard = indexPlayer === 0 ? 1 : 0;

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