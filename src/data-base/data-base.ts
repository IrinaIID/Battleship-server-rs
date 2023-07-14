import { handleReg } from "../server-socket/modules-handle/handle-reg.js";
import { handleUpdateRoom } from "../server-socket/modules-handle/handle-update-room.js";
import { DataRoom, DataUser, RegData } from "../utils/interfaces";


export class DataUsers {
  users: DataUser[] | [];
  usersWaitList: DataUser[] | [];
  usersWinners: DataUser[] | [];

  constructor() {
    this.users = [];
    this.usersWaitList = []
    this.usersWinners = []
  }

  getUsersWait() {
    return this.usersWaitList;
  }

  getAllUsers() {
    return this.users;
  }

  regUser(data: RegData) {
    return handleReg(data, this.users, this.usersWaitList);
  }

  updateWinners() {
    return JSON.stringify({
      type: "update_winners",
      data:
          JSON.stringify([
            {
              name: '1yyy',
              wins: 2,
            }
          ]),
      id: 0,
    })
  }

}


export class DataRooms {
  rooms: DataRoom[];
  // maxUsers: number

  constructor() {
    this.rooms = [];
    // this.maxUsers = 2
  }

  createRoom(usersWaitList: DataUser[]) {
    const newRoom: DataRoom = {
      roomId: Math.random(),
      roomUsers: [{
        name: usersWaitList[0].name,
        index: this.rooms.length,
      }]
    }
    this.rooms.push(newRoom);
  }

  updateRoom(waitUsers: DataUser[]) {
    // console.log(handleUpdateRoom(this.rooms))
    return handleUpdateRoom(this.rooms, waitUsers);

  }

}