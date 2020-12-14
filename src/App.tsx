import React, { useReducer, useEffect, useMemo, useCallback } from "react";
import './App.css';

import { Job, Employee } from "./Api";

import CardContainer from './components/card';
import MessageContainer from './components/message';
import ButtonGlobal from './components/button';
import ListContainer from './components/list';
import EmployeeDetails from './components/employee-details';
import EmployeeRoles from './components/employee-roles';

import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

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

  const client = useMemo(() => {
      return new ApolloClient({
        uri: 'https://dannyha.hasura.app/v1/graphql',
        cache: new InMemoryCache()
      });
    }, []
  );

  //Makes a Roles request and update roles state
  const requestJobs = useCallback(() => {
      // // STATIC DATA
      // API
      //   .getAllJobs()
      //   .then(res => {
      //     console.log(res)
      //     dispatch({ type: "setRoles", payload: res });
      //   })
      //   .catch(e => {
      //     dispatch({ type: "setError", payload: "Error getting roles" });
      //   });

      // GQL
      client
      .query({
        query: gql`
          query ReactDemo {
            jobs {
              name
              id
            }
          }
        `
      })
      .then(res => {
        dispatch({ type: "setRoles", payload: res.data.jobs });
      })
      .catch(e => {
        dispatch({ type: "setError", payload: "Error getting employees" });
      });
    }, [client]
  );

  useEffect(() => {
    requestJobs();
  }, [requestJobs]);

  //Makes an Employees request and update employees state
  const requestEmployees = () => {

    // STATIC DATA
    // API 
    //   .getAllEmployees()
    //   .then(res => {
    //     dispatch({ type: "setEmployees", payload: res });
    //   })
    //   .catch(e => {
    //     dispatch({ type: "setError", payload: "Error getting employees" });
    //   });

    // GQL
    client
    .query({
      query: gql`
        query ReactDemo {
          employees {
            birthYear
            firstName
            lastName
            location
            jobAssignments {
              startYear
              jobId
              endYear
            }
          }
        }
      `
    })
    .then(res => {
      dispatch({ type: "setEmployees", payload: res.data.employees });
    })
    .catch(e => {
      dispatch({ type: "setError", payload: "Error getting employees" });
    });

  };

  return (
    <div className="App">
      <h1>Danny</h1>
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