import React from "react";
import { css } from "linaria";

const rootStyle = css`
  font-family: sans-serif;
  margin: 2em 0 1em 0;
  padding: 0 0 1em 0;
  border-bottom: 1px solid black;
`;

const Subheading: React.FC = ({ children }) => {
  return <h3 className={rootStyle}>{children}</h3>;
};

export default Subheading;
