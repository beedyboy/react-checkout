import React, { ReactNode } from "react";
import "./container.scss";

interface ContainerProps {
  children: ReactNode;
}

const Container = ({ children }: ContainerProps): JSX.Element => {
  return (
    <div className="container">
      <div className="container-child">{children}</div>
    </div>
  );
};

export default Container;
