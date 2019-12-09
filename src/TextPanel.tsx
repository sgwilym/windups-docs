import React, { useRef, useState } from "react";
import { Linebreaker, AutoString, CharWrapper } from "auto-strings";
import { css } from "linaria";
import useSize from "@rehooks/component-size";
import { CHAR_FONT_STYLE, StandardChar, CharContext } from "./Char";

const rootStyle = css`
  margin-bottom: 1em;
`;

const TextPanel: React.FC = ({ children }) => {
  const panelRef = useRef(null);
  const { width: panelWidth } = useSize(panelRef);
  const [isFinished, setIsFinished] = useState(false);

  const inner = <CharWrapper element={StandardChar}>{children}</CharWrapper>;

  if (isFinished) {
    return (
      <div ref={panelRef} className={rootStyle}>
        <Linebreaker fontStyle={CHAR_FONT_STYLE} width={panelWidth}>
          {inner}
        </Linebreaker>
      </div>
    );
  }

  // TODO: Key listener for rewind
  // TODO: Key listener for skipping

  return (
    <CharContext.Provider value={{ animated: true }}>
      <div ref={panelRef} className={rootStyle}>
        <Linebreaker fontStyle={CHAR_FONT_STYLE} width={panelWidth}>
          <AutoString onFinished={() => setIsFinished(true)}>
            {inner}
          </AutoString>
        </Linebreaker>
      </div>
    </CharContext.Provider>
  );
};

export default TextPanel;
