import { useRef, useEffect, useCallback } from "react";
import { defaultGetPace, paceFromCassette } from "./Pace";
import { isFinished, lastPlayedElement, nextElement, next, fastForward, rewind } from "./Cassette";
import { onCharFromCassette } from "./OnChar";
export default function useAutoStringTimeout(cassette, setCassette, options) {
    const timeoutRef = useRef(null);
    const onCharacterRef = useRef(onCharFromCassette(cassette));
    const onFinishedRef = useRef(options.onFinished);
    const paceRef = useRef(paceFromCassette(cassette) || defaultGetPace);
    const shouldFireOnFinishRef = useRef(true);
    const cassetteIsFinished = isFinished(cassette);
    onCharacterRef.current = onCharFromCassette(cassette);
    onFinishedRef.current = options.onFinished;
    paceRef.current = paceFromCassette(cassette) || defaultGetPace;
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
    return {
        skip,
        rewind: rewindCassette,
        isFinished: cassetteIsFinished
    };
}
