import React from "react";
import { useWindupString } from "windups";
import { cx, css } from "linaria";
import KeyA from "./key1.svg";
import KeyB from "./key2.svg";
import KeyC from "./key3.svg";
import KeyD from "./key4.svg";

const keyRootStyle = css`
  width: 76px;
  display: flex;
  justify-content: right;
  margin: 0 12px;
`;

type KeyProps = {
  changeValue: any;
};

const Key: React.FC<KeyProps> = ({ changeValue }) => {
  const [[src], next] = React.useReducer(
    state => {
      const [first, ...rest] = state;
      return [...rest, first];
    },
    [KeyB, KeyA, KeyC, KeyD]
  );

  React.useEffect(() => {
    next("whatever");
  }, [changeValue]);

  return (
    <div className={keyRootStyle}>
      <img src={src} />
    </div>
  );
};

const bannerRootStyle = css`
  flex: 1 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 48px;
`;

const bannerStyle = css`
  color: black;
  border-radius: 6px;
  border: 4px black solid;
  transform: skew(-5deg);
  padding: 12px;
  font-size: 64px;
  font-family: "Menlo", monospace;
  font-style: italic;
  display: inline-block;
  transition: width 50ms;
  margin-right: 24px;
`;

const bannerTextStyle = css`
  transform: skew(5deg);
  display: inline-block;
`;

const finishedBannerStyle = css`
  color: white;
  background-color: black;
`;

type BannerProps = {
  onFinished: () => void;
};

const Banner: React.FC<BannerProps> = ({ onFinished }) => {
  const [isFinished, setIsFinished] = React.useState(false);
  const [count, setCount] = React.useState(0);

  const [text] = useWindupString("windups", {
    pace: () => 150,
    onChar: () => {
      setCount(prev => prev + 1);
    },
    onFinished: () => {
      setTimeout(() => {
        setCount(prev => prev + 1);
        onFinished();
        setIsFinished(true);
      }, 300);
    }
  });

  return (
    <div className={bannerRootStyle}>
      <Key changeValue={count} />
      <div className={cx(bannerStyle, isFinished && finishedBannerStyle)}>
        <span className={bannerTextStyle}>{text}</span>
      </div>
    </div>
  );
};

export default Banner;
