import React from "react";
import { css } from "linaria";

const rootStyle = css`
  font-family: Menlo, monospace;
  margin: 2em 0 1em 0;
  font-weight: normal;
  font-style: italic;
  font-size: 18px;
`;

const Subheading: React.FC = ({ children }) => {
  return <h3 className={rootStyle}>{children}</h3>;
};

export default Subheading;
