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

// export interface DataUser {
//   name: string,
//   password: string,
//   id: number
// }

export interface RegData {
  name: string,
  password: string
}

// export interface UserInRoom {
//   name: string,
//   index: number
// }

// export interface DataRoom {
//   roomId: number,
//   roomUsers: UserInRoom[],
// }