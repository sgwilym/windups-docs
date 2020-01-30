import React, { useContext } from "react";
import TextPanel from "./TextPanel";
import { DialogContext, DialogChildContext } from "./Dialog";
import useKey from "@rooks/use-key";
import { useIsFinished, useSkip, Effect } from "auto-strings";
import { SectionFocusContext } from "./App";
import { SectionContext } from "./Section";

const NextListener: React.FC = () => {
  const isFinished = useIsFinished();
  const skip = useSkip();
  const { isFinished: dialogIsFinished } = useContext(DialogContext);
  const { proceed, isActive } = useContext(DialogChildContext);
  const { activeSectionID } = useContext(SectionFocusContext);
  const { id } = useContext(SectionContext);
  const isTotallyActive = isActive && activeSectionID === id;

  useKey([13, 39], () => {
    if (isTotallyActive && !isFinished) {
      skip();
    } else {
      if (isTotallyActive && !dialogIsFinished) {
        proceed();
      }
    }
  });

  return null;
};

const NextButton: React.FC = () => {
  const { setActiveSectionID } = useContext(SectionFocusContext);
  const { id } = useContext(SectionContext);
  const { isFinished: dialogIsFinished } = useContext(DialogContext);
  const { proceed, isActive } = useContext(DialogChildContext);

  return !dialogIsFinished && isActive ? (
    <button
      onClick={() => {
        setActiveSectionID(id);
        proceed();
      }}
    >
      {"►"}
    </button>
  ) : null;
};

export type DialogElementProps = {
  autoProceed?: boolean;
};

const DialogElement: React.FC<DialogElementProps> = ({
  children,
  autoProceed
}) => {
  const { proceed } = useContext(DialogChildContext);

  return (
    <TextPanel>
      <NextListener />
      {children}
      {autoProceed ? <Effect fn={proceed} /> : <NextButton />}
    </TextPanel>
  );
};

export default DialogElement;
