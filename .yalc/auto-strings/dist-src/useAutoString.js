import React, { useState, useEffect } from "react";
import { cassetteFromString, cassetteAsString } from "./Cassette";
import useAutoStringTimeout from "./useAutoStringTimeout";
import renderCassette from "./renderCassette";
export default function useAutoString(text, options = {}) {
    const [cassette, setCassette] = useState(cassetteFromString(text, {
        ...options,
        element: React.Fragment
    }));
    useEffect(() => {
        if (cassetteAsString(cassette) !== text) {
            setCassette(cassetteFromString(text, {
                ...options,
                element: React.Fragment
            }));
        }
    }, [text]);
    const { skip, rewind, isFinished } = useAutoStringTimeout(cassette, setCassette, options);
    return [renderCassette(cassette), { skip, rewind, isFinished }];
}
