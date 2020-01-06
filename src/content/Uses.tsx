import React from "react";
import Section from "../Section";
import Dialog from "../Dialog";
import DialogElement from "../DialogElement";
import Snob from "../performers/Snob";
import Fangirl from "../performers/Fangirl";
import Bat from "../performers/Bat";
import Subheading from "../Subheading";

const Uses: React.FC = () => {
  return (
    <Section title={"What's it good for?"}>
      <Dialog>
        <Snob>
          {
            "So — I can appreciate all the effort you’ve made here — but I don’t happen to be making a video game from the early 90s."
          }
        </Snob>
        <Fangirl>{"But..."}</Fangirl>
        <Snob>{"Goodbye!"}</Snob>
        <Bat>{"Stop right there."}</Bat>
        <Snob>{"E-excuse me, you are…?"}</Snob>
        <Bat autoProceed>
          {
            "I'm a Blood-Crazed Bat. A level four Blood-Crazed Bat, if you must ask."
          }
        </Bat>
        <Snob autoProceed>{"I didn't-"}</Snob>
        <Bat>
          {
            "So I hear you have your doubts about auto-strings in the era of Y2K."
          }
        </Bat>
        <Bat>
          {
            "You think it's just for chats between little cartoons, huh? You've got it all wrong, friend. Auto-strings can do so much more."
          }
        </Bat>
        <Fangirl>{"Yeah! That's right!"}</Fangirl>
        <Snob>
          {
            "Oh please. I have customers to serve! Targets to meet! What could you know about making apps?"
          }
        </Snob>
        <Bat>
          {
            "You think because I'm only level four, I can't learn JavaScript? That I can't design a world-class product?"
          }
        </Bat>
        <Snob autoProceed>
          {"No, your level isn't really what I'm worried abou-"}
        </Snob>
        <Bat>
          {
            "Let's be real. You can't make ends meet through random battle encounters. Not in this economy."
          }
        </Bat>
        <Fangirl>{"So you taught yourself JavaScript?"}</Fangirl>
        <Bat>{"Typescript too. I can do a bit of Elm, also."}</Bat>
        <Snob>{"Is this really happening..?"}</Snob>
        <Bat>
          {
            "So listen up! Here are some ways you can use this library in your apps, however professional they are! Kweeeee!"
          }
        </Bat>
        <DialogElement autoProceed>
          <Subheading>{"Example 1: Order Confirmation"}</Subheading>
        </DialogElement>
        <Bat>
          {
            "Auto-strings excel at four jobs: impact, attention, retention, and warmth!"
          }
        </Bat>
        <Fangirl>{"But how can they do all that?"}</Fangirl>
        <Bat autoProceed>{"Look at this order confirmation page..."}</Bat>
        <DialogElement>{"(order confirmation)"}</DialogElement>
        <Snob>{"It looks fine to me."}</Snob>
        <Bat>{"Wrong! It lacks impact! Kweeee!"}</Bat>
        <DialogElement autoProceed>
          {"(order confirmation with autostrings)"}
        </DialogElement>
        <Bat>{"Look how much more impactful that is with an auto-string!"}</Bat>
        <Fangirl>{"Wow!"}</Fangirl>
        <Snob>
          {"I suppose it's a "}
          <em>{"slight "}</em>
          {"improvement..."}
        </Snob>
      </Dialog>
    </Section>
  );
};

export default Uses;
