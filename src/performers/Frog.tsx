import React, { useState, useContext, createContext } from "react";
import Performer, { PerformerContext } from "../Performer";
import { DialogElementProps } from "../DialogElement";
import AvNormResting from "../images/frog/f-norm-resting.svg";
import AvNorm1 from "../images/frog/f-norm-open-1.svg";
import AvNorm2 from "../images/frog/f-norm-open-2.svg";
import AvLaffResting from "../images/frog/f-laff-resting.svg";
import AvLaff1 from "../images/frog/f-laff-open-1.svg";
import AvLaff2 from "../images/frog/f-laff-open-2.svg";
import AvMadResting from "../images/frog/f-mad-resting.svg";
import AvMad1 from "../images/frog/f-mad-open-1.svg";
import AvMad2 from "../images/frog/f-mad-open-2.svg";
import AvSmugResting from "../images/frog/f-smug-resting.svg";
import AvSmug1 from "../images/frog/f-smug-open-1.svg";
import AvSmug2 from "../images/frog/f-smug-open-2.svg";
import AvShameResting from "../images/frog/f-shame-resting.svg";
import AvShame1 from "../images/frog/f-shame-open-1.svg";
import AvShame2 from "../images/frog/f-shame-open-2.svg";
import AvShockResting from "../images/frog/f-shock-resting.svg";
import AvShock1 from "../images/frog/f-shock-open-1.svg";
import AvShock2 from "../images/frog/f-shock-open-2.svg";

import { Effect, OnChar } from "windups";

export const normFrames = [AvNormResting, AvNorm1, AvNorm2];
export const normRestingFrames = [AvNormResting];
export const laffFrames = [AvLaffResting, AvLaff1, AvLaff2];
export const laffRestingFrames = [AvLaffResting];
export const madFrames = [AvMadResting, AvMad1, AvMad2];
export const madRestingFrames = [AvMadResting];
export const smugFrames = [AvSmugResting, AvSmug1, AvSmug2];
export const smugRestingFrames = [AvSmugResting];
export const shameFrames = [AvShameResting, AvShame1, AvShame2];
export const shameRestingFrames = [AvShameResting];
export const shockFrames = [AvShockResting, AvShock1, AvShock2];
export const shockRestingFrames = [AvShockResting];

type SetExpressionProps = {
  expression: FrogEmotion;
  resting?: boolean;
};

const SetExpression: React.FC<SetExpressionProps> = ({
  expression,
  resting
}) => {
  const { setExpression } = useContext(FrogContext);
  const { setAvatarFrames } = useContext(PerformerContext);
  return (
    <Effect
      fn={() => {
        setExpression(expression);
        setAvatarFrames(
          resting ? frogRestingFrameSets[expression] : frogFrameSets[expression]
        );
      }}
    />
  );
};

const SetRestingCurrentExpression = () => {
  const { setExpression, currentExpression } = useContext(FrogContext);
  const { setAvatarFrames } = useContext(PerformerContext);
  return (
    <Effect
      fn={() => {
        setExpression(currentExpression);
        setAvatarFrames(frogRestingFrameSets[currentExpression]);
      }}
    />
  );
};

function makeExpression(expr: FrogEmotion) {
  return () => <SetExpression expression={expr} />;
}

export const HappyExpression = makeExpression("HAPPY");
export const SmugExpression = makeExpression("SMUG");
export const ShameExpression = makeExpression("SHAME");
export const ShockExpression = makeExpression("SHOCK");
export const MadExpression = makeExpression("MAD");

type FrogFrameMap = {
  NORMAL: string[];
  HAPPY: string[];
  MAD: string[];
  SMUG: string[];
  SHAME: string[];
  SHOCK: string[];
};

const frogFrameSets: FrogFrameMap = {
  NORMAL: normFrames,
  HAPPY: laffFrames,
  MAD: madFrames,
  SMUG: smugFrames,
  SHAME: shameFrames,
  SHOCK: shockFrames
};

const frogRestingFrameSets: FrogFrameMap = {
  NORMAL: normRestingFrames,
  HAPPY: laffRestingFrames,
  MAD: madRestingFrames,
  SMUG: smugFrames,
  SHAME: shameRestingFrames,
  SHOCK: shockRestingFrames
};

type FrogEmotion = keyof FrogFrameMap;

interface FrogProps extends DialogElementProps {
  expression?: FrogEmotion;
}

const FrogContext = createContext<{
  setExpression: React.Dispatch<React.SetStateAction<FrogEmotion>>;
  currentExpression: FrogEmotion;
}>({
  setExpression: () => {},
  currentExpression: "NORMAL"
});

const Frog: React.FC<FrogProps> = ({
  children,
  autoProceed,
  expression: initialExpression = "NORMAL"
}) => {
  const [currentExpression, setCurrentExpression] = useState(initialExpression);

  return (
    <FrogContext.Provider
      value={{ setExpression: setCurrentExpression, currentExpression }}
    >
      <Performer
        initialFrames={frogFrameSets[initialExpression]}
        autoProceed={autoProceed}
      >
        <SetExpression expression={initialExpression} />
        {children}
        <SetRestingCurrentExpression />
      </Performer>
    </FrogContext.Provider>
  );
};

export default Frog;
