import React from "react";
import { AutoStringCassette } from "./AutoStringComponent";
declare type MsProp = {
    ms: number;
};
declare type GetPaceProp = {
    getPace: (char: string) => number;
};
declare type PaceProps = MsProp | GetPaceProp;
export declare function defaultGetPace(character: string): number;
declare const Pace: React.FC<PaceProps>;
export declare function isPaceElement(element: React.ReactElement): element is React.ReactElement<PaceProps>;
export declare function isMsProp(props: PaceProps): props is MsProp;
export declare function paceFromCassette(cassette: AutoStringCassette): ((char: string) => number) | undefined;
export default Pace;
