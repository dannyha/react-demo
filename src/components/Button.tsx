import React from "react";

/**
 * Button component
 */
type TypeButton = {
  /** Class modifiers */
  classes?: string;
  /** Handler */
  handler: () => void;
  /** Text */
  text: string;
};

export default function Button(props: TypeButton) {
  return (
    <button
      className={`button ${props.classes ? props.classes : ""}`}
      onClick={props.handler}
    >
      {props.text}
    </button>
  );
}
