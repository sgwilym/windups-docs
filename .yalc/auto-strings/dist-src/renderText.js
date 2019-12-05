import React from "react";
export default function renderText(textArg) {
    const text = typeof textArg === "string" ? textArg : textArg[0];
    const options = typeof textArg === "string" ? {} : textArg[1];
    const Outer = options.textElement || React.Fragment;
    const { charElement } = options;
    const inner = charElement
        ? text
            .split("")
            .map((char, i) => char === "\n"
            ? char
            : React.createElement(charElement, { key: i }, char))
        : text;
    return React.createElement(Outer, null, inner);
}
