import React from "react";
import { isFinished, memberIsCassette } from "./Cassette";
export function defaultGetPace(character) {
    switch (character) {
        case ".":
        case ",":
        case "?":
        case "!":
        case "-":
            return 120;
        default:
            return 20;
    }
}
const Pace = ({ children }) => {
    return React.createElement(React.Fragment, null, children);
};
export function isPaceElement(element) {
    return element.type === Pace;
}
export function isMsProp(props) {
    if ("ms" in props) {
        return true;
    }
    return false;
}
export function paceFromCassette(cassette) {
    if (isFinished(cassette)) {
        return undefined;
    }
    const [_played, remaining, metadata] = cassette;
    const [firstRemaining] = remaining;
    if (firstRemaining && memberIsCassette(firstRemaining)) {
        return paceFromCassette(firstRemaining);
    }
    return metadata.pace;
}
export default Pace;
