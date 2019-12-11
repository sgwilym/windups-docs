import React from "react";
import Performer from "../Performer";
import { DialogElementProps } from "../DialogElement";

interface SnobProps extends DialogElementProps {}

const Snob: React.FC<SnobProps> = ({ children, autoProceed }) => {
  return (
    <Performer avatar={"🌝"} autoProceed={autoProceed}>
      {children}
    </Performer>
  );
};

export default Snob;
