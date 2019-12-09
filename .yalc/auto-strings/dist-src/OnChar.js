import React from "react";
import { isFinished, memberIsCassette } from "./Cassette";
const OnChar = ({ children }) => {
    return React.createElement(React.Fragment, null, children);
};
export function isOnCharElement(element) {
    return element.type === OnChar;
}
export function onCharFromCassette(cassette) {
    if (isFinished(cassette)) {
        return undefined;
    }
    const [_played, remaining, metadata] = cassette;
    const [firstRemaining] = remaining;
    if (firstRemaining && memberIsCassette(firstRemaining)) {
        return onCharFromCassette(firstRemaining);
    }
    return metadata.onChar;
}
export default OnChar;
