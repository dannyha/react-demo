import React from "react";

/**
 * Message component
 */
type TypeMessageContainer = {
  classes?: string;
  text: string;
};

export default function MessageContainer(props: TypeMessageContainer) {
  return (
    <div className={`message ${props.classes ? props.classes : ""}`}>
      {props.text}
    </div>
  );
}