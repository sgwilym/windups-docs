export function isPlayedCassette(cassette) {
    return cassette.length === 2;
}
export function memberIsCassette(member) {
    // If it's not an array it can't be a cassette
    if (!Array.isArray(member)) {
        return false;
    }
    // If it has less or more than three members it's not a cassette
    if (member.length !== 3) {
        return false;
    }
    // If its first or second members are not arrays it's not a cassette
    if (!Array.isArray(member[0]) || !Array.isArray(member[1])) {
        return false;
    }
    // Past here we just have to hope ElementType isn't a Cassette.
    return true;
}
export function cassetteFromString(str, metadata) {
    return [[], str.split(""), metadata];
}
export function newCassette(arg, metadata) {
    return [[], arg, metadata];
}
export function isUnplayed(cassette) {
    const [played, remaining] = cassette;
    if (played.length > 0) {
        return false;
    }
    return remaining.reduce((unplayed, member) => {
        if (memberIsCassette(member))
            if (memberIsCassette(cassette) && unplayed) {
                return isUnplayed(member);
            }
        return unplayed;
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
    const [played, remaining, metadata] = cassette;
    const mapRewind = (member) => {
        if (memberIsCassette(member)) {
            return rewind(member);
        }
        return member;
    };
    return [
        [],
        [...played.map(mapRewind), ...remaining.map(mapRewind)],
        metadata
    ];
}
export function cassetteAsString(cassette) {
    const [played, remaining] = cassette;
    const stringify = (member) => {
        if (memberIsCassette(member)) {
            return cassetteAsString(member);
        }
        return member;
    };
    return [
        played.map(stringify).join(""),
        remaining.map(stringify).join("")
    ].join("");
}
export function lastPlayedElement([played, remaining]) {
    const playedFromRemaining = remaining.reduce((playedEl, member) => {
        if (memberIsCassette(member)) {
            if (!isUnplayed(member)) {
                return lastPlayedElement(member);
            }
        }
        return playedEl;
    }, undefined);
    if (playedFromRemaining) {
        return playedFromRemaining;
    }
    const last = played[played.length - 1];
    if (memberIsCassette(last)) {
        return lastPlayedElement(last);
    }
    return last;
}
export function playedElements([played, remaining]) {
    const playedTransformed = played.map(member => {
        if (memberIsCassette(member)) {
            const [_played, _remaining, metadata] = member;
            return [playedElements(member), metadata];
        }
        return member;
    });
    const [firstRemaning] = remaining;
    if (memberIsCassette(firstRemaning) && !isUnplayed(firstRemaning)) {
        const [_playedRemaining, _remaining, metadata] = firstRemaning;
        return [
            ...playedTransformed,
            [playedElements(firstRemaning), metadata]
        ];
    }
    return playedTransformed;
}
export function nextElement([_played, remaining]) {
    const [nextVal] = remaining;
    if (memberIsCassette(nextVal)) {
        return nextElement(nextVal);
    }
    return nextVal;
}
export function next(cassette) {
    // start
    // [[], [[[], ["h", "i"]], [[], ["n", "o"]]]]
    // next
    // [[], [[["h"], ["i"]], ["", ["n", "o"]]]]
    // next
    // [["h", "i"], [["n", "o"]]]
    // next
    // [["h", "i"] ["n", "o"]], []]
    if (isFinished(cassette)) {
        return cassette;
    }
    const [played, remaining, metadata] = cassette;
    const [firstRemaining, ...restRemaining] = remaining;
    if (memberIsCassette(firstRemaining)) {
        const nextFirstRemaining = next(firstRemaining);
        if (isFinished(nextFirstRemaining)) {
            return [[...played, nextFirstRemaining], restRemaining, metadata];
        }
        return [played, [nextFirstRemaining, ...restRemaining], metadata];
    }
    return [[...played, firstRemaining], restRemaining, metadata];
}
