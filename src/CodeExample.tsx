import React, { useContext } from "react";
import { DialogChildContext } from "./Dialog";
import { WindupChildren, Pace } from "windups";
import { css } from "linaria";
import { GREEN } from "./colours";
import { NextListener } from "./DialogElement";

const rootStyle = css`
  font: 16px "Menlo", monospace;
  padding: 16px;
  border: 2px solid #e6e6e6;
  border-radius: 5px;
  box-shadow: 2px 2px 7px rgba(0, 0, 0, 0.05);
  margin-bottom: 16px;
  white-space: pre;
  color: ${GREEN};
  background-color: black;
  line-height: 1.5;
  overflow: auto;
`;

function randomInt(max: number) {
  return Math.floor(Math.random() * Math.floor(max));
}

const CodeExample: React.FC = ({ children }) => {
  const { proceed } = useContext(DialogChildContext);

  return (
    <div className={rootStyle}>
      <WindupChildren
        onFinished={() => {
          setTimeout(() => {
            proceed();
          }, 500);
        }}
      >
        <NextListener />
        <Pace
          getPace={char => {
            if (char === "\n") {
              return 200;
            }
            return randomInt(80);
          }}
        >
          {children}
        </Pace>
      </WindupChildren>
    </div>
  );
};

export default CodeExample;
