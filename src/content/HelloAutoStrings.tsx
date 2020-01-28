import React from "react";
import Section from "../Section";
import Dialog from "../Dialog";
import Snob from "../performers/Snob";
import FanGirl from "../performers/Fangirl";
import DialogElement from "../DialogElement";
import Bat from "../performers/Bat";
import { Pause } from "auto-strings";
import Clive from "../performers/Clive";

const HelloAutoStrings = () => {
  return (
    <Section title={"Your first auto-string"}>
      <Dialog>
        <Snob>{"So, quick question..."}</Snob>
        <FanGirl>{"What's up?"}</FanGirl>
        <Snob autoProceed>
          {"Let's say, hypothetically, I was interested in using an aut-"}
        </Snob>
        <DialogElement autoProceed>{"*Knock Knock*"}</DialogElement>
        <Clive>{"Mornin'. You open?"}</Clive>
        <FanGirl>{"Yes, we're open. Please come right in!"}</FanGirl>
        <Snob>{"(... wait. Where are we? When did she open a shop?)"}</Snob>
        <Clive>
          {
            "Thanks. 'Me mates told me this was the place to get an auto-string."
          }
        </Clive>
        <FanGirl>{"That's us! How can I help you?"}</FanGirl>
        <Clive>
          {
            "Well... my anniversary's coming up and I thought I'd get one for me wife."
          }
        </Clive>
        <Snob>{"Excuse me... get one what?"}</Snob>
        <Clive>{"'You listening? An auto-string, innit."}</Clive>
        <Snob autoProceed>
          {"How..."}
          <Pause ms={500} />
          {"romantic."}
        </Snob>
        <FanGirl>{"Yes! That's a lovely idea."}</FanGirl>
        <Clive autoProceed>
          {'Great. Could you write: "to my fluffy angel, from your fuzzy-'}
        </Clive>
        <Snob autoProceed>{"Oh boy."}</Snob>
        <FanGirl>
          {"Before we get into that, I've got an idea, mister...?"}
        </FanGirl>
        <Clive>{"Call me Clive."}</Clive>
        <FanGirl>
          {
            "Clive. I have an idea. Wouldn't it be so much more lovely if you wrote the auto-string yourself?"
          }
        </FanGirl>
        <Clive>{"Ah, I getcha. Give it the personal touch."}</Clive>
        <Clive>
          {"Is it 'ard? I ain't never wrote no auto-string before."}
        </Clive>
        <Snob>{"(this ought to be good.)"}</Snob>
        <FanGirl>{"Nothing simpler! Look, just type here with me..."}</FanGirl>
        <DialogElement autoProceed>
          {"hook example"}
          <Pause ms={2000} />
        </DialogElement>
        <Snob>
          {"Are you absolutely sure you don't want to get her some flowers?"}
        </Snob>
        <Clive>{"She's gunna love it!"}</Clive>
        <Clive>{"Oi, that's one of them new React hooks, ain't it?"}</Clive>
        <FanGirl>{"Well spotted, Clive!"}</FanGirl>
        <Snob>
          {
            "So... you give the hook a string, and then it returns you a bit of the string at a time?"
          }
        </Snob>
        <FanGirl>{"That's all there is to it."}</FanGirl>
        <Clive>{"What do you think looks nicer... black or green?"}</Clive>
        <DialogElement>{"(styled hook example)"}</DialogElement>
        <FanGirl>{"Well, what does your wife like best?"}</FanGirl>
        <Clive>{"Hmm..."}</Clive>
        <Clive>
          {
            "Well she likes a bit of green. But not too much or it looks garish, she says."
          }
        </Clive>
        <Clive>{"!"}</Clive>
        <Clive>{'Could I make it so only "hubby-hun" is green?'}</Clive>
        <Snob>
          {
            "I hate to say this, Clive, but that looks like it could be kind of difficult with this API."
          }
        </Snob>
        <Clive>{"You what?"}</Clive>
        <FanGirl>
          {
            "He's right... because all the hook gives you back is a string, it's difficult to style only specific parts of it."
          }
        </FanGirl>
        <Snob autoProceed>
          {
            "Though I'm sure your wife will be very understanding when you explain the limitations of this javascript library..."
          }
        </Snob>
        <FanGirl>{"Luckily I've got just the thing!"}</FanGirl>
        <DialogElement autoProceed>{"component example"}</DialogElement>
        <Clive>{"Noice!"}</Clive>
        <Snob>{"Huh."}</Snob>
        <FanGirl>
          {
            "With the AutoString component, you can control the presentation of every aspect of your auto-string!"
          }
        </FanGirl>
        <Snob>{"Wait. So what if I put an image in there?"}</Snob>
        <FanGirl>
          {"Well... it'd treat it as a character of your auto-string."}
        </FanGirl>
        <Snob>
          {
            "It's not really an auto-string then, is it? More like... auto-stuff."
          }
        </Snob>
        <FanGirl>{"..."}</FanGirl>
        <Snob>{"..."}</Snob>
        <Clive autoProceed>
          {"..."}
          <Pause ms={1000} />
        </Clive>
        <Clive>{"Don't be a twit, mate."}</Clive>
        <Snob autoProceed>{"But-"}</Snob>
        <Clive>{"I think my wife's gunna love this. Cheers!"}</Clive>
        <FanGirl>{"Any time!"}</FanGirl>
        <Snob>{"..."}</Snob>
        <FanGirl>
          {"What a nice man. Don't you think so,"}
          <Pause ms={1000} />
          {"mate?"}
        </FanGirl>
        <Snob>{"Oh don't you start."}</Snob>
      </Dialog>
    </Section>
  );
};

export default HelloAutoStrings;
