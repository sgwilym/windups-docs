import React from "react";
import Section from "../Section";
import Dialog from "../Dialog";
import Snob from "../performers/Snob";
import FanGirl from "../performers/Fangirl";
import DialogElement from "../DialogElement";
import Bat from "../performers/Bat";
import { Pause } from "auto-strings";

const Overview = () => {
  return (
    <Section title={"Your first auto-string"}>
      <Dialog>
        <Snob>
          {"All right. Let's suppose you wanted to use an auto-string."}
        </Snob>
        <FanGirl>{"!!!"}</FanGirl>
        <Snob>
          {"Hypothetically."}
          <Pause ms={400} />
          {"Where would you you start?"}
        </Snob>
        <FanGirl autoProceed>
          {"Here's an example demonstrating the useAutoString hook..."}
          <Pause ms={400} />
        </FanGirl>
        <DialogElement autoProceed>
          {"(hook example)"}
          <Pause ms={2000} />
        </DialogElement>
        <Snob>{"Straightforward enough."}</Snob>
        <FanGirl autoProceed>
          {
            "Right? And there's ways to skip or rewind the effect, fire a function when a character appears, set the pace of th-"
          }
        </FanGirl>
        <Snob>{"I knew I'd spoken to soon..."}</Snob>
        <Snob>{"Wait. I see a problem."}</Snob>
        <FanGirl>{"Oh?"}</FanGirl>
        <Snob>
          {
            "What if I'd want to emphasise part of the text, so that it was 'Something like _this_'?"
          }
        </Snob>
        <FanGirl>
          {
            "The hook only gives you back a string, which makes it difficult to style in complex ways..."
          }
        </FanGirl>
        <Snob autoProceed>
          {
            "Hah! Thought so. I can smell a half-baked library from a mile away. The JavaScript ecosystem, it's all fashion and n-"
          }
        </Snob>
        <FanGirl>{"And that's where the component comes in!"}</FanGirl>
        <DialogElement>(component example)</DialogElement>
        <Snob>{"Huh."}</Snob>
        <FanGirl>{"(smugness intensifies)"}</FanGirl>
        <Snob>{"So wait, what if I put an image in there?"}</Snob>
        <FanGirl>
          {"It'll treat it as a character of your auto-string."}
        </FanGirl>
        <Snob>
          {
            "It's not really an auto-string, then, is it? It's more like auto... stuff."
          }
        </Snob>
        <FanGirl>{"..."}</FanGirl>
        <Snob>{"..."}</Snob>
        <FanGirl>
          {"Let's take a look at this chart I made comparing the two!"}
        </FanGirl>
        <DialogElement>(chart)</DialogElement>
        <Snob autoProceed>{"All this... for a typewriter effect?"}</Snob>
        <Bat autoProceed>{"Kweeeee!"}</Bat>
        <Snob>{"Argh! Not in my hair!"}</Snob>
        <FanGirl>
          {
            "So in brief: use the hook when all you need is a string, and the component for more complex content!"
          }
        </FanGirl>
      </Dialog>
    </Section>
  );
};

export default Overview;
