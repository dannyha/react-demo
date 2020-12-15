import React from "react";

/**
 * Button component
 */
type TypeButtonGlobal = {
  classes?: string;
  handler: () => void;
  text: string;
};

export default function ButtonGlobal(props: TypeButtonGlobal) {
  return (
    <button
      className={`button ${props.classes ? props.classes : ""}`}
      onClick={props.handler}
    >
      {props.text}
    </button>
  );
}
