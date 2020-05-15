import React from "react";
import GuidesHelp from "../guides/GuidesHelp";
import Install from "../guides/Install";
import HookIntro from "../guides/HookIntro";
import StyledText from "../guides/StyledText";
import WindupsWithAnything from "../guides/WindupsWithAnything";
import StylingCharacters from "../guides/StylingCharacters";
import Timing from "../guides/Timing";
import SkipRewind from "../guides/SkipRewind";
import Effects from "../guides/Effects";
import Linebreaking from "../guides/Linebreaking";
import SectionFocusContext from "../SectionFocusContext";
import Heading from "../Heading";

const Guides: React.FC = () => {
  const [activeSectionID, setActiveSectionID] = React.useState<string | null>(
    null
  );

  return (
    <SectionFocusContext.Provider
      value={{
        activeSectionID,
        setActiveSectionID,
      }}
    >
      <Heading>{"Guides"}</Heading>
      <GuidesHelp />
      <Install />
      <HookIntro />
      <StyledText />
      <WindupsWithAnything />
      <StylingCharacters />
      <Timing />
      <SkipRewind />
      <Effects />
      <Linebreaking />
    </SectionFocusContext.Provider>
  );
};

export default Guides;