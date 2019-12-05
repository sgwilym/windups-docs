import { useCallback, useRef, useEffect } from "react";
import { justFinishedString, fastForward, lastPlayedChar, next, playedStrings, isFinished, nextChar, rewind } from "./Cassette";
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
export default function useTalkingTimeout(setCassette, cassette, { onCharacter, onFinished, pace }) {
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
