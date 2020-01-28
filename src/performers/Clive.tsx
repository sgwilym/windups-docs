import React from "react";
import Performer from "../Performer";
import { DialogElementProps } from "../DialogElement";

interface CliveProps extends DialogElementProps {}

const Clive: React.FC<CliveProps> = ({ autoProceed, children }) => {
  return (
    <Performer avatar={"👨🏻‍🚒"} autoProceed={autoProceed}>
      {children}
    </Performer>
  );
};
export default Clive;
