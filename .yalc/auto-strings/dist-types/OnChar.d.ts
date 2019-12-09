import React from "react";
import { AutoStringCassette } from "./AutoStringComponent";
declare type OnCharProps = {
    fn: (char: string) => void;
};
declare const OnChar: React.FC<OnCharProps>;
export declare function isOnCharElement(element: React.ReactElement): element is React.ReactElement<OnCharProps>;
export declare function onCharFromCassette(cassette: AutoStringCassette): ((char: string) => void) | undefined;
export default OnChar;
