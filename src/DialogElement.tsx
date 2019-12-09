import React, { useContext } from "react";
import TextPanel from "./TextPanel";
import { DialogContext } from "./Dialog";

const NextButton: React.FC = () => {
  const { proceed, isFinished: dialogIsFinished } = useContext(DialogContext);

  return !dialogIsFinished ? <button onClick={proceed}>{"Next"}</button> : null;
};

const DialogElement: React.FC = ({ children }) => {
  return (
    <TextPanel>
      {children}
      <NextButton />
    </TextPanel>
  );
};

export default DialogElement;
