import React from "react";
const Pause = ({}) => {
    return React.createElement(React.Fragment, null);
};
export function isPauseElement(element) {
    return element.type === Pause;
}
export default Pause;
