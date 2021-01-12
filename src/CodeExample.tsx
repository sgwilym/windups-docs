import React, { useContext } from "react";
import { DialogChildContext, DialogContext } from "./Dialog";
import { textFromChildren, useWindupString } from "windups";
import { css, cx } from "linaria";
import { GREEN } from "./colours";
import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/nightOwl";
import useKey from "@rooks/use-key";
import SectionFocusContext from "./SectionFocusContext";
import { SectionContext } from "./Section";

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

type CodeExampleProps = {
  children: string;
};

const CodeExample: React.FC<CodeExampleProps> = ({ children }) => {
  const { proceed, isActive } = useContext(DialogChildContext);
  const { isFinished: dialogIsFinished } = useContext(DialogContext);
  const { activeSectionID } = useContext(SectionFocusContext);
  const { id } = useContext(SectionContext);
  const isTotallyActive = isActive && activeSectionID === id;
  const [windup, { skip, isFinished }] = useWindupString(children, {
    onFinished: () => {
      setTimeout(() => {
        proceed();
      }, 500);
    },
    pace: (char) => {
      if (char === "\n") {
        return 200;
      }
      return randomInt(80);
    },
    skipped: dialogIsFinished,
  });

  useKey([13, 39], () => {
    if (isTotallyActive && !isFinished) {
      skip();
    } else {
      if (isTotallyActive && !dialogIsFinished) {
        proceed();
      }
    }
  });

  return (
    <Highlight {...defaultProps} theme={theme} code={windup} language={"tsx"}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={cx(className, rootStyle)} style={style}>
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};

export default CodeExample;
