import React, { useRef, useEffect, useCallback, useState, useContext } from 'react';
import breakLines from 'break-styled-lines';

function isPlayedCassette(cassette) {
    return cassette.length === 2;
}
function memberIsCassette(member) {
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
function cassetteFromString(str, metadata) {
    return [[], str.split(""), metadata];
}
function newCassette(arg, metadata) {
    return [[], arg, metadata];
}
function isUnplayed(cassette) {
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
function cassetteAsString(cassette) {
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
function lastPlayedElement([played, remaining]) {
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
function playedElements([played, remaining]) {
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
function nextElement([_played, remaining]) {
    const [nextVal] = remaining;
    if (memberIsCassette(nextVal)) {
        return nextElement(nextVal);
    }
    return nextVal;
}
function next(cassette) {
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
const Pace = ({ children }) => {
    return React.createElement(React.Fragment, null, children);
};
function isPaceElement(element) {
    return element.type === Pace;
}
function isMsProp(props) {
    if ("ms" in props) {
        return true;
    }
    return false;
}
function paceFromCassette(cassette) {
    if (isFinished(cassette)) {
        return undefined;
    }
    const [_played, remaining, metadata] = cassette;
    const [firstRemaining] = remaining;
    if (firstRemaining && memberIsCassette(firstRemaining)) {
        return paceFromCassette(firstRemaining);
    }
    return metadata.pace;
}

const OnChar = ({ children }) => {
    return React.createElement(React.Fragment, null, children);
};
function isOnCharElement(element) {
    return element.type === OnChar;
}
function onCharFromCassette(cassette) {
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

function useAutoStringTimeout(cassette, setCassette, options) {
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
    useEffect(() => {
        if (options.skipped) {
            skip();
            return () => {
                shouldFireOnFinishRef.current = true;
            };
        }
    });
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

function renderCassette(cassette) {
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

function useAutoString(text, options = {}) {
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

const Pause = ({}) => {
    return React.createElement(React.Fragment, null);
};
function isPauseElement(element) {
    return element.type === Pause;
}

const AutoStringContext = React.createContext({
    skip: () => {
        console.warn("Tried to use the useSkip hook outside of a AutoString context!");
    },
    rewind: () => {
        console.warn("Tried to use the useRewind hook outside of a AutoString context!");
    },
    isFinished: false
});
function useSkip() {
    const { skip } = useContext(AutoStringContext);
    return skip;
}
function useRewind() {
    const { rewind } = useContext(AutoStringContext);
    return rewind;
}
function useIsFinished() {
    const { isFinished } = useContext(AutoStringContext);
    return isFinished;
}
function reduceCassetteArgs(prevArgs, children) {
    if (typeof children === "string") {
        return [...prevArgs, ...children.split("")];
    }
    if (typeof children === "number") {
        return [...prevArgs, ...children.toString().split("")];
    }
    if (!React.isValidElement(children)) {
        return prevArgs;
    }
    const { children: childrenChildren, ...restProps } = children.props;
    const paceMetaData = isPaceElement(children)
        ? {
            pace: (char) => {
                if (isMsProp(children.props)) {
                    return children.props.ms;
                }
                return children.props.getPace(char);
            }
        }
        : {};
    const onCharMetaData = isOnCharElement(children)
        ? {
            onChar: children.props.fn
        }
        : {};
    const keyProp = children.key ? { key: children.key } : {};
    if (isPauseElement(children)) {
        return [
            ...prevArgs,
            cassetteFromString(" ", {
                element: React.Fragment,
                ...keyProp,
                props: {},
                pace: () => children.props.ms
            })
        ];
    }
    if (childrenChildren === undefined) {
        return [
            ...prevArgs,
            cassetteFromString(" ", {
                element: children.type,
                props: restProps,
                ...keyProp,
                ...paceMetaData,
                ...onCharMetaData
            })
        ];
    }
    if (typeof childrenChildren === "string") {
        return [
            ...prevArgs,
            cassetteFromString(childrenChildren, {
                element: children.type,
                props: restProps,
                ...keyProp,
                ...paceMetaData,
                ...onCharMetaData
            })
        ];
    }
    if (childrenChildren instanceof Function) {
        return [
            ...prevArgs,
            cassetteFromString(" ", {
                element: children.type,
                props: { children: childrenChildren, ...restProps },
                ...keyProp,
                ...paceMetaData,
                ...onCharMetaData
            })
        ];
    }
    const newArgs = React.Children.toArray(childrenChildren).reduce(reduceCassetteArgs, []);
    const argsWithMetadata = newArgs.map(member => {
        if (memberIsCassette(member)) {
            const [played, remaining, metadata] = member;
            return [
                played,
                remaining,
                {
                    ...paceMetaData,
                    ...onCharMetaData,
                    ...metadata
                }
            ];
        }
        return member;
    });
    return [
        ...prevArgs,
        newCassette(argsWithMetadata, {
            element: children.type,
            props: restProps,
            ...keyProp,
            ...paceMetaData,
            ...onCharMetaData
        })
    ];
}
function circular() {
    const seen = new WeakSet();
    return (key, value) => {
        if (key.startsWith("_"))
            return; // Don't compare React's internal props.
        if (typeof value === "object" && value !== null) {
            if (seen.has(value))
                return;
            seen.add(value);
        }
        return value;
    };
}
function useChildrenEffect(fn, children) {
    const stringified = JSON.stringify(children, circular());
    return useEffect(fn, [stringified]);
}
const AutoString = ({ children, onFinished, skipped }) => {
    const [cassette, setCassette] = useState(newCassette(React.Children.toArray(children).reduce(reduceCassetteArgs, []), { element: undefined }));
    const { skip, rewind, isFinished } = useAutoStringTimeout(cassette, setCassette, {
        onFinished,
        skipped
    });
    useChildrenEffect(() => {
        setCassette(newCassette(React.Children.toArray(children).reduce(reduceCassetteArgs, []), { element: undefined }));
    }, children);
    return (React.createElement(AutoStringContext.Provider, { value: {
            skip,
            rewind,
            isFinished
        } }, renderCassette(cassette)));
};

function wrapChildren(children, Wrapper) {
    if (typeof children === "string") {
        return children.split("").map(char => React.createElement(Wrapper, null, char));
    }
    if (typeof children === "number") {
        return children
            .toString()
            .split("")
            .map(char => React.createElement(Wrapper, null, char));
    }
    if (!React.isValidElement(children)) {
        return React.createElement(React.Fragment, null);
    }
    const Outer = children.type;
    if (children.props.children instanceof Function) {
        return React.createElement(Outer, Object.assign({ key: children.key }, children.props));
    }
    return (React.createElement(Outer, Object.assign({ key: children.key }, children.props), React.Children.map(children.props.children, ch => {
        return wrapChildren(ch, Wrapper);
    })));
}
const CharWrapper = ({ children, element }) => {
    return (React.createElement(React.Fragment, null, React.Children.map(children, ch => {
        return wrapChildren(ch, element);
    })));
};

function getStringsOfReactChildren(strings, children) {
    if (typeof children === "string") {
        return [...strings, children];
    }
    if (typeof children === "number") {
        return [...strings, children.toString()];
    }
    if (!React.isValidElement(children)) {
        return strings;
    }
    return [
        ...strings,
        ...React.Children.toArray(children.props.children).reduce(getStringsOfReactChildren, [])
    ];
}
function reinsertStringsIntoChildren([accChildren, accStrings], children) {
    if (typeof children === "string" || typeof children === "number") {
        const [firstString, ...restStrings] = accStrings;
        return [[...accChildren, firstString], restStrings];
    }
    if (!React.isValidElement(children)) {
        return [accChildren, accStrings];
    }
    const [subChildrenAcc, subStringsAcc] = React.Children.toArray(children.props.children).reduce(reinsertStringsIntoChildren, [[], accStrings]);
    return [
        [
            ...accChildren,
            React.cloneElement(children, {
                children: subChildrenAcc
            })
        ],
        subStringsAcc
    ];
}
const Linebreaker = ({ children, fontStyle, width }) => {
    // CAVEATS:
    // fontStyle must match the font style of the characters inside
    // non-character elements must not add width to the line.
    // must be used OUTSIDE of autostring component
    const childrenArray = React.Children.toArray(children);
    const strings = childrenArray.reduce(getStringsOfReactChildren, []);
    const transformedStrings = breakLines(strings, width, fontStyle);
    const [transformedChildren] = childrenArray.reduce(reinsertStringsIntoChildren, [
        [],
        transformedStrings
    ]);
    return React.createElement("div", { style: { whiteSpace: "pre-wrap" } }, transformedChildren);
};

export { AutoString, CharWrapper, Linebreaker, OnChar, Pace, Pause, useAutoString, useIsFinished, useRewind, useSkip };
//# sourceMappingURL=index.js.map
