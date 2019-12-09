import React, { useState, useContext, useEffect } from "react";
import { newCassette, cassetteFromString, memberIsCassette } from "./Cassette";
import { isPaceElement, isMsProp } from "./Pace";
import { isOnCharElement } from "./OnChar";
import { isPauseElement } from "./Pause";
import useAutoStringTimeout from "./useAutoStringTimeout";
import renderCassette from "./renderCassette";
const AutoStringContext = React.createContext({
    skip: () => {
        console.warn("Tried to use the useSkip hook outside of a AutoString context!");
    },
    rewind: () => {
        console.warn("Tried to use the useRewind hook outside of a AutoString context!");
    },
    isFinished: false
});
export function useSkip() {
    const { skip } = useContext(AutoStringContext);
    return skip;
}
export function useRewind() {
    const { rewind } = useContext(AutoStringContext);
    return rewind;
}
export function useIsFinished() {
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
const AutoString = ({ children, onFinished }) => {
    const [cassette, setCassette] = useState(newCassette(React.Children.toArray(children).reduce(reduceCassetteArgs, []), { element: undefined }));
    const { skip, rewind, isFinished } = useAutoStringTimeout(cassette, setCassette, {
        onFinished
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
export default AutoString;
