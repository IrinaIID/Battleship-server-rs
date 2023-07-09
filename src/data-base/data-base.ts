import { handleReg } from "../server-socket/modules-handle-res/handle-reg.js";
import { DataUser, RegData } from "../utils/interfaces";


export const dataBase: DataUser[] | [] = [];

export class DataUsers {
  users: DataUser[] | [];

  constructor() {
    this.users = [];
  }

  getAllUsers() {
    console.log(this.users);
  }

  regUser(data: RegData) {
    return handleReg(data, this.users);
  }
}