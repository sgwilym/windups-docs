import React, { useState } from "react";
import TextPanel, { TextPanelProps } from "./TextPanel";

type DialogProps = {
  dialog: TextPanelProps[];
};

const Dialog: React.FC<DialogProps> = ({ dialog }) => {
  const [activeTextNumber, setActiveTextNumber] = useState(1);
  const activeTexts = dialog.slice(0, activeTextNumber);
  const isFinished = activeTexts.length === dialog.length;

  console.log({ activeTexts });

  return (
    <>
      {activeTexts.map(({ textArgs, options }, i) => (
        <TextPanel
          key={i}
          textArgs={textArgs}
          options={{
            onFinished: text => {
              if (options && options.onFinished) {
                options.onFinished(text);
              }
              if (!isFinished) {
                setTimeout(() => {
                  setActiveTextNumber(idx => idx + 1);
                }, 200);
              }
            }
          }}
        />
      ))}
    </>
  );
};

export default Dialog;
