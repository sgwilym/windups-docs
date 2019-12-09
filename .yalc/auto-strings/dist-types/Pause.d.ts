import React from "react";
declare type PauseProps = {
    ms: number;
};
declare const Pause: React.FC<PauseProps>;
export declare function isPauseElement(element: React.ReactElement): element is React.ReactElement<PauseProps>;
export default Pause;
