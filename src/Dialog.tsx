import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  useContext
} from "react";
import { useInView } from "react-intersection-observer";
import useSize from "@rehooks/component-size";
import SectionFocusContext from "./SectionFocusContext";
import { SectionContext } from "./Section";

if (!("scrollBehavior" in document.documentElement.style)) {
  import("scroll-behavior-polyfill");
}

if (!("ResizeObserver" in window)) {
  (global as any).ResizeObserver = import("resize-observer-polyfill");
}

export const DialogContext = React.createContext({
  isFinished: false
});

export const DialogChildContext = React.createContext({
  isActive: false,
  proceed: () => {}
});

function useKeepInViewer(height: number) {
  const measurementRef = useRef<HTMLDivElement>();
  const prevHeightRef = useRef(height);
  const { isActive } = useContext(SectionContext);

  const [inViewRef, isInView] = useInView({
    rootMargin: "-100px 0px"
  });

  const setRef = useCallback(
    node => {
      measurementRef.current = node;
      inViewRef(node);
    },
    [inViewRef]
  );

  useEffect(() => {
    if (!measurementRef.current) {
      return;
    }

    // only scroll there within a certain threshold....

    const scrollBottom = window.scrollY + window.innerHeight;
    const bottomPos =
      measurementRef.current.offsetTop + measurementRef.current.offsetHeight;

    const isJustOutOfView = Math.abs(scrollBottom - bottomPos) < 200;

    if (
      !isInView &&
      isActive &&
      height !== prevHeightRef.current &&
      isJustOutOfView
    ) {
      window.scroll({
        top: measurementRef.current.offsetTop - (window.innerHeight / 3) * 2,
        behavior: "smooth"
      });
    }

    prevHeightRef.current = height;
  }, [isInView, isActive, height]);

  return <div ref={setRef} />;
}

const Dialog: React.FC = ({ children }) => {
  const [numberOfChildrenToShow, setNumberOfChildrenToShow] = useState(1);
  const activeChildIndex = numberOfChildrenToShow - 1;
  const rootRef = useRef(null);
  const { height } = useSize(rootRef);
  const { activeSectionID } = useContext(SectionFocusContext);
  const { id } = useContext(SectionContext);
  const isDialogActive = activeSectionID === id;
  const keepy = useKeepInViewer(height);

  const shownChildren = React.Children.toArray(children)
    .slice(0, numberOfChildrenToShow)
    .map((child, i) => (
      <DialogChildContext.Provider
        key={i}
        value={{
          isActive: i === activeChildIndex,
          proceed: () => {
            if (i + 2 > numberOfChildrenToShow && isDialogActive) {
              setNumberOfChildrenToShow(i + 2);
            }
          }
        }}
      >
        {child}
      </DialogChildContext.Provider>
    ));

  return (
    <DialogContext.Provider
      value={{
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
