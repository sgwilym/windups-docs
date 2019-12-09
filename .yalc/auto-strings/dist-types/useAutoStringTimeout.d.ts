/// <reference types="react" />
import { AutoStringCassette, AutoStringMetadata } from "./AutoStringComponent";
import { Cassette } from "./Cassette";
export default function useAutoStringTimeout(cassette: AutoStringCassette, setCassette: React.Dispatch<React.SetStateAction<Cassette<string, AutoStringMetadata>>>, options: {
    onFinished?: () => void;
}): {
    skip: () => void;
    rewind: () => void;
    isFinished: boolean;
};
