import React, { useState } from "react";
import Uses from "./content/Uses";
import WhatIsIt from "./content/WhatIsIt";
import { css } from "linaria";
import { AutoString, Pace } from "auto-strings";

const rootStyle = css`
  padding: 0;
  margin: 0;
`;

const contentStyle = css`
  margin: auto;
  max-width: 32em;
  padding-bottom: 7em;
`;

const titleStyle = css`
  margin: auto;
  font-size: 36pt;
  font-family: sans-serif;
  text-align: center;
  padding: 1em 0;
`;

export const SectionFocusContext = React.createContext<{
  activeSectionID: string | null;
  setActiveSectionID: Function;
}>({
  activeSectionID: null,
  setActiveSectionID: () => {}
});

const App: React.FC = () => {
  const [activeSectionID, setActiveSectionID] = useState<string | null>(null);

  return (
    <div className={rootStyle}>
      <AutoString>
        <div className={titleStyle}>
          <Pace ms={100}>{"auto-strings"}</Pace>
        </div>
      </AutoString>
      <SectionFocusContext.Provider
        value={{
          activeSectionID,
          setActiveSectionID
        }}
      >
        <div className={contentStyle}>
          <WhatIsIt />
          <Uses />
        </div>
      </SectionFocusContext.Provider>
    </div>
  );
};

export default App;
