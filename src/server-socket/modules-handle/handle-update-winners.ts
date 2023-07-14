import { Winner } from "../../utils/interfaces";

export function handleUpdateWinners(userWinners: Winner[]) {
  return JSON.stringify({
    type: "update_winners",
    data: JSON.stringify(userWinners),
    id: 0,
  })
}