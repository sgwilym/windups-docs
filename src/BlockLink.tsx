import React from "react";
import { LinkProps } from "react-router-dom";
import { css, cx } from "linaria";
import { TEXT_PINK, GREEN } from "./colours";
import { HashLink as Link } from "react-router-hash-link";
import LittleHand from "./images/little-hand.svg";

const rootStyle = css`
  font-family: Menlo, monospace;
  display: inline-block;

  border-radius: 5px;
  box-shadow: 2px 2px 7px rgba(0, 0, 0, 0.05);
  padding: 8px;
  text-decoration-thickness: 2px;

  transition: all 200ms;
  color: white;
  position: relative;

  &:hover {
    background: white;
  }

  &:hover:before {
    content: url(${LittleHand});
    position: absolute;

    top: 50%;
    transform: translate(-110%, -45%);
  }

  img {
    flex: 0 0 auto;
    margin-right: 0.5em;
    filter: invert(100%);
    transition: all 200ms;
  }

  &:hover img {
    filter: none;
  }
`;

const blackStyle = css`
  background: black;

  &:hover {
    color: black;
  }
`;

const greenStyle = css`
  background: ${GREEN};

  &:hover {
    color: ${GREEN};
  }
`;

const pinkStyle = css`
  background: ${TEXT_PINK};

  &: hover {
    color: ${TEXT_PINK};
  }
`;

const innerStyle = css`
  display: flex;
  align-items: center;
`;

const themeStyles = {
  PINK: pinkStyle,
  GREEN: greenStyle,
  BLACK: blackStyle
};

type BlockLinkProps = {
  theme?: "PINK" | "GREEN" | "BLACK";
} & LinkProps;

const BlockLink: React.FC<BlockLinkProps> = ({
  children,
  theme = "PINK",
  className,
  ...rest
}) => {
  return (
    <Link className={cx(className, rootStyle, themeStyles[theme])} {...rest}>
      <div className={innerStyle}>{children}</div>
    </Link>
  );
};

export default BlockLink;
