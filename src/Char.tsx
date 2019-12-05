import { css, cx } from "linaria";
import React, { createContext, useContext } from "react";

export const AnimatedCharContext = createContext(false);

export const CHAR_FONT_STYLE = "32px sans-serif";

const charStyle = css`
  display: inline-block;
  font: ${CHAR_FONT_STYLE};
`;

const red = css`
  color: red;
`;

const animatingStyle = css`
  @keyframes enter {
    from {
      opacity: 0;
      transform: scale(0.1) rotate(-80deg);
    }
    to {
      opacity: 1;
      transform: scale(1) rotate(0deg);
    }
  }
  animation-name: enter;
  animation-duration: 100ms;
`;

export const StandardChar: React.FC = ({ children }) => {
  const isAnimating = useContext(AnimatedCharContext);

  if (children === "\n") {
    return <>{children}</>;
  }

  return (
    <span className={cx(charStyle, isAnimating && animatingStyle)}>
      {children}
    </span>
  );
};

export const AngryChar: React.FC = ({ children }) => {
  return (
    <StandardChar>
      <div className={red}>{children}</div>
    </StandardChar>
  );
};
