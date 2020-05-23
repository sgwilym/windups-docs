import React, { useContext, useReducer, useState } from "react";
import DialogElement, { DialogElementProps } from "./DialogElement";
import { css, cx } from "linaria";
import { DialogChildContext } from "./Dialog";
import { SectionContext } from "./Section";
import { useDebounce } from "use-debounce";
import { OnChar, textFromChildren, Effect } from "windups";
import VisuallyHidden from "@reach/visually-hidden";

const rootStyle = css`
  display: flex;
  align-items: flex-start;
  margin-bottom: 1em;
`;

const textStyle = css`
  flex: 1 0 auto;
  margin: 1em 0 0 1em;
`;

const inactiveStyle = css`
  opacity: 0.5;
  filter: grayscale(70%);
`;

export const PerformerContext = React.createContext({
  setAvatarFrames: (_frames: FrameSet) => {}
});

type AvatorProps = {
  currentAvatar: string;
};

const Avatar: React.FC<AvatorProps> = ({ currentAvatar }) => {
  const [debouncedAvatar] = useDebounce(currentAvatar, 30, { maxWait: 40 });

  return <img src={debouncedAvatar} alt={"Character avatar"} aria-hidden />;
};

type Action =
  | {
      type: "next";
      fromChar?: (char: string) => void;
    }
  | {
      type: "newFrameSet";
      frameSet: FrameSet;
    };

function cycleFrames(frames: string[]) {
  const [head, ...tail] = frames;
  return [...tail, head];
}

function avatarReducer(state: FrameSet, action: Action) {
  switch (action.type) {
    case "newFrameSet":
      return action.frameSet;
    default:
      return {
        normal: cycleFrames(state.normal),
        resting: cycleFrames(state.resting)
      };
  }
}

function getIsResting(char: string) {
  switch (char) {
    case ".":
    case " ":
      return true;
    default:
      return false;
  }
}

export type FrameSet = {
  normal: string[];
  resting: string[];
};

interface PerformerProps extends DialogElementProps {
  initialFrameSet: FrameSet;
}

const Performer: React.FC<PerformerProps> = ({
  children,
  autoProceed,
  initialFrameSet
}) => {
  const { isActive: sectionIsActive } = useContext(SectionContext);
  const { isActive } = useContext(DialogChildContext);
  const [frameSet, dispatch] = useReducer(avatarReducer, initialFrameSet);
  const text = textFromChildren(children);
  const [isResting, setIsResting] = useState(false);
  const frames = isResting ? frameSet.resting : frameSet.normal;

  return (
    <PerformerContext.Provider
      value={{
        setAvatarFrames: newFrameSet => {
          dispatch({ type: "newFrameSet", frameSet: newFrameSet });
        }
      }}
    >
      <div
        className={cx(
          rootStyle,
          (!isActive || !sectionIsActive) && inactiveStyle
        )}
      >
        <Avatar currentAvatar={frames[0]} />
        <div className={textStyle}>
          <VisuallyHidden>{text}</VisuallyHidden>
          <DialogElement autoProceed={autoProceed}>
            <OnChar
              fn={(char: string) => {
                setIsResting(getIsResting(char));
                dispatch({ type: "next" });
              }}
            >
              {children}
            </OnChar>
            <Effect
              fn={() => {
                setIsResting(true);
              }}
            />
          </DialogElement>
        </div>
      </div>
    </PerformerContext.Provider>
  );
};

export default Performer;
