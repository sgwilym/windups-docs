import React, { useState } from "react";

export const DialogContext = React.createContext({
  proceed: () => {},
  isFinished: false
});

export const DialogChildContext = React.createContext({
  isActive: false
});

const Dialog: React.FC = ({ children }) => {
  const [numberOfChildrenToShow, setNumberOfChildrenToShow] = useState(1);
  const activeChildIndex = numberOfChildrenToShow - 1;

  const shownChildren = React.Children.toArray(children)
    .slice(0, numberOfChildrenToShow)
    .map((child, i) => (
      <DialogChildContext.Provider value={{ isActive: i === activeChildIndex }}>
        {child}
      </DialogChildContext.Provider>
    ));

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
