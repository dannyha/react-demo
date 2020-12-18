import React from "react";

/**
 * List component
 */
type TypeList = {
  /** Class modifiers */
  classes?: string;
  /** Title */
  title: string;
  /** Children component */
  children: React.ReactNode;
};

export default function List(props: TypeList) {
  return (
    <div className={`list-container ${props.classes ? props.classes : ""}`}>
      <div className="list-container__title">{props.title}</div>
      {props.children}
    </div>
  );
}