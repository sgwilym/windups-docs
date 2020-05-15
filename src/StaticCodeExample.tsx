import React from "react";
import { css } from "linaria";
import { LIGHT_GREY } from "./colours";

const rootStyle = css`
  font: 14px "Menlo", monospace;
  padding: 16px;
  border-radius: 5px;
  box-shadow: 2px 2px 7px rgba(0, 0, 0, 0.05);
  background: ${LIGHT_GREY};
  margin-bottom: 8px;
  white-space: pre;
  line-height: 1.5;
  overflow: auto;
`;

const StaticCodeExample: React.FC = ({ children }) => {
  return <div className={rootStyle}>{children}</div>;
};

export default StaticCodeExample;
