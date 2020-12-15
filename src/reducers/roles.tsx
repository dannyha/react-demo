import { Job } from "../Api";

type State = {
  roles: {
    [key: string]: Job;
  };
  rolesDefault: Job[];
};

const initialState = {
  roles: {},
  rolesDefault: [],
};

type Action = { type: "SET"; payload: State['rolesDefault'] };

const roles = (state: State = initialState, action: Action) => {
  switch(action.type){
    case "SET":
      const jobs: State['roles'] = {};
      const jobsDefault = action.payload;
      jobsDefault.map((e) => {
        return jobs[e.id] = e;
      });
      return {
        ...state,
        rolesDefault: jobsDefault,
        roles: jobs
      };
    default:
      return state
  }
}

export default roles;