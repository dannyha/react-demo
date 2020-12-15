import React from "react";

/**
 * List component
 */
type TypeListContainer = {
  classes?: string;
  title: string;
  children: React.ReactNode;
};

export default function ListContainer(props: TypeListContainer) {
  return (
    <div className={`list-container ${props.classes ? props.classes : ""}`}>
      <div className="list-container__title">{props.title}</div>
      {props.children}
    </div>
  );
}