import React, { useRef, useEffect } from "react";
import { cassetteFromString, newCassette, playedStrings, cassetteAsString, isFinished, next } from "./Cassette";
import { useState } from "react";
import renderText from "./renderText";
import useTalkingTimeout from "./useTalkingTimeout";
function unzip(arr) {
    return [arr.map(([first]) => first), arr.map(([_first, second]) => second)];
}
function talkingTextfromArg(textArg) {
    const textCassette = typeof textArg !== "string" ? textArg[0] : textArg;
    const options = typeof textArg !== "string" ? textArg[1] : {};
    return [cassetteFromString(textCassette), options];
}
export function mapTextArgs(args, map) {
    return args
        .map(arg => {
        if (typeof arg === "string") {
            return [arg, {}];
        }
        return arg;
    })
        .map(map);
}
export default function useTalkingTexts(textArgs, options) {
    const [textCassettes, textOptions] = unzip(textArgs.map(talkingTextfromArg));
    const [textsCassette, setTextsCassette] = useState(newCassette(textCassettes));
    if (cassetteAsString(textsCassette) !==
        cassetteAsString(newCassette(textCassettes))) {
        setTextsCassette(newCassette(textCassettes));
    }
    const allIsFinished = isFinished(textsCassette);
    const didTriggerOnFinishRef = useRef(false);
    const nextOptions = textOptions[playedStrings(next(textsCassette)).length - 1] || {};
    const [skip, rewind] = useTalkingTimeout(setTextsCassette, textsCassette, nextOptions);
    const playedCassettes = playedStrings(textsCassette);
    useEffect(() => {
        if (didTriggerOnFinishRef.current && !allIsFinished) {
            didTriggerOnFinishRef.current = false;
        }
        else if (!didTriggerOnFinishRef.current && allIsFinished) {
            didTriggerOnFinishRef.current = true;
            if (options && options.onFinished) {
                options.onFinished(cassetteAsString(textsCassette));
            }
        }
    }, [allIsFinished, textsCassette, options]);
    return [
        playedCassettes.map((text, i) => (React.createElement(React.Fragment, { key: i }, renderText([text, textOptions[i]])))),
        skip,
        rewind
    ];
}
