import React from "react";
export declare type TalkingTextOptions = {
    charElement?: React.ElementType;
    textElement?: React.ElementType;
    onCharacter?: (char: string, i: number) => void;
    onFinished?: (text: string) => void;
    pace?: (char: string) => number;
};
declare function useTalkingText(text: string, options?: TalkingTextOptions): [React.ReactNode, () => void, () => void];
export default useTalkingText;
