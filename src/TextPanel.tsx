import React, { useState, useRef, useMemo } from "react";
import { useTalkingTexts, mapTextArgs, renderTextArg } from "auto-strings";
import { TextArg } from "auto-strings/dist-types/useTalkingTexts";
import { css } from "linaria";
import useSize from "@rehooks/component-size";
import breakLines from "break-styled-lines";
import { TalkingTextOptions } from "auto-strings/dist-types/useTalkingText";
import { StandardChar, CHAR_FONT_STYLE, AnimatedCharContext } from "./Char";

const rootStyle = css`
  white-space: pre-wrap;
  margin-bottom: 1em;
`;

declare type TalkingTextsOptions = {
  onFinished: (text: string) => void;
};

export type TextPanelProps = {
  textArgs: TextArg[];
  options?: TalkingTextsOptions;
};

function textArgsStrings(textArgs: TextArg[]): string[] {
  return textArgs.map(arg => {
    if (typeof arg === "string") {
      return arg;
    }

    return arg[0];
  });
}

function insertNewLinesIntoTextArgs(
  textArgs: TextArg[],
  width: number,
  style: string
): TextArg[] {
  const withNewLines = breakLines(textArgsStrings(textArgs), width, style);

  return mapTextArgs(textArgs, ([_text, options], i) => {
    return [withNewLines[i], options];
  });
}

function addTextArgDefaults(textArgs: TextArg[], defaults: TalkingTextOptions) {
  return mapTextArgs(textArgs, ([text, options]) => {
    return [text, { ...defaults, ...options }];
  });
}

const TextPanel: React.FC<TextPanelProps> = ({ textArgs, options }) => {
  const [hasFinished, setHasFinished] = useState(false);
  const panelRef = useRef(null);
  const { width: panelWidth } = useSize(panelRef);

  const moddedTextArgs = useMemo(
    () =>
      insertNewLinesIntoTextArgs(
        addTextArgDefaults(textArgs, { charElement: StandardChar }),
        panelWidth,
        CHAR_FONT_STYLE
      ),
    [panelWidth, textArgs]
  );

  const [text] = useTalkingTexts(moddedTextArgs, {
    onFinished: text => {
      if (options && options.onFinished) {
        options.onFinished(text);
      }
      // Let the animations finish
      setTimeout(() => {
        setHasFinished(true);
      }, 500);
    }
  });

  return (
    <div className={rootStyle} ref={panelRef}>
      <AnimatedCharContext.Provider value={!hasFinished}>
        {hasFinished ? moddedTextArgs.map(renderTextArg) : text}
      </AnimatedCharContext.Provider>
    </div>
  );
};

export default TextPanel;
