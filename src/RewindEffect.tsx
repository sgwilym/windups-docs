import React from "react";
import { useRewind, Effect } from "auto-strings";
import { useContext } from "react";
import { DialogChildContext } from "./Dialog";

const RewindEffect = () => {
  const rewind = useRewind();
  const { proceed } = useContext(DialogChildContext);

  return (
    <Effect
      fn={() => {
        proceed();
        rewind();
      }}
    />
  );
};

export default RewindEffect;
