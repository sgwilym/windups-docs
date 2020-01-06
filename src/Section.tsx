import React, { useState, useContext } from "react";
import { css } from "linaria";
import { SectionFocusContext } from "./App";

const headingStyle = css`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid black;
  font-family: sans-serif;
  font-size: 16pt;
`;

const dialogRoot = css`
  margin: 1em 0 5em 0;
`;

export const SectionContext = React.createContext({
  id: "",
  isActive: false
});

type SectionProps = {
  title: string;
};

const Section: React.FC<SectionProps> = ({ title, children }) => {
  const [pressedPlay, setPressedPlay] = useState(false);
  const { setActiveSectionID, activeSectionID } = useContext(
    SectionFocusContext
  );

  return (
    <SectionContext.Provider
      value={{ id: title, isActive: activeSectionID === title }}
    >
      <div className={headingStyle}>
        <h2>{title}</h2>
        {!pressedPlay && (
          <button
            onClick={() => {
              setPressedPlay(true);
              setActiveSectionID(title);
            }}
          >
            ►
          </button>
        )}
      </div>
      {pressedPlay && <div className={dialogRoot}>{children}</div>}
    </SectionContext.Provider>
  );
};

export default Section;
