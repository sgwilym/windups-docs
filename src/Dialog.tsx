import React, { useState, useCallback, useRef, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import useSize from "@rehooks/component-size";

export const DialogContext = React.createContext({
  proceed: () => {},
  isFinished: false
});

export const DialogChildContext = React.createContext({
  isActive: false
});

function useKeepInViewer(dependency: any) {
  const measurementRef = useRef<HTMLDivElement>();

  const [inViewRef, isInView] = useInView();

  const setRef = useCallback(
    node => {
      measurementRef.current = node;
      inViewRef(node);
    },
    [isInView]
  );

  useEffect(() => {
    if (!measurementRef.current) {
      return;
    }

    window.scrollTo({
      top: measurementRef.current.offsetTop + window.pageYOffset - 200,
      behavior: "smooth"
    });
  }, [dependency]);

  return <div ref={setRef} />;
}

const Dialog: React.FC = ({ children }) => {
  const [numberOfChildrenToShow, setNumberOfChildrenToShow] = useState(1);
  const activeChildIndex = numberOfChildrenToShow - 1;
  const rootRef = useRef(null);
  const { height } = useSize(rootRef);
  const keepy = useKeepInViewer(height);

  const shownChildren = React.Children.toArray(children)
    .slice(0, numberOfChildrenToShow)
    .map((child, i) => (
      <DialogChildContext.Provider
        key={i}
        value={{ isActive: i === activeChildIndex }}
      >
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
      <div ref={rootRef}>
        {shownChildren}
        {keepy}
      </div>
    </DialogContext.Provider>
  );
};

export default Dialog;
