import React from "react";

/**
 * Card container component
 */
type TypeCardContainer = {
  classes?: string;
  children: React.ReactNode;
};

export default function CardContainer(props: TypeCardContainer) {
  return (
    <div className={`card-container ${props.classes ? props.classes : ""}`}>
      {props.children}
    </div>
  );
}