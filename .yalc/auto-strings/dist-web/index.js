import React, { useRef, useEffect, useCallback, useState } from 'react';

function cassetteFromString(str) {
    return ["", str];
}
function newCassette(arg) {
    return [[], arg];
}
function isStringCassette(cassette) {
    const [first] = cassette;
    return typeof first === "string";
}
function isUnplayed(cassette) {
    if (isStringCassette(cassette)) {
        return cassette[0].length === 0;
    }
    const [played, remaining] = cassette;
    if (played.length > 0) {
        return false;
    }
    return remaining.reduce((unplayed, cassette) => {
        if (unplayed) {
            return isUnplayed(cassette);
        }
        return false;
    }, true);
}
function isFinished([_played, remaining]) {
    return remaining.length === 0;
}
function fastForward(cassette) {
    const forwardedCassette = next(cassette);
    if (isFinished(forwardedCassette)) {
        return forwardedCassette;
    }
    return fastForward(forwardedCassette);
}
function rewind(cassette) {
    if (isUnplayed(cassette)) {
        return cassette;
    }
    if (isStringCassette(cassette)) {
        const [played, remaining] = cassette;
        return ["", played + remaining];
    }
    const [played, remaining] = cassette;
    return [[], [...played.map(cassetteFromString), ...remaining.map(rewind)]];
}
function cassetteAsString(cassette) {
    if (!isStringCassette(cassette)) {
        const [played, remaining] = cassette;
        return [played.join(""), remaining.map(cassetteAsString).join("")].join("");
    }
    return cassette.join("");
}
function lastPlayedChar([played, remaining]) {
    if (typeof remaining !== "string" &&
        remaining.length > 0 &&
        !isUnplayed(remaining[0])) {
        return lastPlayedChar(remaining[0]);
    }
    if (typeof played !== "string") {
        if (played.length > 0) {
            const lastPlayed = played[played.length - 1];
            return lastPlayed.substr(-1, 1);
        }
        return undefined;
    }
    if (played.length === 0) {
        return undefined;
    }
    return played.substr(-1, 1);
}
function playedStrings([played, remaining]) {
    if (typeof played === "string") {
        return [played];
    }
    const [firstRemaining] = remaining;
    if (firstRemaining &&
        typeof firstRemaining !== "string" &&
        !isUnplayed(firstRemaining)) {
        return [...played, ...playedStrings(firstRemaining)];
    }
    return played;
}
function nextChar([_played, remaining]) {
    const [nextVal] = remaining;
    if (nextVal === undefined) {
        return nextVal;
    }
    if (typeof nextVal === "string") {
        return nextVal;
    }
    return nextChar(nextVal);
}
function next(cassette) {
    // start
    // [[], [["", "hi"], ["", "no"]]]
    // next
    // [[], [["h", "i"], ["", "no"]]]
    // next
    // [["hi"], [["n", "o"]]]
    // next
    // [["hi", "no"], []]
    if (isFinished(cassette)) {
        return cassette;
    }
    if (isStringCassette(cassette)) {
        const [played, remaining] = cassette;
        return [played + nextChar(cassette), remaining.substring(1)];
    }
    const [playedCassettes, remainingCassettes] = cassette;
    const [firstRemainingCassette, ...restRemainingCassettes] = remainingCassettes;
    const nextFirstCassette = next(firstRemainingCassette);
    if (isFinished(nextFirstCassette)) {
        return [
            [...playedCassettes, cassetteAsString(nextFirstCassette)],
            restRemainingCassettes
        ];
    }
    return [playedCassettes, [nextFirstCassette, ...restRemainingCassettes]];
}
function didJustFinishSomething([played, remaining]) {
    if (typeof played !== "string") {
        const lastPlayed = played[played.length - 1];
        const [firstRemaining] = remaining;
        if (lastPlayed && firstRemaining && typeof firstRemaining !== "string") {
            return isUnplayed(firstRemaining);
        }
    }
    return remaining.length === 0;
}
function justFinishedString(cassette) {
    if (didJustFinishSomething(cassette)) {
        if (isStringCassette(cassette) && isFinished(cassette)) {
            return cassetteAsString(cassette);
        }
        const [played] = cassette;
        if (typeof played !== "string") {
            const lastPlayed = played[played.length - 1];
            if (lastPlayed) {
                return lastPlayed;
            }
        }
    }
    return undefined;
}

