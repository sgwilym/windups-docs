import React from "react";
import { css, cx } from "linaria";
import { LIGHT_GREY } from "./colours";
import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/nightOwlLight";
import { textFromChildren } from "windups";

const rootStyle = css`
  font: 14px "Menlo", monospace;
  padding: 16px;
  border-radius: 5px;
  box-shadow: 2px 2px 7px rgba(0, 0, 0, 0.05);
  background: ${LIGHT_GREY};
  margin-bottom: 8px;
  white-space: pre;
  line-height: 1.5;
  overflow: auto;
`;

const StaticCodeExample: React.FC = ({ children }) => {
  const text = textFromChildren(children);

  return (
    <Highlight {...defaultProps} theme={theme} code={text} language={"tsx"}>
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

export default StaticCodeExample;
