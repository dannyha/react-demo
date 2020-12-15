import { Job } from "../Api";

const set = (rolesObj: Job[]) => {
  return {
      type: "SET",
      payload: rolesObj
  }
}

export default {
  set
}