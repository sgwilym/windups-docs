import React from "react";
import { css } from "linaria";

const rootStyle = css`
  font-size: 14px;
  font-family: "Menlo", monospace;
`;

const Paragraph: React.FC = ({ children }) => {
  return <p className={rootStyle}>{children}</p>;
};

export default Paragraph;
