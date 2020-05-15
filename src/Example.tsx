import React, { useContext } from "react";
import { css } from "linaria";
import { DialogChildContext } from "./Dialog";

const rootStyle = css`
  font: 16px "Menlo", monospace;
  padding: 16px;
  border: 2px solid #e6e6e6;
  border-radius: 5px;
  box-shadow: 2px 2px 7px rgba(0, 0, 0, 0.05);
  margin-bottom: 16px;
`;

const Example: React.FC = ({ children }) => {
  const { proceed, ...rest } = useContext(DialogChildContext);

  return (
    <DialogChildContext.Provider
      value={{
        proceed: () => {
          setTimeout(() => {
            proceed();
          }, 500);
        },
        ...rest
      }}
    >
      <div className={rootStyle}>{children}</div>
    </DialogChildContext.Provider>
  );
};

export default Example;
