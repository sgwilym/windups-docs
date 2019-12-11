import React from "react";
import Performer from "../Performer";
import { DialogElementProps } from "../DialogElement";

interface FanGirlProps extends DialogElementProps {}

const FanGirl: React.FC<FanGirlProps> = ({ children, autoProceed }) => {
  return (
    <Performer avatar={"👩‍💻"} autoProceed={autoProceed}>
      {children}
    </Performer>
  );
};

export default FanGirl;
