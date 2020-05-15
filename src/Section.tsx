import React, { useState, useContext } from "react";
import { css, cx } from "linaria";
import SectionFocusContext from "./SectionFocusContext";
import { SubGrid, Indent1 } from "./App";
import { SpeechBubbleA, SpeechBubbleB } from "./content/Chat";

const dialogRoot = css`
  margin: 1em 0 5em 0;
`;

const headingStyle = css`
  grid-column: 1/9;
  margin: 32px 0 24px 0;
  transform-origin: 0% 50%;
`;

const unpressedStyle = css`
  cursor: pointer;
  transition: all 200ms;
  &:hover {
    transform: scale(1.03);
  }
`;

const pressedStyle = css`
  filter: grayscale(80%);
`;

export const SectionContext = React.createContext({
  id: "",
  isActive: false
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

  const SectionHeading = () => {
    const props = {
      text: title,
      skipped: true
    };

    return alt ? <SpeechBubbleB {...props} /> : <SpeechBubbleA {...props} />;
  };

  return (
    <SectionContext.Provider value={{ id, isActive: activeSectionID === id }}>
      <SubGrid>
        <div
          className={cx(
            headingStyle,
            pressedPlay ? pressedStyle : unpressedStyle
          )}
          role={"button"}
          tabIndex={0}
          onClick={() => {
            if (!pressedPlay) {
              setPressedPlay(true);
              setActiveSectionID(id);
            }
          }}
        >
          <SectionHeading />
        </div>
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
