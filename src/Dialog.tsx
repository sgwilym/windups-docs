import React, { useState } from "react";

export const DialogContext = React.createContext({
  proceed: () => {},
  isFinished: false
});

const Dialog: React.FC = ({ children }) => {
  const [numberOfChildrenToShow, setNumberOfChildrenToShow] = useState(1);

  const shownChildren = React.Children.toArray(children).slice(
    0,
    numberOfChildrenToShow
  );

  return (
    <DialogContext.Provider
      value={{
        proceed: () => {
          setNumberOfChildrenToShow(prev => prev + 1);
        },
        isFinished: numberOfChildrenToShow >= React.Children.count(children)
      }}
    >
      {shownChildren}
    </DialogContext.Provider>
  );
};

export default Dialog;
