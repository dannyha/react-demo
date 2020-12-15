import React from "react";
import { Job, JobAssignment } from "../Api";

/**
 * Component for employee roles
 */
type TypeEmployeeRoles = {
  jobs: JobAssignment[];
  roles: {
    [key: string]: Job;
  };
};

export default function EmployeeRoles(props: TypeEmployeeRoles) {
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