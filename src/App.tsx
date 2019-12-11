import React from "react";
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

const App: React.FC = () => {
  return (
    <div className={rootStyle}>
      <AutoString>
        <div className={titleStyle}>
          <Pace ms={100}>{"auto-strings"}</Pace>
        </div>
      </AutoString>
      <div className={contentStyle}>
        <WhatIsIt />
        <Uses />
      </div>
    </div>
  );
};

export default App;
