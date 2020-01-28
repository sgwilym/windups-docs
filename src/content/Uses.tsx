import React from "react";
import Section from "../Section";
import Dialog from "../Dialog";
import DialogElement from "../DialogElement";
import Snob from "../performers/Snob";
import Fangirl from "../performers/Fangirl";
import Bat from "../performers/Bat";
import Subheading from "../Subheading";
import { Pause } from "auto-strings";

const Uses: React.FC = () => {
  return (
    <Section title={"What's it good for?"}>
      <Dialog>
        <Snob>
          {
            "So — I can appreciate all the effort you’ve made here — but I don’t happen to be making a video game from the early nineties."
          }
        </Snob>
        <Fangirl>{"But..."}</Fangirl>
        <Snob>{"Goodbye!"}</Snob>
        <Bat>{"Hold it right there."}</Bat>
        <Snob>{"E-excuse me, you are…?"}</Snob>
        <Bat autoProceed>
          {
            "I'm a Blood-Crazed Bat. A Level Four Blood-Crazed Bat, if you must ask."
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
            "You think it's just for chats between little cartoons, right? You've got it all wrong. Auto-strings can do so much more."
          }
        </Bat>
        <Fangirl>{"Yeah! That's right!"}</Fangirl>
        <Snob>
          {
            'Oh please. I have customers to serve! Targets to meet! What possible use would I have for an "auto-string"? Why would I listen to you?'
          }
        </Snob>
        <Bat>
          {
            "You think because I'm only level four, I can't design a world-class product? That I can't learn JavaScript?"
          }
        </Bat>
        <Snob autoProceed>
          {"No, your level isn't really what I'm worried abou-"}
        </Snob>
        <Bat>
          {
            "Let's be real. You can't make ends meet attacking wandering townspeople. Not in this economy."
          }
        </Bat>
        <Fangirl>{"So you taught yourself JavaScript?"}</Fangirl>
        <Bat>{"Typescript too. I can do a bit of Elm, also."}</Bat>
        <Snob>{"Is this really happening...?"}</Snob>
        <Bat>
          {
            "So listen up! Here are some ways you can use auto-strings in your apps, whatever they're for! Kweeeee!"
          }
        </Bat>
        <DialogElement autoProceed>
          <Subheading>{"Example 1: Order Confirmation"}</Subheading>
        </DialogElement>
        <Bat autoProceed>
          {"Here's a little something I whipped up for a client..."}
        </Bat>
        <Snob>{"(I wonder if his clients know he's a bat?)"}</Snob>
        <DialogElement autoProceed>{"(order confirmation)"}</DialogElement>
        <Snob>{"I'm pleasantly surprised. This is decent."}</Snob>
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
        <Snob>
          {
            "But it's going to take more than that to convince me. What else have you got?"
          }
        </Snob>
        <DialogElement autoProceed>
          <Subheading>{"Example: Chat Room"}</Subheading>
        </DialogElement>
        <Bat>{"Here's a conversation I had with my associates last week."}</Bat>
        <DialogElement>{"(chat room example)"}</DialogElement>
        <Fangirl>{"Your friends seem nice."}</Fangirl>
        <Snob>
          {"I'm learning more today than I ever thought or wanted to."}
        </Snob>
        <Bat autoProceed>
          {"And you're about to learn a little bit more, kweee!"}
        </Bat>
        <DialogElement>{"(chat room with auto-strings example)"}</DialogElement>
        <Fangirl>
          {
            "Cool, now it's like they're really talking! It's so much warmer this way."
          }
        </Fangirl>
        <Snob>{"I admit that it's a charming effect..."}</Snob>
        <Snob>
          {
            "But it's still just fluff. Decoration. Can an auto-string do anything to make my products better?"
          }
        </Snob>
        <Bat>{"I was hoping you'd ask that."}</Bat>
        <DialogElement autoProceed>
          <Subheading>{"Example 3: Sales Prices"}</Subheading>
        </DialogElement>
        <Bat>{"Check out this list of products."}</Bat>
        <DialogElement>{"List of products"}</DialogElement>
        <Snob>{"Okay..."}</Snob>
        <Bat>{"Notice that the third item's on sale?"}</Bat>
        <Snob autoProceed>
          {
            "I didn't, actually. Now that you mention it, I've been looking for a new pair..."
          }
        </Snob>
        <Bat autoProceed>{"Now pay attention! Kweee!"}</Bat>
        <DialogElement>{"(sale prices are now auto stringed)"}</DialogElement>
        <Fangirl>{"Hey, those sales prices are hard to miss now!"}</Fangirl>
        <Bat>
          {
            "Exactly. Used tastefully, you can use an auto-strings' movement to draw the eye."
          }
        </Bat>
        <Bat>{"... just don't overdo it."}</Bat>
        <Snob>{"I'll try to hold back."}</Snob>
        <Bat>{"Still not convinced, huh?"}</Bat>
        <DialogElement autoProceed>
          <Subheading>{"Example 4: Engagement with long texts"}</Subheading>
        </DialogElement>
        <Snob>{"Hold on. How's an auto-string supposed to do that?"}</Snob>
        <Bat>{"We've been talking for a pretty long time, right?"}</Bat>
        <Snob autoProceed>{"Yeah. What's that got to do with...?"}</Snob>
        <Fangirl>{"..."}</Fangirl>
        <Snob>
          {"Oh."}
          <Pause ms={500} />
          {"Oh."}
        </Snob>
        <Snob>
          {"I feel... tricked"}
          <Pause ms={200} />
          {"somehow."}
        </Snob>
        <Fangirl>
          {
            "Nobody tricked you, silly. Instead of making a superficial judgement about whether to read something based on how long it was, you engaged with the text on its own merits."
          }
        </Fangirl>
        <Bat>
          {
            "Quite. It requires finesse, but auto-strings can be used to engage users with texts that they might be intimidated by."
          }
        </Bat>
        <Snob>{"A kind of TL;DR insurance, so to speak."}</Snob>
        <Fangirl>
          {
            "So you can use auto-strings for impact, warmth, attention and engagement. How cool is that?!"
          }
        </Fangirl>
        <Snob>{"(sigh...) I guess it's kind of cool."}</Snob>
        <Bat>{"It seems my job here is done."}</Bat>
        <Bat>{"Kweee!"}</Bat>
        <Snob>{"Wait!"}</Snob>
        <Fangirl>{"What's wrong?"}</Fangirl>
        <Snob>{"I wanted to ask him if he was available for work..."}</Snob>
      </Dialog>
    </Section>
  );
};

export default Uses;
