import React, { useReducer, useEffect } from "react";
import api, { Job, JobAssignment, Employee } from "./Api";
import './App.css';

/**
 * Card container component
 */
type TypeCardContainer = {
  classes?: string;
  children: React.ReactNode;
};
function CardContainer(props: TypeCardContainer) {
  return (
    <div className={`card-container ${props.classes ? props.classes : ""}`}>
      {props.children}
    </div>
  );
}

/**
 * Message component
 */
type TypeMessageContainer = {
  classes?: string;
  text: string;
};
function MessageContainer(props: TypeMessageContainer) {
  return (
    <div className={`message ${props.classes ? props.classes : ""}`}>
      {props.text}
    </div>
  );
}

/**
 * Button component
 */
type TypeButtonGlobal = {
  classes?: string;
  handler: () => void;
  text: string;
};
function ButtonGlobal(props: TypeButtonGlobal) {
  return (
    <button
      className={`button ${props.classes ? props.classes : ""}`}
      onClick={props.handler}
    >
      {props.text}
    </button>
  );
}

/**
 * List component
 */
type TypeListContainer = {
  classes?: string;
  title: string;
  children: React.ReactNode;
};
function ListContainer(props: TypeListContainer) {
  return (
    <div className={`list-container ${props.classes ? props.classes : ""}`}>
      <div className="list-container__title">{props.title}</div>
      {props.children}
    </div>
  );
}

/**
 * Component for employee info
 */
type TypeEmployeeDetails = {
  data: Employee;
};
function EmployeeDetails(props: TypeEmployeeDetails) {
  return (
    <div className="employee-info">
      <div className="employee-info__name">
        {props.data.firstName} {props.data.lastName}
      </div>
      <div className="employee-info__location">{props.data.location}</div>
    </div>
  );
}

/**
 * Component for employee roles
 */
type TypeEmployeeRoles = {
  jobs: JobAssignment[];
  roles: {
    [key: string]: Job;
  };
};
function EmployeeRoles(props: TypeEmployeeRoles) {
  return (
    <ul className="employee-roles__list">
      {props.jobs.map((job, key) => (
        <li className="employee-roles__role" key={key}>
          <span className="employee-roles__tenure">
            {job.startYear}-{job.endYear ? job.endYear : "Present"}
          </span>{" "}
          –{" "}
          <span className="employee-roles__position">
            {//Could get prop to trigger roles request
            props.roles[job.jobId]
              ? props.roles[job.jobId].name
              : "Not Available"}
          </span>
        </li>
      ))}
    </ul>
  );
}

/**
 * Application State
 */
type State = {
  roles: {
    [key: string]: Job;
  };
  rolesDefault: Job[];
  employees: Employee[];
  employeeSet: boolean;
  error: string;
};

const initialState = {
  roles: {},
  rolesDefault: [],
  employees: [],
  employeeSet: false,
  error: ""
};

type Action =
  | { type: "setRoles"; payload: State['rolesDefault'] }
  | { type: "setEmployees"; payload: State['employees'] }
  | { type: "setError"; payload: State['error'] };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "setRoles":
      const jobs: State['roles'] = {};
      const jobsDefault = action.payload;
      jobsDefault.map((e) => {
        return jobs[e.id] = e;
      });
      return {
        ...state,
        rolesDefault: jobsDefault,
        roles: jobs,
        error: ""
      };
    case "setEmployees":
      return {
        ...state,
        employees: action.payload,
        employeeSet: true,
        error: ""
      };
    case "setError":
      return {
        ...state,
        error: action.payload
      };
    default:
      throw new Error();
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  //Makes a Roles request and update roles state
  const requestJobs = () => {
    api
      .getAllJobs()
      .then(res => {
        dispatch({ type: "setRoles", payload: res });
      })
      .catch(e => {
        dispatch({ type: "setError", payload: "Error getting roles" });
      });
  };

  useEffect(() => {
    requestJobs();
  }, []);

  //Makes an Employees request and update employees state
  const requestEmployees = () => {
    api
      .getAllEmployees()
      .then(res => {
        dispatch({ type: "setEmployees", payload: res });
      })
      .catch(e => {
        dispatch({ type: "setError", payload: "Error getting employees" });
      });
  };

  return (
    <div className="App">
      <ButtonGlobal handler={requestEmployees} text="Get Employees" />
      {state.error && (
        <MessageContainer classes="message--error" text={state.error} />
      )}
      {state.employees.length > 0 &&
        state.employees.map((emp, key) => (
          <CardContainer classes="employee-card" key={key}>
            <EmployeeDetails data={emp} />
            {state.rolesDefault.length > 0 && emp.jobAssignments.length > 0 ? (
              <ListContainer title="Job Assignments" classes="employee-roles">
                <EmployeeRoles jobs={emp.jobAssignments} roles={state.roles} />
              </ListContainer>
            ) : (
              <MessageContainer
                classes="message--warning"
                text="Job Assignments unavailable"
              />
            )}
          </CardContainer>
        ))}
      {state.employeeSet && state.employees.length === 0 && (
        <MessageContainer
          classes="message--warning"
          text="There are no Employees"
        />
      )}
    </div>
  );
}

export default App;