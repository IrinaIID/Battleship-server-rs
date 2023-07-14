export interface DataUser {
  name: string,
  password: string,
  id: number
}

export interface RegData {
  name: string,
  password: string
}

export interface UserInRoom {
  name: string,
  index: number
}

export interface DataRoom {
  roomId: number,
  roomUsers: UserInRoom[],
}