import React from "react";
import { useWindupString, CharWrapper } from "windups";
import { css } from "linaria";
import { GREEN, PINK } from "../colours";

const chatChar = css`
  @keyframes enter {
    from {
      opacity: 0;
      transform: scale(0.1) rotate(-180deg) translateY(-100%);
    }
    to {
      opacity: 1;
      transform: scale(1) rotate(0deg) translateY(0);
    }
  }
  animation-name: enter;
  animation-duration: 150ms;
  display: inline-block;
`;

const SpeechBubbleChar: React.FC = ({ children }) => {
  return <span className={chatChar}>{children}</span>;
};

type SpeechBubbleProps = {
  text: string;
  onFinished?: () => void;
  skipped?: boolean;
};

const greenBubble = css`
  font-family: "Menlo", monospace;
  padding: 12px;
  color: white;
  border-radius: 3px;
  background-color: ${GREEN};
  transform: skew(-5deg, -3deg);
  display: inline-block;
  white-space: pre-wrap;
  font-size: 24px;
  align-self: flex-start;
  box-shadow: 2px 2px 7px rgba(0, 0, 0, 0.05);
`;

export const SpeechBubbleA: React.FC<SpeechBubbleProps> = ({
  text,
  onFinished,
  skipped,
}) => {
  const [windup] = useWindupString(text, { onFinished, skipped });

  return (
    <div className={greenBubble}>
      {skipped ? (
        windup
      ) : (
        <CharWrapper element={SpeechBubbleChar}>{windup}</CharWrapper>
      )}
    </div>
  );
};

const pinkBubble = css`
  font-family: "Menlo", monospace;
  padding: 12px;
  color: black;
  border-radius: 3px;
  background-color: ${PINK};
  transform: skew(5deg, 3deg);
  display: inline-block;
  white-space: pre;
  font-size: 24px;
  align-self: flex-end;
  box-shadow: -2px 2px 7px rgba(0, 0, 0, 0.05);
`;

export const SpeechBubbleB: React.FC<SpeechBubbleProps> = ({
  text,
  onFinished,
  skipped,
}) => {
  const [windup] = useWindupString(text, { onFinished, skipped });

  return (
    <div key={skipped ? "skipped" : "unskipped"} className={pinkBubble}>
      {skipped ? (
        windup
      ) : (
        <CharWrapper element={SpeechBubbleChar}>{windup}</CharWrapper>
      )}
    </div>
  );
};

const chatRoot = css`
  display: flex;
  flex-direction: column;
  max-width: 50em;
`;

type ChatProps = {
  onFinished: () => void;
};

const Chat: React.FC<ChatProps> = ({ onFinished }) => {
  const [linesToShow, setLinesToShow] = React.useState(1);

  const setLines = (num: number) => {
    setTimeout(() => {
      setLinesToShow(num);
    }, 300);
  };

  return (
    <div className={chatRoot}>
      <SpeechBubbleA
        text={"Hey, what's up? Anything new?"}
        onFinished={() => setLines(2)}
      />
      {linesToShow >= 2 && (
        <SpeechBubbleB
          text={"Actually... I'm crazy hungry!"}
          onFinished={() => setLines(3)}
        />
      )}
      {linesToShow >= 3 && (
        <SpeechBubbleA
          text={"Me too! How about a curry tonight?!"}
          onFinished={() => setLines(4)}
        />
      )}
      {linesToShow >= 4 && (
        <SpeechBubbleB
          text={"That. Sounds. Amazing! on my way"}
          onFinished={onFinished}
        />
      )}
    </div>
  );
};

export default Chat;
