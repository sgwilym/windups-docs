import React, { useContext } from "react";
import TextPanel from "./TextPanel";
import { DialogContext, DialogChildContext } from "./Dialog";
import useKey from "@rooks/use-key";
import { useIsFinished, useSkip, Effect } from "windups";
import { SectionContext } from "./Section";
import SectionFocusContext from "./SectionFocusContext";
import { css } from "linaria";
import Nexters from "./images/nexters.svg";
import { GREEN } from "./colours";

export const NextListener: React.FC = () => {
  const isFinished = useIsFinished();
  const skip = useSkip();
  const { isFinished: dialogIsFinished } = useContext(DialogContext);
  const { proceed, isActive } = useContext(DialogChildContext);
  const { activeSectionID } = useContext(SectionFocusContext);
  const { id } = useContext(SectionContext);
  const isTotallyActive = isActive && activeSectionID === id;

  useKey([13, 39], () => {
    if (isTotallyActive && !isFinished) {
      skip();
    } else {
      if (isTotallyActive && !dialogIsFinished) {
        proceed();
      }
    }
  });

  return null;
};

const nextRootStyles = css`
  @keyframes drift {
    100% {
      background-position: 111px 73px;
    }
  }
  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  animation-name: drift, fade-in;
  animation-duration: 5s, 200ms;
  animation-iteration-count: infinite, 1;
  animation-timing-function: linear;
  display: block;
  height: 48px;
  border-radius: 5px;
  border: 2px solid #e5e5e5;
  background-image: url(${Nexters});
  background-color: white;
  width: 100%;
  background-size: 111px 73px;
  font-size: 1em;
  font-family: "Menlo", monospace;
  margin-top: 16px;
  box-shadow: 2px 2px 7px rgba(0, 0, 0, 0.05);
  transition: transform 200ms;
  appearance: none;

  &:hover {
    transform: scale(1.02);
  }

  &:active {
    transform: scale(0.98);
  }

  &:focus {
    color: ${GREEN};
    border-color: ${GREEN};
  }
`;

const NextButton: React.FC = () => {
  const { setActiveSectionID } = useContext(SectionFocusContext);
  const { id } = useContext(SectionContext);
  const { isFinished: dialogIsFinished } = useContext(DialogContext);
  const { proceed, isActive } = useContext(DialogChildContext);

  return !dialogIsFinished && isActive ? (
    <button
      className={nextRootStyles}
      onClick={() => {
        setActiveSectionID(id);
        proceed();
      }}
      tabIndex={0}
    >
      {"Continue"}
    </button>
  ) : null;
};

export type DialogElementProps = {
  autoProceed?: boolean;
};

const DialogElement: React.FC<DialogElementProps> = ({
  children,
  autoProceed
}) => {
  const { proceed } = useContext(DialogChildContext);

  return (
    <>
      <TextPanel>
        <NextListener />
        <div aria-hidden>{children}</div>
        {autoProceed ? <Effect fn={proceed} /> : <NextButton />}
      </TextPanel>
    </>
  );
};

export default DialogElement;
