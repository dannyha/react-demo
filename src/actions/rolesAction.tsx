import { Job } from "../Api";

const set = (rolesObj: Job[]) => {
  return {
      type: "SET",
      payload: rolesObj
  }
}

const rolesAction = {
  set
}

export default rolesAction;