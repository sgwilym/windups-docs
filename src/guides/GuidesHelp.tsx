import React from "react";
import Section from "../Section";
import Dialog from "../Dialog";
import Frog from "../performers/Frog";
import { Pace, Pause } from "windups";
import SmashEffect from "../SmashEffect";
import { Emphasis, Dropped } from "../Char";

function getRandomArbitrary(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

const GuidesHelp: React.FC = () => {
  return (
    <Section id={"guide-tips"} title={"First time here? Using a keyboard?"}>
      <Dialog>
        <Frog>
          {
            "If you're going to read a few of these guides, it's worth learning a few little tricks."
          }
        </Frog>
        <Frog autoProceed>
          {"Like you can continue to the next bit of dialogue by pressing "}
          <Emphasis>{"return"}</Emphasis>
          {" or the "}
          <Emphasis>{"right arrow key."}</Emphasis>
          {" Life changing, right?"}
          <Pause ms={500} />
        </Frog>
        <Frog expression={"HAPPY"}>{"Give it a go!"}</Frog>
        <Frog autoProceed expression={"MAD"}>
          <SmashEffect />
          {"Ow! Did you have to press so hard?!"}
          <Pause ms={300} />
        </Frog>
        <Frog>
          {
            "Oh, and if you're the impatient type, pressing either of these keys will "
          }
          <Emphasis>{"fast forward"}</Emphasis>
          {" what I'm sayin'."}
        </Frog>
        <Frog autoProceed expression={"SMUG"}>
          <Pace getPace={() => getRandomArbitrary(150, 200)}>
            <Dropped>{"But why would you want to do that?"}</Dropped>
          </Pace>
        </Frog>
        <Frog autoProceed expression={"SHAME"}>
          <SmashEffect />
          {"All right, I was just havin' some fun."}
          <Pause ms={500} />
        </Frog>
        <Frog>
          {
            "One last thing. If you fancy seeing a bit of dialog play out again — I dunno, some people say they like my voice's timbre — you can press the "
          }
          <Emphasis>{"left arrow key"}</Emphasis>
          {" to restart it."}
        </Frog>
        <Frog>{"Now you know the secrets. Happy readin'."}</Frog>
      </Dialog>
    </Section>
  );
};

export default GuidesHelp;
