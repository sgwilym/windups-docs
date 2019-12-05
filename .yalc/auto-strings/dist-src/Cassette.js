export function cassetteFromString(str) {
    return ["", str];
}
export function newCassette(arg) {
    return [[], arg];
}
export function isStringCassette(cassette) {
    const [first] = cassette;
    return typeof first === "string";
}
export function isUnplayed(cassette) {
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
export function isFinished([_played, remaining]) {
    return remaining.length === 0;
}
export function fastForward(cassette) {
    const forwardedCassette = next(cassette);
    if (isFinished(forwardedCassette)) {
        return forwardedCassette;
    }
    return fastForward(forwardedCassette);
}
export function rewind(cassette) {
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
export function cassetteAsString(cassette) {
    if (!isStringCassette(cassette)) {
        const [played, remaining] = cassette;
        return [played.join(""), remaining.map(cassetteAsString).join("")].join("");
    }
    return cassette.join("");
}
export function lastPlayedChar([played, remaining]) {
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
export function playedStrings([played, remaining]) {
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
export function nextChar([_played, remaining]) {
    const [nextVal] = remaining;
    if (nextVal === undefined) {
        return nextVal;
    }
    if (typeof nextVal === "string") {
        return nextVal;
    }
    return nextChar(nextVal);
}
export function next(cassette) {
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
export function didJustFinishSomething([played, remaining]) {
    if (typeof played !== "string") {
        const lastPlayed = played[played.length - 1];
        const [firstRemaining] = remaining;
        if (lastPlayed && firstRemaining && typeof firstRemaining !== "string") {
            return isUnplayed(firstRemaining);
        }
    }
    return remaining.length === 0;
}
export function justFinishedString(cassette) {
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
