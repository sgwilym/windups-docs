import React, { useState } from "react";
import { WindupChildren, Pace } from "windups";
import { GREEN, PINK } from "./colours";
import { css } from "linaria";

const Bicycle = ({ colour }: { colour: string }) => {
  return (
    <svg
      width="109"
      height="64"
      viewBox="0 0 109 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="22" cy="42" r="20" stroke="black" stroke-width="4" />
      <path
        d="M107 42C107 53.0036 97.8644 62 86.5 62C75.1356 62 66 53.0036 66 42C66 30.9964 75.1356 22 86.5 22C97.8644 22 107 30.9964 107 42Z"
        stroke="black"
        stroke-width="4"
      />
      <path
        d="M37.5114 12.566L22 42L53.0227 39.7925M37.5114 12.566H75.9205M37.5114 12.566L53.0227 39.7925M37.5114 12.566L32.3409 3M75.9205 12.566L53.0227 39.7925M75.9205 12.566L87 42M75.9205 12.566L72.2273 3"
        stroke={colour}
        stroke-width="4"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M41 4C42.1046 4 43 3.10457 43 2C43 0.895431 42.1046 0 41 0V4ZM22 4H41V0H22V4Z"
        fill="black"
      />
      <path
        d="M71 3.03193H79.8C82.2 2.79993 87 3.72793 87 9.29595C87 14.864 81.1333 15.328 78.2 14.864"
        stroke="black"
        stroke-width="4"
        stroke-linecap="round"
      />
    </svg>
  );
};

const buttonStyle = css`
  font-family: "Menlo", monospace;
  font-size: 1.5em;
  color: white;
  padding: 16px;
  border-radius: 24px;
  border: none;
  box-shadow: 2px 2px 7px rgba(0, 0, 0, 0.05);
  transform: skew(0deg, -3deg);
  transition: 300ms all;
  &:hover {
    transform: scale(1.03) skew(0deg, -3deg);
  }
`;

const Button = ({
  colour,
  label,
  onClick,
}: {
  colour: string;
  label: string;
  onClick: () => void;
}) => {
  return (
    <button
      className={buttonStyle}
      style={{ backgroundColor: colour }}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

const rootStyle = css`
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const BikePicker = () => {
  const [colour, setColour] = useState("black");

  return (
    <div className={rootStyle}>
      <Bicycle colour={colour} />
      <WindupChildren>
        <Pace ms={500}>
          <Button
            label={"Jet Black"}
            colour={"black"}
            onClick={() => setColour("black")}
          />
          <Button
            label={"Frog Green"}
            colour={GREEN}
            onClick={() => setColour(GREEN)}
          />
          <Button
            label={"Gum Pink"}
            colour={PINK}
            onClick={() => setColour(PINK)}
          />
        </Pace>
      </WindupChildren>
    </div>
  );
};

export default BikePicker;
