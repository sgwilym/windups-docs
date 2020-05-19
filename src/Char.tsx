import React, { useContext } from "react";
import { css, cx } from "linaria";
import { CharWrapper } from "windups";
import { TEXT_PINK } from "./colours";

export const CharContext = React.createContext({ animated: false });

export const CHAR_FONT_STYLE = "14pt 'Menlo'";

const charStyle = css`
  display: inline-block;
  font: ${CHAR_FONT_STYLE};
  transform: translateZ(0);
`;

const animatingStyle = css`
  @keyframes enter {
    from {
      opacity: 0;
      transform: scale(0.1) rotate(-80deg);
    }
    to {
      opacity: 1;
    }
  }
  animation-name: enter;
  animation-duration: 100ms;
`;

export const StandardChar: React.FC = ({ children }) => {
  const { animated } = useContext(CharContext);

  return (
    <span className={cx(charStyle, animated && animatingStyle)}>
      {children}
    </span>
  );
};

const dropStyle = css`
  @keyframes enter {
    0% {
      opacity: 0;
    }
    50% {
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
`;

const emphasisStyle = css`
  color: ${TEXT_PINK};
`;

const EmphasisChar: React.FC = ({ children }) => {
  return (
    <span className={cx(charStyle, dropStyle, emphasisStyle)}>{children}</span>
  );
};

export const Emphasis: React.FC = ({ children }) => {
  return <CharWrapper element={EmphasisChar}>{children}</CharWrapper>;
};

const DropChar: React.FC = ({ children }) => {
  return <span className={cx(charStyle, dropStyle)}>{children}</span>;
};

export const Dropped: React.FC = ({ children }) => {
  return <CharWrapper element={DropChar}>{children}</CharWrapper>;
};
