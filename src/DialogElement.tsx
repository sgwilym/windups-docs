import React, { useContext } from "react";
import TextPanel from "./TextPanel";
import { DialogContext, DialogChildContext } from "./Dialog";
import useKey from "@rooks/use-key";
import { useIsFinished, useSkip, Effect } from "auto-strings";

const NextListener: React.FC = () => {
  const isFinished = useIsFinished();
  const skip = useSkip();
  const { proceed, isFinished: dialogIsFinished } = useContext(DialogContext);
  const { isActive } = useContext(DialogChildContext);
  useKey([13, 39], () => {
    if (isActive && !isFinished) {
      skip();
    } else {
      if (isActive && !dialogIsFinished) {
        proceed();
      }
    }
  });

  return null;
};

const NextButton: React.FC = () => {
  const { proceed, isFinished: dialogIsFinished } = useContext(DialogContext);
  const { isActive } = useContext(DialogChildContext);

  return !dialogIsFinished && isActive ? (
    <button onClick={proceed}>{"►"}</button>
  ) : null;
};

type DialogElementProps = {
  autoProceed?: boolean;
};

const DialogElement: React.FC<DialogElementProps> = ({
  children,
  autoProceed
}) => {
  const { proceed } = useContext(DialogContext);

  return (
    <TextPanel>
      <NextListener />
      {children}
      {autoProceed ? <Effect fn={proceed} /> : <NextButton />}
    </TextPanel>
  );
};

export default DialogElement;
