import React from "react";
import Section from "../Section";
import Dialog from "../Dialog";
import Snob from "../performers/Snob";
import FanGirl from "../performers/Fangirl";
import Hothead from "../performers/Hothead";
import Dude from "../performers/Dude";
import { Pause } from "auto-strings";
import DialogElement from "../DialogElement";
import SkipEffect from "../SkipEffect";
import RewindEffect from "../RewindEffect";

const Controlling = () => {
  return (
    <Section title={"Controlling auto-strings"}>
      <Dialog>
        <Hothead>{"Too slow!"}</Hothead>
        <Dude>{"Too fast, man..."}</Dude>
        <FanGirl>{"I wonder what's up with those two?"}</FanGirl>
        <Snob>{"Try not to make eye contact."}</Snob>
        <Hothead>{"I spend half my day waiting around for you!"}</Hothead>
        <Dude>
          {
            "Well, like, why can't you just ease up and, like, smell the roses, man?"
          }
        </Dude>
        <Hothead>
          {
            "Because all the roses are dead. They died waiting for you to water them."
          }
        </Hothead>
        <Dude autoProceed>
          {"Dude, that's so..."}
          <Pause ms={500} />
          {"sad."}
          <Pause ms={1000} />
        </Dude>
        <Snob>{"Do you ever think about moving far, far away?"}</Snob>
        <FanGirl>{"C'mon, I think we can help these two!"}</FanGirl>
        <FanGirl>{"Excuse me."}</FanGirl>
        <Hothead>{"..."}</Hothead>
        <Dude>{"..."}</Dude>
        <FanGirl>{"Sirs."}</FanGirl>
        <FanGirl>{"You seem troubled. What's the problem?"}</FanGirl>
        <Hothead>
          {
            "Huff. The problem is that in the time it takes for my friend here to finish a sentence, civilisations rise and fall."
          }
        </Hothead>
        <Dude autoProceed>
          {
            "A gross exaggeration, man. Speech is beautiful, yeah? Our ancestors were steeped in a rich oral culture, which-"
          }
        </Dude>
        <Snob>
          {"You mentioned something about being able to help these two?"}
        </Snob>
        <FanGirl autoProceed>
          {
            "Yeah! Aside from being able to control auto-string timing with paces and pauses-"
          }
        </FanGirl>
        <Dude autoProceed>{"...?"}</Dude>
        <Snob>{"Covered in another section, sorry."}</Snob>
        <FanGirl>
          {"... there are also ways to skip and rewind auto-strings."}
        </FanGirl>
        <FanGirl autoProceed>
          {
            "So if you ever get bored of waiting for an auto-string to finish writing out..."
          }
        </FanGirl>
        <Hothead autoProceed>{"Gods yes!"}</Hothead>
        <DialogElement>{"(hook skip example)"}</DialogElement>
        <Hothead>{"Finally!"}</Hothead>
        <FanGirl>
          {
            "And if you want to savour an auto-string, or just plain missed it, you can rewind too!"
          }
        </FanGirl>
        <DialogElement>{"(rewind hook example)"}</DialogElement>
        <Dude>
          {
            "Dude. It's so good to talk to someone who really gets the little things... y'know?"
          }
        </Dude>
        <Snob>{"Ahem."}</Snob>
        <FanGirl>{"What?"}</FanGirl>
        <Snob>{"Aren't you forgetting something?"}</Snob>
        <FanGirl>{"I am?"}</FanGirl>
        <Snob>
          {
            "How does this work with the AutoString component? I don't want to have to go through this again when one of them decides to start emphasising their words in orange."
          }
        </Snob>
        <FanGirl>{"I almost forgot! Hey..."}</FanGirl>
        <Hothead>{"This is absolutely amazing."}</Hothead>
        <Dude>
          {"Hey, wait up... "}
          <SkipEffect />
          {"this isn't funny, man!"}
        </Dude>
        <Hothead>{"It's music to my ears!"}</Hothead>
        <Dude>
          {"This is... "}
          <SkipEffect />
          {"not respectful of my agency, dude!"}
        </Dude>
        <FanGirl>
          {
            "Uh. So if you want to skip and rewind with the AutoString component..."
          }
        </FanGirl>
        <Hothead>
          {"What will I do with all the time this has freed up?"}
        </Hothead>
        <Dude>
          {"Okay... "}
          <SkipEffect />
          {"no more mister nice dude!"}
        </Dude>
        <Snob>{"I'm listening."}</Snob>
        <FanGirl>
          {
            "You'll need to make use of the useSkip and useRewind hooks. It's a little more complicated, so check this out..."
          }
        </FanGirl>
        <DialogElement>{"(component example)"}</DialogElement>
        <Snob>{"I can see why you did it that way."}</Snob>
        <Hothead autoProceed>
          {"Hey, what's going on???"}
          <Pause ms={500} />
          <RewindEffect />
        </Hothead>
        <Dude>{"There, now I can really appreciate how you speak, man."}</Dude>
        <Hothead autoProceed>
          {"Wait, this isn't funny! I'm sorry!"}
          <Pause ms={500} />
          <RewindEffect />
        </Hothead>
        <Dude>
          {"I'm just gonna like, relish your words for a little bit..."}
        </Dude>
        <FanGirl>{"About your question earlier."}</FanGirl>
        <Snob>{"?"}</Snob>
        <FanGirl>{"I do sometimes think of moving far, far away."}</FanGirl>
      </Dialog>
    </Section>
  );
};

export default Controlling;
