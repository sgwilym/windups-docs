import React from "react";
export declare type AutoStringOptions = {
    onCharacter?: (char: string, i: number) => void;
    onFinished?: () => void;
    pace?: (char: string) => number;
};
export default function useAutoString(text: string, options?: AutoStringOptions): [React.ReactNode, {
    skip: () => void;
    rewind: () => void;
    isFinished: boolean;
}];
