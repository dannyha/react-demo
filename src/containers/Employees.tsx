import React, { useReducer, useEffect, useMemo, useCallback, useRef } from "react";

import { Job, Employee } from "../Api";
import CardContainer from '../components/Card';
import MessageContainer from '../components/Message';
import ButtonGlobal from '../components/Button';
import ListContainer from '../components/List';
import EmployeeDetails from '../components/EmployeeDetails';
import EmployeeRoles from '../components/EmployeeRoles';

import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { useDispatch } from 'react-redux';
import allActions from '../actions';

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

function Employees() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const _isMounted = useRef(true); // Initial value _isMounted = true

  const dispatchGlobal = useDispatch();

  const client = useMemo(() => {
      return new ApolloClient({
        uri: 'https://dannyha.hasura.app/v1/graphql',
        cache: new InMemoryCache()
      });
    }, []
  );

  //Makes a Roles request and update roles state
  const requestJobs = useCallback(() => {
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
        if (_isMounted.current) {
          dispatch({ type: "setRoles", payload: res.data.jobs });
          dispatchGlobal(allActions.rolesAction.set(res.data.jobs))
        }
      })
      .catch(e => {
        if (_isMounted.current) {
          dispatch({ type: "setError", payload: "Error getting employees" });
        }
      });
    }, [client, dispatchGlobal]
  );

  useEffect(() => {
    requestJobs();
    return () => { // ComponentWillUnmount in Class Component
      _isMounted.current = false;
    }
  }, [requestJobs]);

  //Makes an Employees request and update employees state
  const requestEmployees = () => {
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
    <div className="Employees-Container">
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

export default Employees;