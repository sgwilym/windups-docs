import React from "react";
import { useSkip, Effect } from "windups";

const SkipEffect = () => {
  const skip = useSkip();

  return <Effect fn={skip} />;
};

export default SkipEffect;
