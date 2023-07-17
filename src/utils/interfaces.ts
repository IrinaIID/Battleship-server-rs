import WebSocket from "ws";

export interface User {
  name: string,
  password: string,
  id: number
}

export interface Room {
  roomId: number,
  roomUsers: UserInRoom[],
}

export interface UserInRoom {
  name: string,
  index: number,
  socket: WebSocket;
}

export interface Winner {
  name: string,
  wins: number
}

export interface Game {
  idGame: number,
  playersInGame: PlayerInGame[]
}

export interface PlayerInGame {
  name: string,
  idPlayerInGame: number,
  socket: WebSocket,
  isTurn: boolean,
  shipsDot: OneShip[],
  ships: ShipsData[]
}

export interface RegData {
  name: string,
  password: string
}

export interface AddShipsData {
  gameId: number,
  ships: ShipsData[]
  indexPlayer: number,
}

export interface ShipsData {
  position: {
    x: number,
    y: number
  },
  direction: boolean,
  length: number,
  type: "small"|"medium"|"large"|"huge"
}

export interface OneShip {
  [index: number]: ShipsDotData
}

export interface ShipsDotData {
  x: number,
  y: number
}

export interface AttackData {
  gameId: number,
  x: number,
  y: number,
  indexPlayer: number,
}