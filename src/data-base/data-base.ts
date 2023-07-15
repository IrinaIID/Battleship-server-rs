import { WebSocket } from "ws";
import { handleAddUserInRoom } from "../server-socket/modules-handle/handle-add-user-to-room.js";
import { handleCreateRoom } from "../server-socket/modules-handle/handle-create-room.js";
import { handleReg } from "../server-socket/modules-handle/handle-reg.js";
import { handleUpdateRoom } from "../server-socket/modules-handle/handle-update-room.js";
import { handleUpdateWinners } from "../server-socket/modules-handle/handle-update-winners.js";
import { User, Room, Winner, RegData, Game } from "../utils/interfaces";


export class DataBase {
  users: User[];
  userWinners: Winner[];
  rooms: Room[];
  games: Game[];

  constructor() {
    this.users = [];
    this.userWinners = [{
      name: 'winner1',
      wins: 5
    }];
    this.rooms = [];
    this.games = [];
  }

  getAllUsers() {
    return this.users;
  }

  getAllRooms() {
    return this.rooms;
  }

  regUser(data: RegData) {
    return handleReg(data, this.users);
  }

  updateWinners() {
    return handleUpdateWinners(this.userWinners);
  }

  updateRooms() {
    return handleUpdateRoom(this.rooms);
  }

  createRoom(connectionId: number, name: string, ws: WebSocket) {
    handleCreateRoom(connectionId, this.rooms, name, ws);
  }

  addUserToRoom(indexRoom: number, name: string, connectionId: number, ws: WebSocket) {
    handleAddUserInRoom(indexRoom, this.rooms, name, connectionId, ws, this.games);
  }
}