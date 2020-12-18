import React from "react";
import { Employee } from "../Api";

/**
 * Component for employee info
 */
type TypeEmployeeDetails = {
  /** Employee object */
  data: Employee;
};

export default function EmployeeDetails(props: TypeEmployeeDetails) {
  return (
    <div className="employee-info">
      <div className="employee-info__name">
        {props.data.firstName} {props.data.lastName}
      </div>
      <div className="employee-info__location">{props.data.location}</div>
    </div>
  );
}