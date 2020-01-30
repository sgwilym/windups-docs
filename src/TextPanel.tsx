import React, { useRef, useState } from "react";
import { Linebreaker, AutoString, CharWrapper } from "auto-strings";
import { css } from "linaria";
import useSize from "@rehooks/component-size";
import { CHAR_FONT_STYLE, StandardChar, CharContext } from "./Char";
import RewindListener from "./RewindListener";

const rootStyle = css``;

const TextPanel: React.FC = ({ children }) => {
  const panelRef = useRef(null);
  const { width: panelWidth } = useSize(panelRef);
  const [isFinished, setIsFinished] = useState(false);

  return (
    <CharContext.Provider value={{ animated: !isFinished }}>
      <div ref={panelRef} className={rootStyle}>
        <Linebreaker fontStyle={CHAR_FONT_STYLE} width={panelWidth}>
          <AutoString
            onFinished={() => setIsFinished(true)}
            skipped={isFinished}
          >
            <RewindListener onRewind={() => setIsFinished(false)} />
            <CharWrapper element={StandardChar}>{children}</CharWrapper>
          </AutoString>
        </Linebreaker>
      </div>
    </CharContext.Provider>
  );
};

export default TextPanel;
