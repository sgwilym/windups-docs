import React from "react";
import { AutoStringMetadata, AutoStringCassette } from "./AutoStringComponent";
import { PlayedCassette } from "./Cassette";
export declare type PlayedAutoStringCasseette = PlayedCassette<string, AutoStringMetadata>;
export default function renderCassette(cassette: AutoStringCassette | PlayedAutoStringCasseette): React.ReactNode;
