interface CassetteArray extends Array<Cassette> {
}
export declare type StringCassette = [string, string];
export declare type CassetteCassette = [string[], CassetteArray];
export declare type Cassette = StringCassette | CassetteCassette;
export declare function cassetteFromString(str: string): StringCassette;
export declare function newCassette(arg: CassetteArray): Cassette;
export declare function isStringCassette(cassette: Cassette): cassette is StringCassette;
export declare function isUnplayed(cassette: Cassette): boolean;
export declare function isFinished([_played, remaining]: Cassette): boolean;
export declare function fastForward(cassette: Cassette): Cassette;
export declare function rewind(cassette: Cassette): Cassette;
export declare function cassetteAsString(cassette: Cassette): string;
export declare function lastPlayedChar([played, remaining]: Cassette): string | undefined;
export declare function playedStrings([played, remaining]: Cassette): string[];
export declare function nextChar([_played, remaining]: Cassette): string | undefined;
export declare function next(cassette: Cassette): Cassette;
export declare function didJustFinishSomething([played, remaining]: Cassette): boolean;
export declare function justFinishedString(cassette: Cassette): string | undefined;
export {};
