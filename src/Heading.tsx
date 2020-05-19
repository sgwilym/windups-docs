import { css, cx } from "linaria";
import React from "react";
import { WindupChildren, CharWrapper, textFromChildren } from "windups";

const rootStyle = css`
  grid-column: 1/8;
  display: flex;
  flex-direction: column;
`;

const headingStyle = css`
  font-family: "Menlo", monospace;
  font-size: 24px;
  font-weight: normal;
  font-style: italic;
  border-bottom: 2px solid black;
  transform: skew(0, -3deg);
  white-space: pre;
  display: inline-block;
  align-self: flex-start;
`;

const headingStyleRight = css`
  transform: skew(0, 3deg);
  font-style: oblique;
  align-self: flex-end;
`;

const headingLetterStyle = css`
  @keyframes enter {
    0% {
      opacity: 0;
    }
    20% {
      opacity: 1;
    }
    25% {
      animation-timing-function: cubic-bezier(0.4, 0, 1, 0.6);
      transform: translate3d(0, -100%, 0);
      transform-style: preserve-3d;
    }
    0%,
    50%,
    88%,
    96%,
    100% {
      animation-timing-function: cubic-bezier(0.12, 0.52, 0.57, 1);
      transform: translate3d(0, 0, 0);
      transform-style: preserve-3d;
    }
    75% {
      animation-timing-function: cubic-bezier(0.4, 0, 1, 0.6);
      transform: translate3d(0, -33%, 0);
      transform-style: preserve-3d;
    }
    94% {
      animation-timing-function: cubic-bezier(0.4, 0, 1, 0.6);
      transform: translate3d(0, -11%, 0);
      transform-style: preserve-3d;
    }
    97% {
      animation-timing-function: cubic-bezier(0.4, 0, 1, 0.6);
      transform: translate3d(0, -3%, 0);
      transform-style: preserve-3d;
    }
  }
  animation-name: enter;
  animation-duration: 500ms;
  display: inline-block;
`;

const staticHeadingLetterStyle = css`
  display: inline-block;
`;

export const HeadingChar: React.FC = ({ children }) => {
  return (
    <span aria-hidden={true} className={headingLetterStyle}>
      {children}
    </span>
  );
};

const StaticHeadingChar: React.FC = ({ children }) => {
  return (
    <span aria-hidden={true} className={staticHeadingLetterStyle}>
      {children}
    </span>
  );
};

type HeadingProps = {
  onFinished?: () => void;
  right?: boolean;
  noWindup?: boolean;
};

const Heading: React.FC<HeadingProps> = ({
  children,
  onFinished,
  right,
  noWindup,
}) => {
  const text = textFromChildren(children);

  return (
    <div className={rootStyle}>
      <h2 className={cx(headingStyle, right && headingStyleRight)} title={text}>
        <WindupChildren onFinished={onFinished} skipped={noWindup}>
          <CharWrapper
            key={noWindup ? "static" : "windup"}
            element={noWindup ? StaticHeadingChar : HeadingChar}
          >
            {children}
          </CharWrapper>
        </WindupChildren>
      </h2>
    </div>
  );
};

export default Heading;
