import React from "react";
import { Cassette } from "./Cassette";
export declare function useSkip(): () => void;
export declare function useRewind(): () => void;
export declare function useIsFinished(): boolean;
export declare type AutoStringMetadata = {
    element: React.ElementType | string | undefined;
    pace?: (character: string) => number;
    onChar?: (character: string) => void;
    props?: any;
    ref?: any;
    key?: string | number | null;
};
export declare type AutoStringCassette = Cassette<string, AutoStringMetadata>;
declare type AutoStringProps = {
    onFinished?: () => void;
};
declare const AutoString: React.FC<AutoStringProps>;
export default AutoString;
