import React from "react";
import Section from "../Section";
import Dialog from "../Dialog";
import Snob from "../performers/Snob";
import FanGirl from "../performers/Fangirl";
import DialogElement from "../DialogElement";

const Decorating = () => {
  return (
    <Section title={"Styling auto-strings"}>
      <Dialog>
        <FanGirl>
          {
            "Do you know the old saying: 'an auto-string is great, but a styled auto-string is divine'?"
          }
        </FanGirl>
        <Snob>{"I'm fairly sure no-one has ever said that."}</Snob>
        <FanGirl>
          {"Well, it's true! And I'm styling some auto-strings right now!"}
        </FanGirl>
        <DialogElement autoProceed>{"styled example"}</DialogElement>
        <Snob>{"Breathtaking."}</Snob>
        <FanGirl autoProceed>
          {"Right?! Wait you're being sarcastic aren't you"}
        </FanGirl>
        <Snob>
          {
            "Is there something you want to show me other than your mastery of CSS shadows?"
          }
        </Snob>
        <FanGirl>
          {
            "Okay... so I want to make it so that when each character appears, it's like it's falling from the sky..."
          }
        </FanGirl>
        <Snob>{"A true artist of our times."}</Snob>
        <DialogElement autoProceed>{"styled example"}</DialogElement>
        <FanGirl>{"Notice anything?"}</FanGirl>
        <Snob>{"Aside from a slight headache...?"}</Snob>
        <Snob>
          {"... wrapping each character in its own tag seems pretty annoying."}
        </Snob>
        <FanGirl>
          {
            "That's right, styling characters individually is a drag. And that's where CharWrapper steps in!"
          }
        </FanGirl>
        <DialogElement autoProceed>
          {"styled charwrapper example"}
        </DialogElement>
        <Snob>{"It's easier to change now, at least."}</Snob>
      </Dialog>
    </Section>
  );
};

export default Decorating;
