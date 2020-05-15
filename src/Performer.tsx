import React, { useContext, useReducer } from "react";
import DialogElement, { DialogElementProps } from "./DialogElement";
import { css, cx } from "linaria";
import { DialogChildContext } from "./Dialog";
import { SectionContext } from "./Section";
import { useDebounce } from "use-debounce";
import { OnChar, Effect, textFromChildren } from "windups";
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
  setAvatarFrames: (_frames: string[]) => {}
});

type AvatorProps = {
  currentAvatar: string;
};

const Avatar: React.FC<AvatorProps> = ({ currentAvatar }) => {
  const [debouncedAvatar] = useDebounce(currentAvatar, 27, { maxWait: 40 });

  return <img src={debouncedAvatar} alt={"Character avatar"} aria-hidden />;
};

type Action =
  | {
      type: "next";
      fromChar?: (char: string) => void;
    }
  | {
      type: "newFrames";
      frames: string[];
    };

function avatarReducer(state: string[], action: Action) {
  switch (action.type) {
    case "newFrames":
      return action.frames;
    default:
      const [head, ...tail] = state;
      return [...tail, head];
  }
}

interface PerformerProps extends DialogElementProps {
  initialFrames: string[];
  endFrame: string;
}

const Performer: React.FC<PerformerProps> = ({
  children,
  autoProceed,
  initialFrames,
  endFrame
}) => {
  const { isActive: sectionIsActive } = useContext(SectionContext);
  const { isActive } = useContext(DialogChildContext);
  const [frames, dispatch] = useReducer(avatarReducer, initialFrames);
  const text = textFromChildren(children);

  return (
    <PerformerContext.Provider
      value={{
        setAvatarFrames: newFrames => {
          dispatch({ type: "newFrames", frames: newFrames });
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
              fn={() => {
                dispatch({ type: "next" });
              }}
            >
              {children}
            </OnChar>
          </DialogElement>
        </div>
      </div>
    </PerformerContext.Provider>
  );
};

export default Performer;
