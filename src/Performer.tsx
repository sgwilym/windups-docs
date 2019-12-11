import React from "react";
import DialogElement, { DialogElementProps } from "./DialogElement";
import { css } from "linaria";

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

interface PerformerProps extends DialogElementProps {
  avatar: string;
}

const Performer: React.FC<PerformerProps> = ({
  children,
  avatar,
  autoProceed
}) => {
  return (
    <div className={rootStyle}>
      <div className={iconStyle}>{avatar}</div>
      <div className={textStyle}>
        <DialogElement autoProceed={autoProceed}>{children}</DialogElement>
      </div>
    </div>
  );
};

export default Performer;
