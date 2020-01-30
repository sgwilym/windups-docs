import React from "react";
import { useSkip, Effect } from "auto-strings";

const SkipEffect = () => {
  const skip = useSkip();

  return <Effect fn={skip} />;
};

export default SkipEffect;