function renderText(textArg) {
    const text = typeof textArg === "string" ? textArg : textArg[0];
    const options = typeof textArg === "string" ? {} : textArg[1];
    const Outer = options.textElement || React.Fragment;
    const { charElement } = options;
    const inner = charElement
        ? text
            .split("")
            .map((char, i) => char === "\n"
            ? char
            : React.createElement(charElement, { key: i }, char))
        : text;
    return React.createElement(Outer, null, inner);
}

function defaultGetPace(character) {
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
function useTalkingTimeout(setCassette, cassette, { onCharacter, onFinished, pace }) {
    const timeoutRef = useRef(null);
    const onCharacterRef = useRef(onCharacter);
    const onFinishedRef = useRef(onFinished);
    const paceRef = useRef(pace || defaultGetPace);
    const shouldFireOnFinishRef = useRef(true);
    const cassetteIsFinished = isFinished(cassette);
    onCharacterRef.current = onCharacter;
    onFinishedRef.current = onFinished;
    paceRef.current = pace || defaultGetPace;
    useEffect(() => {
        if (!cassetteIsFinished) {
            const lastChar = lastPlayedChar(cassette);
            timeoutRef.current = setTimeout(() => {
                const nextCharacter = nextChar(cassette);
                if (onCharacterRef.current && nextCharacter) {
                    onCharacterRef.current(nextCharacter, playedStrings(next(cassette)).join("").length - 1);
                }
                const justDone = justFinishedString(next(cassette));
                if (onFinishedRef.current && justDone) {
                    onFinishedRef.current(justDone);
                }
                setCassette((prevCassette) => next(prevCassette));
            }, lastChar ? paceRef.current(lastChar) : 0);
            return () => {
                if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current);
                }
            };
        }
    }, [cassetteIsFinished, cassette, setCassette]);
    const skip = useCallback(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        if (shouldFireOnFinishRef.current) {
            shouldFireOnFinishRef.current = false;
            const finishedCassette = fastForward(cassette);
            const justDone = justFinishedString(finishedCassette);
            if (onFinishedRef.current && justDone) {
                onFinishedRef.current(justDone);
            }
            setCassette(finishedCassette);
        }
    }, [cassette, setCassette]);
    const rewindCassette = useCallback(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        shouldFireOnFinishRef.current = true;
        setCassette(rewind(cassette));
    }, [cassette, setCassette]);
    return [skip, rewindCassette];
}

function useTalkingText(text, options = {}) {
    const [cassette, setCassette] = useState(cassetteFromString(text));
    useEffect(() => {
        setCassette(cassetteFromString(text));
    }, [text]);
    const [skip, rewind] = useTalkingTimeout(setCassette, cassette, options);
    return [
        renderText([playedStrings(cassette).join(""), options]),
        skip,
        rewind
    ];
}

function unzip(arr) {
    return [arr.map(([first]) => first), arr.map(([_first, second]) => second)];
}
function talkingTextfromArg(textArg) {
    const textCassette = typeof textArg !== "string" ? textArg[0] : textArg;
    const options = typeof textArg !== "string" ? textArg[1] : {};
    return [cassetteFromString(textCassette), options];
}
function mapTextArgs(args, map) {
    return args
        .map(arg => {
        if (typeof arg === "string") {
            return [arg, {}];
        }
        return arg;
    })
        .map(map);
}
function useTalkingTexts(textArgs, options) {
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

export { mapTextArgs, renderText as renderTextArg, useTalkingText, useTalkingTexts };
//# sourceMappingURL=index.js.map
