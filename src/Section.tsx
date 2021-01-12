import React, { useState, useContext } from "react";
import { css, cx } from "linaria";
import SectionFocusContext from "./SectionFocusContext";
import { SubGrid, Indent1 } from "./App";
import { GREEN, PINK } from "./colours";
import { useWindupString, CharWrapper } from "windups";
import { useLocation } from "react-router";
import { HeadingChar } from "./Heading";

const dialogRoot = css`
  margin: 1em 0 10em 0;
`;

const headingRootStyle = css`
  grid-column: 2/8;
  display: flex;
  align-items: center;
  padding: 0;
  border: none;
  font-size: 1em;
  height: 48px;
  border-bottom: 2px solid black;
  padding: 0 0 8px 0;
  margin: 0 0 1em 0;
  background: none;
  justify-content: space-between;
  &:focus {
    color: ${GREEN};
  }
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
  text-align: left;
  white-space: pre;
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
  box-shadow: 2px 2px 7px rgba(0, 0, 0, 0.05);
`;

const skipButtonStyle = css`
font-size: 2em;
width: 2em;
height: 1.3em;
color: white;
background-color: ${PINK};
letter-spacing: -5px;
border-radius: 1.3em;
padding: 2px 0 0 0
text-align: center;
box-shadow: 2px 2px 7px rgba(0, 0, 0, 0.05);
`;

export const SectionContext = React.createContext({
  id: "",
  isActive: true,
  hasSkipped: false,
});

type SectionProps = {
  title: string;
  id: string;
  alt?: boolean;
};

const SectionHeading: React.FC<{ id: string; title: string }> = ({
  title,
  id,
}) => {
  const { hash } = useLocation();
  const isHashLinked = hash === `#${id}`;
  const [titleWindup] = useWindupString(title, { skipped: !isHashLinked });

  return (
    <h3 className={headingStyle}>
      <CharWrapper element={isHashLinked ? HeadingChar : React.Fragment}>
        {titleWindup}
      </CharWrapper>
    </h3>
  );
};

const Section: React.FC<SectionProps> = ({ id, title, children, alt }) => {
  const [pressedPlay, setPressedPlay] = useState(false);
  const [hasSkipped, setHasSkipped] = useState(false);
  const { setActiveSectionID, activeSectionID } = useContext(
    SectionFocusContext
  );
  const isActive = activeSectionID === id;

  return (
    <SectionContext.Provider value={{ id, isActive, hasSkipped }}>
      <SubGrid>
        <button
          className={cx(headingRootStyle, isActive && activeHeadingStyle)}
          onClick={() => {
            if (!pressedPlay) {
              setPressedPlay(true);
            }

            if (pressedPlay && !hasSkipped) {
              setHasSkipped(true);
            }

            setActiveSectionID(id);
          }}
        >
          <SectionHeading title={title} id={id} />
          {!pressedPlay ? (
            <div aria-hidden className={playButtonStyle}>
              {"▶"}
            </div>
          ) : !hasSkipped ? (
            <div aria-hidden className={skipButtonStyle}>
              {"▶▶"}
            </div>
          ) : null}
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
