import React from "react";

/**
 * Message component
 */
type TypeMessage = {
  /** Class modifiers */
  classes?: string;
  /** Text */
  text: string;
};

export default function Message(props: TypeMessage) {
  return (
    <div className={`message ${props.classes ? props.classes : ""}`}>
      {props.text}
    </div>
  );
}