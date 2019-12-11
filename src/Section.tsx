import React, { useState } from "react";
import { css, cx } from "linaria";

const headingStyle = css`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid black;
  font-family: sans-serif;
  font-size: 16pt;
`;

const dialogRoot = css`
  margin: 1em 0;
`;

type SectionProps = {
  title: string;
};

const Section: React.FC<SectionProps> = ({ title, children }) => {
  const [pressedPlay, setPressedPlay] = useState(false);

  return (
    <>
      <div className={headingStyle}>
        <h2>{title}</h2>
        {!pressedPlay && (
          <button onClick={() => setPressedPlay(true)}>►</button>
        )}
      </div>

      {pressedPlay && <div className={dialogRoot}>{children}</div>}
    </>
  );
};

export default Section;
