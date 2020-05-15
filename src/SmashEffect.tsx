import React, { useContext } from "react";
import { SFXContext } from "./App";
import { Effect } from "windups";

const SmashEffect: React.FC = () => {
  const { smash } = useContext(SFXContext);
  return <Effect fn={smash} />;
};

export default SmashEffect;
