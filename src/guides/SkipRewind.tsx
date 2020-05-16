import React, { useContext } from "react";
import Section from "../Section";
import Dialog, { DialogChildContext } from "../Dialog";
import Frog, { ShockExpression } from "../performers/Frog";
import SmashEffect from "../SmashEffect";
import { useWindupString, WindupChildren, useSkip, Pace } from "windups";
import Example from "../Example";
import CodeExample from "../CodeExample";
import { Emphasis } from "../Char";

const SKIP_HOOK_EXAMPLE = `import { useWindupString } from "windups";

const SkipHookExample = () => {
  const [text, { skip }] = useWindupString(
    "A fly? A fly! Why, oh why, would one cry for a fly?",
    {
      pace: () => 400,
      onFinished: proceed,
    }
  );

  return (
    <div>
      <div>{text}</div>
      <button onClick={skip}>{"Skip ahead"}</button>
    </div>
  );
}`;

const SkipHookExample = () => {
  const { proceed } = useContext(DialogChildContext);

  const [text, { skip }] = useWindupString(
    "A fly? A fly! Why, oh why, would one cry for a fly?",
    {
      pace: () => 400,
      onFinished: proceed
    }
  );

  return (
    <div>
      <div>{text}</div>
      <button onClick={skip}>{"Skip ahead"}</button>
    </div>
  );
};

const SKIP_CHILDREN_EXAMPLE = `import { WindupChildren, useSkip } from "windups";

const SkipButton = () => {
  const skip = useSkip();

  return <button onClick={skip}>{"Skip"}</button>;
};

const SkippableWindupChildren = () => {
  const { proceed } = useContext(DialogChildContext);

  return (
    <WindupChildren onFinished={proceed}>
      <SkipButton />
      <div>
        <Pace ms={400}>
          {"Why, if one would lie on a fly it would assuredly die."}
        </Pace>
      </div>
    </WindupChildren>
  );
};`;

const SkipButton = () => {
  const skip = useSkip();

  return <button onClick={skip}>{"Skip"}</button>;
};

const SkippableWindupChildren = () => {
  return (
    <WindupChildren>
      <SkipButton />
      <div>
        <Pace ms={400}>
          {"Why, if one would lie on a fly it would assuredly die."}
        </Pace>
      </div>
    </WindupChildren>
  );
};

const SkipAndRewind = () => {
  return (
    <Section id={"skip-rewind"} title={"Skip and Rewind"}>
      <Dialog>
        <Frog>
          {
            "If you're using windups with lots of text, you should consider the feelin's of who's reading them."
          }
        </Frog>
        <Frog>
          {
            "Much as I hate to say it, sometimes people don't want to sit through your windup song and dance. They just want to read the text."
          }
        </Frog>
        <Frog>
          {"And y'know what? I respect that. That's why there's a way to "}
          <Emphasis>{"skip"}</Emphasis>
          {" a windup."}
        </Frog>
        <CodeExample>{SKIP_HOOK_EXAMPLE}</CodeExample>
        <Example>
          <SkipHookExample />
        </Example>
        <Frog>
          {
            "I wrote that. I feel like the slow delivery gives it time to breathe, but I'm not gonna force it on anyone."
          }
        </Frog>
        <Frog>
          {
            "Anyway. Just grab the skip callback from the hook and you're good to go."
          }
        </Frog>
        <Frog>
          {
            "But how about WindupChildren? Where's the skip callback going to come from in there?"
          }
        </Frog>
        <CodeExample>{SKIP_CHILDREN_EXAMPLE}</CodeExample>
        <Example>
          <SkippableWindupChildren />
        </Example>
        <Frog>
          {
            "You mighta' noticed that in the WindupChildren example, the SkipButton's rendered at the top."
          }
        </Frog>
        <Frog expression={"SHAME"}>
          {
            "There's no easy way around this... anything using the useSkip hook needs to be rendered within WindupChildren to work. But that also makes it part of the windup effect!"
          }
        </Frog>
        <Frog expression={"HAPPY"}>
          {
            "So if that SkipButton was put below the text, it wouldn't appear until all the text had printed out... which kinda misses the point, don't it?"
          }
        </Frog>
        <Frog>
          {
            "How to get around that? Well, you could put the SkipButton first thing in the Windup but make it "
          }
          <Emphasis>{"look like it's below the text"}</Emphasis>
          {" using CSS."}
        </Frog>
        <Frog>
          {
            "Or you could do what we did here and just have an invisible key listening component rendered at the beginning!"
          }
        </Frog>
        <Frog>
          {"Well, that just about cove-"}
          <SmashEffect />
          <ShockExpression />
          {"Hold it!"}
        </Frog>
        <Frog expression={"HAPPY"}>
          {
            "I can't believe I nearly forgot. Not all people are in a hustle-bustle to skip through windups."
          }
        </Frog>
        <Frog>{"Maybe some people want to savour it."}</Frog>
        <Frog>{"Experience it over and over."}</Frog>
        <Frog expression={"HAPPY"}>
          {"In that case, there's a way to rewind the windup effect!"}
        </Frog>
        <Frog>
          {
            "It pretty much works the same way for the hook and WindupChildren. Check the docs."
          }
        </Frog>
        <Frog expression={"HAPPY"}>
          {
            "What? You were expecting more poems 'bout flies? I ain't got all day, kid."
          }
        </Frog>
      </Dialog>
    </Section>
  );
};

export default SkipAndRewind;
