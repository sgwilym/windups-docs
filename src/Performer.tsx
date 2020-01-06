import React, { useContext } from "react";
import DialogElement, { DialogElementProps } from "./DialogElement";
import { css, cx } from "linaria";
import { DialogChildContext } from "./Dialog";
import { SectionContext } from "./Section";

const rootStyle = css`
  display: flex;
  align-items: baseline;
`;

const textStyle = css`
  flex: 1 0 auto;
`;

const iconStyle = css`
  font-size: 2em;
  flex: 0 1 auto;
  margin-right: 0.3em;
`;

const inactiveStyle = css`
  opacity: 0.75;
`;

interface PerformerProps extends DialogElementProps {
  avatar: string;
}

const Performer: React.FC<PerformerProps> = ({
  children,
  avatar,
  autoProceed
}) => {
  const { isActive: sectionIsActive } = useContext(SectionContext);
  const { isActive } = useContext(DialogChildContext);

  return (
    <div
      className={cx(
        rootStyle,
        (!isActive || !sectionIsActive) && inactiveStyle
      )}
    >
      <div className={iconStyle}>{avatar}</div>
      <div className={textStyle}>
        <DialogElement autoProceed={autoProceed}>{children}</DialogElement>
      </div>
    </div>
  );
};

export default Performer;
