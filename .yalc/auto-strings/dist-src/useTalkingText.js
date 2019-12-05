import { useState, useEffect } from "react";
import { cassetteFromString, playedStrings } from "./Cassette";
import renderText from "./renderText";
import useTalkingTimeout from "./useTalkingTimeout";
function useTalkingText(text, options = {}) {
    const [cassette, setCassette] = useState(cassetteFromString(text));
    useEffect(() => {
        setCassette(cassetteFromString(text));
    }, [text]);
    const [skip, rewind] = useTalkingTimeout(setCassette, cassette, options);
    return [
        renderText([playedStrings(cassette).join(""), options]),
        skip,
        rewind
    ];
}
export default useTalkingText;
