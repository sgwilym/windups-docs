import React from "react";
import { playedElements, isPlayedCassette } from "./Cassette";
export default function renderCassette(cassette) {
    const metadata = isPlayedCassette(cassette) ? cassette[1] : cassette[2];
    const played = isPlayedCassette(cassette)
        ? cassette[0]
        : playedElements(cassette);
    const Outer = metadata.element || React.Fragment;
    if (metadata.props && Object.keys(metadata.props).includes("children")) {
        return React.createElement(Outer, Object.assign({}, metadata.props));
    }
    const inner = played.reduce((acc, playedEl) => {
        if (typeof playedEl === "string") {
            const accButLast = acc.slice(0, acc.length - 1);
            const last = acc[acc.length - 1];
            return last && typeof last === "string"
                ? [...accButLast, last + playedEl]
                : [...acc, playedEl];
        }
        return [...acc, renderCassette(playedEl)];
    }, []);
    return (React.createElement(Outer, Object.assign({ key: metadata.key }, metadata.props), inner));
}
