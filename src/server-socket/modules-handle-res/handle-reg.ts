import { DataUser, RegData } from "../../utils/interfaces";

export function handleReg(data: RegData, users: DataUser[]) {
  console.log(data);
  const index = users.findIndex((user: DataUser) => user.name === data.name);

  if (index < 0) {
    const newUser: DataUser = {
      name: data.name,
      password: data.password,
      id: 0
    }
    users.push(newUser);
    return JSON.stringify({
      type: "reg",
      data: JSON.stringify({
        name: data.name,
        index: 0,
        error: false,
        errorText: ''
      }),
      id: 0
    });

  } else if (index >= 0 && users[index].password === data.password) {
    return JSON.stringify({
      type: "reg",
      data: JSON.stringify({
        name: data.name,
        index: index,
        error: false,
        errorText: ''
      }),
      id: 0
    });
  } else {
    return JSON.stringify({
      type: "reg",
      data: JSON.stringify({
        name: data.name,
        index: index,
        error: true,
        errorText: 'incorrect password'
      }),
      id: 0
    });
  }

}