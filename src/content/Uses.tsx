import React from "react";
import Section from "../Section";
import Dialog from "../Dialog";
import DialogElement from "../DialogElement";

const Uses: React.FC = () => {
  return (
    <Section title={"What's it good for?"}>
      <Dialog>
        <DialogElement>
          {
            "So — I can appreciate all the effort you’ve made here — but I don’t happen to be making a video game from the early 90s."
          }
        </DialogElement>
        <DialogElement>{"But..."}</DialogElement>
        <DialogElement>{"Goodbye!"}</DialogElement>
        <DialogElement>{"Stop right there."}</DialogElement>
        <DialogElement>{"E-excuse me, you are…?"}</DialogElement>
        <DialogElement autoProceed>
          {
            "I'm a Blood-Crazed Bat. A level four Blood-Crazed Bat, if you must ask."
          }
        </DialogElement>
        <DialogElement autoProceed>{"I didn't-"}</DialogElement>
        <DialogElement>
          {
            "So I hear you have your doubts about auto-strings in the era of Y2K."
          }
        </DialogElement>
        <DialogElement>
          {
            "You think it's just for chats between little cartoons, huh? You've got it all wrong, friend. Auto-strings can do so much more."
          }
        </DialogElement>
        <DialogElement>{"Yeah!"}</DialogElement>
        <DialogElement>
          {
            "Oh please. I have customers to serve! Targets to meet! What could you know about making apps?"
          }
        </DialogElement>
        <DialogElement>
          {
            "You think because I'm only level four, I can't learn JavaScript? That I can't design a product?"
          }
        </DialogElement>
        <DialogElement autoProceed>
          {"No, your level isn't really what's I'm worried about-"}
        </DialogElement>
        <DialogElement>
          {
            "Let's be real. You can't make ends meet through random battle encounters. Not in this economy."
          }
        </DialogElement>
        <DialogElement>{"So you taught yourself JavaScript?"}</DialogElement>
        <DialogElement>
          {"Typescript too. I can do a bit of Elm, also."}
        </DialogElement>
        <DialogElement>{"Is this really happening..?"}</DialogElement>
        <DialogElement>
          {
            "So listen up! Here are some ways you can use this library in your apps, however professional they are! Kweeeee!"
          }
        </DialogElement>
        <DialogElement autoProceed>
          {"Example 1: Order Confirmation"}
        </DialogElement>
        <DialogElement>
          {
            "Auto-strings excel at four jobs: impact, attention, retention, and warmth!"
          }
        </DialogElement>
        <DialogElement>{"But how?"}</DialogElement>
        <DialogElement autoProceed>
          {"Look at this order confirmation page..."}
        </DialogElement>
        <DialogElement>{"(order confirmation)"}</DialogElement>
        <DialogElement>{"It looks fine to me."}</DialogElement>
        <DialogElement>{"Wrong! It lacks impact! Kweeee!"}</DialogElement>
        <DialogElement autoProceed>
          {"(order confirmation with autostrings)"}
        </DialogElement>
        <DialogElement>{"Look how much more impactful that is!"}</DialogElement>
        <DialogElement>{"Wow!"}</DialogElement>
      </Dialog>
    </Section>
  );
};

export default Uses;
