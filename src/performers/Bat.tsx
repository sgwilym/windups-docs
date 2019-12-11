import React from "react";
import Performer from "../Performer";
import { DialogElementProps } from "../DialogElement";

interface BatProps extends DialogElementProps {}

const Bat: React.FC<BatProps> = ({ children, autoProceed }) => {
  return (
    <Performer avatar={"🦇"} autoProceed={autoProceed}>
      {children}
    </Performer>
  );
};

export default Bat;
