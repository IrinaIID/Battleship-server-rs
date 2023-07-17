import { User, RegData } from "../../utils/interfaces";

export function handleReg(data: RegData, users: User[]) {
  const index = users.findIndex((user: User) => user.name === data.name);

  if (index < 0) {
    const newUser: User = {
      name: data.name,
      password: data.password,
      id: Math.random()
    }
    users.push(newUser);
    return JSON.stringify({
      type: "reg",
      data: JSON.stringify({
        name: data.name,
        index: newUser.id,
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
        index: users[index].id,
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
        index: users[index].id,
        error: true,
        errorText: 'incorrect password'
      }),
      id: 0
    });
  }
}