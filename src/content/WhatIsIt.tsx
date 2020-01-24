import React from "react";
import Section from "../Section";
import Dialog from "../Dialog";
import DialogElement from "../DialogElement";
import { Pace, Pause } from "auto-strings";
import Snob from "../performers/Snob";
import Fangirl from "../performers/Fangirl";

function examplePace(char: string) {
  switch (char) {
    case ".":
      return 150;
    case " ":
      return 0;
    default:
      return 60;
  }
}

const WhatIsIt: React.FC = () => {
  return (
    <Section title={"What's an auto-string?"}>
      <Dialog>
        <Fangirl>{"It's like text that writes itself! Wanna see?"}</Fangirl>
        <DialogElement autoProceed>
          <Pace getPace={examplePace}>
            {
              "THIS IS AN AUTO-STRING. PREVIOUSLY THOUGHT IMPOSSIBLE BY COMPUTER SCIENTISTS, NOW THE TECHNOLOGY OF TOMORROW IS HERE... TODA-"
            }
          </Pace>
        </DialogElement>
        <Snob>{"Oh, so it's a typewriter effect."}</Snob>
        <Fangirl>
          {"..."}
          <Pause ms={500} />
          {"what's a typewriter?"}
        </Fangirl>
        <Snob>{"Never mind."}</Snob>
      </Dialog>
    </Section>
  );
};

export default WhatIsIt;
