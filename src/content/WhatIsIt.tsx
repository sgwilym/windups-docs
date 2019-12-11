import React from "react";
import Section from "../Section";
import Dialog from "../Dialog";
import DialogElement from "../DialogElement";
import { Pace, Pause } from "auto-strings";

const WhatIsIt: React.FC = () => {
  return (
    <Section title={"What's an auto-string?"}>
      <Dialog>
        <DialogElement>
          {"It's like text that builds itself! Wanna see?"}
        </DialogElement>
        <DialogElement autoProceed>
          <Pace getPace={char => (char === "." ? 200 : 70)}>
            {
              "THIS IS AN AUTO-STRING. PREVIOUSLY THOUGHT IMPOSSIBLE BY COMPUTER SCIENTISTS, NOW THE TECHNOLOGY OF TOMORROW IS HERE... TODA-"
            }
          </Pace>
        </DialogElement>
        <DialogElement>{"Oh, so it's a typewriter effect."}</DialogElement>
        <DialogElement>
          {"..."}
          <Pause ms={500} />
          {"what's a typewriter?"}
        </DialogElement>
        <DialogElement>{"Never mind."}</DialogElement>
      </Dialog>
    </Section>
  );
};

export default WhatIsIt;
