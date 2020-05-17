import React, { useState, useContext } from "react";
import { css, cx } from "linaria";
import SectionFocusContext from "./SectionFocusContext";
import { SubGrid, Indent1 } from "./App";
import { GREEN } from "./colours";

const dialogRoot = css`
  margin: 1em 0 10em 0;
`;

const headingRootStyle = css`
  grid-column: 2/9;
  display: flex;
  align-items: center;
  padding: 0;
  border: none;
  font-size: 1em;
  border-bottom: 2px solid black;
  padding: 0 0 8px 0;
  margin: 0 0 1em 0;
  background: none;
  justify-content: space-between;
`;

const activeHeadingStyle = css`
  border-bottom-color: ${GREEN};
`;

const headingStyle = css`
  font-family: "Menlo", monospace;
  font-size: 1.2em;
  font-weight: normal;
  font-style: italic;
  margin: 0 0 0 0.3em;
`;

const playButtonStyle = css`
  font-size: 2em;
  width: 1.3em;
  height: 1.3em;
  color: white;
  background-color: ${GREEN};
  border-radius: 50%;
  padding: 2px 0 0 2px
  text-align: center;
`;

export const SectionContext = React.createContext({
  id: "",
  isActive: false,
});

type SectionProps = {
  title: string;
  id: string;
  alt?: boolean;
};

const Section: React.FC<SectionProps> = ({ id, title, children, alt }) => {
  const [pressedPlay, setPressedPlay] = useState(false);
  const { setActiveSectionID, activeSectionID } = useContext(
    SectionFocusContext
  );
  const isActive = activeSectionID === id;

  const SectionHeading = () => {
    return <h3 className={headingStyle}>{title}</h3>;
  };

  return (
    <SectionContext.Provider value={{ id, isActive }}>
      <SubGrid>
        <button
          className={cx(headingRootStyle, isActive && activeHeadingStyle)}
          onClick={() => {
            if (!pressedPlay) {
              setPressedPlay(true);
              setActiveSectionID(id);
            }
          }}
        >
          <SectionHeading />
          {!pressedPlay && <div className={playButtonStyle}>{"▶"}</div>}
        </button>
        <div id={id} />
        {pressedPlay && (
          <Indent1>
            <div className={dialogRoot}>{children}</div>
          </Indent1>
        )}
      </SubGrid>
    </SectionContext.Provider>
  );
};

export default Section;
