import React from "react";
import Performer from "../Performer";
import { DialogElementProps } from "../DialogElement";
import { Pace } from "auto-strings";
import { defaultGetPace } from "auto-strings";

interface HotheadProps extends DialogElementProps {}

const Hothead: React.FC<HotheadProps> = ({ autoProceed, children }) => {
  return (
    <Performer avatar={"🐲"} autoProceed={autoProceed}>
      <Pace getPace={char => defaultGetPace(char) / 3}>{children}</Pace>
    </Performer>
  );
};
export default Hothead;
