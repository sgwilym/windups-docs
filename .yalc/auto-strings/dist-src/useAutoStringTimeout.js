import { useRef, useEffect, useCallback } from "react";
import { defaultGetPace } from "./Pace";
import { isFinished, lastPlayedElement, nextElement, next, fastForward, rewind } from "./Cassette";
export default function useAutoStringTimeout(cassette, setCassette, options) {
    const timeoutRef = useRef(null);
    const onCharacterRef = useRef(options.onChar);
    const onFinishedRef = useRef(options.onFinished);
    const paceRef = useRef(options.pace || defaultGetPace);
    const shouldFireOnFinishRef = useRef(true);
    const cassetteIsFinished = isFinished(cassette);
    onCharacterRef.current = options.onChar;
    onFinishedRef.current = options.onFinished;
    paceRef.current = options.pace || defaultGetPace;
    useEffect(() => {
        if (cassetteIsFinished && onFinishedRef.current) {
            onFinishedRef.current();
        }
    }, [cassetteIsFinished]);
    useEffect(() => {
        if (!cassetteIsFinished) {
            const lastEl = lastPlayedElement(cassette);
            timeoutRef.current = setTimeout(() => {
                const nextCharacter = nextElement(cassette);
                if (onCharacterRef.current && nextCharacter) {
                    onCharacterRef.current(nextCharacter);
                }
                setCassette((prevCassette) => next(prevCassette));
            }, lastEl ? paceRef.current(lastEl) : 0);
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
    return { skip, rewind: rewindCassette, isFinished: cassetteIsFinished };
}
