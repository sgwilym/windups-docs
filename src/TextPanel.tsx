import React, { useRef } from "react";
import { Linebreaker, AutoString, CharWrapper } from "auto-strings";
import { css } from "linaria";
import useSize from "@rehooks/component-size";
import { CHAR_FONT_STYLE, StandardChar } from "./Char";

const rootStyle = css`
  white-space: pre-wrap;
  margin-bottom: 1em;
`;

const TextPanel: React.FC = ({ children }) => {
  const panelRef = useRef(null);
  const { width: panelWidth } = useSize(panelRef);

  return (
    <div ref={panelRef} className={rootStyle}>
      <Linebreaker fontStyle={CHAR_FONT_STYLE} width={panelWidth}>
        <AutoString>
          <CharWrapper element={StandardChar}>{children}</CharWrapper>
        </AutoString>
      </Linebreaker>
    </div>
  );
};

export default TextPanel;
