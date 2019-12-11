import React from "react";
import breakLines from "break-styled-lines";
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
    return React.createElement("div", { style: { whiteSpace: "pre" } }, transformedChildren);
};
export default Linebreaker;
