import React from "react";
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
export default CharWrapper;
