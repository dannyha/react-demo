import React from "react";

/**
 * Card container component
 */
type TypeCard = {
  /** Class modifiers */
  classes?: string;
  /** Children components */
  children: React.ReactNode;
};

export default function Card(props: TypeCard) {
  return (
    <div className={`card-container ${props.classes ? props.classes : ""}`}>
      {props.children}
    </div>
  );
}