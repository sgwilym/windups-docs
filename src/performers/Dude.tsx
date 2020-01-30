import React from "react";
import Performer from "../Performer";
import { DialogElementProps } from "../DialogElement";
import { Pace, defaultGetPace } from "auto-strings";

interface DudeProps extends DialogElementProps {}

const Dude: React.FC<DudeProps> = ({ autoProceed, children }) => {
  return (
    <Performer avatar={"🦥"} autoProceed={autoProceed}>
      <Pace getPace={char => defaultGetPace(char) * 3}>{children}</Pace>
    </Performer>
  );
};
export default Dude;
