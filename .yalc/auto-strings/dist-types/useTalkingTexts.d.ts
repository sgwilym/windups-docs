import React from "react";
import { TalkingTextOptions } from "./useTalkingText";
export declare type TextArg = string | [string, TalkingTextOptions];
declare type TalkingTextsOptions = {
    onFinished: (text: string) => void;
};
export declare function mapTextArgs(args: TextArg[], map: (arg: [string, TalkingTextOptions], i: number, args: [string, TalkingTextOptions][]) => [string, TalkingTextOptions]): TextArg[];
export default function useTalkingTexts(textArgs: TextArg[], options?: TalkingTextsOptions): [React.ReactNode, () => void, () => void];
export {};
