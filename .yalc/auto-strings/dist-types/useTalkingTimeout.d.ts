import { Cassette } from "./Cassette";
import { TalkingTextOptions } from "./useTalkingText";
export default function useTalkingTimeout(setCassette: (arg: any) => void, cassette: Cassette, { onCharacter, onFinished, pace }: TalkingTextOptions): [() => void, () => void];
