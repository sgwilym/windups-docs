import React, { useContext } from "react";
import Section from "../Section";
import Dialog, { DialogChildContext } from "../Dialog";
import Frog, { ShameExpression, HappyExpression } from "../performers/Frog";
import CodeExample from "../CodeExample";
import { Pause, useWindupString, WindupChildren, Pace } from "windups";
import Example from "../Example";
import { Emphasis } from "../Char";

const PACE_HOOK_EXAMPLE = `import React from "react";
import { useWindupString } from "windups";

const ThinkingHard = () => {
  const [text] = useWindupString("I'm thinking really hard.", {
    pace: (char) => (char === " " ? 600 : 40),
  });

  return <div>{text}</div>;
};`;

const PACE_COMPONENT_EXAMPLE = `import React from "react";
import { Pace, WindupChildren } from "windups";

const SassyThinkingHard = () => {
  return (
    <WindupChildren >
      {"Didn't you hear me the first time? "}
      <Pace getPace={(char) => (char === " " ? 600 : 40)}>
        {"I'm thinking really hard."}
      </Pace>
    </WindupChildren>
  );
};`;

const RobotExample = () => {
  const { proceed } = useContext(DialogChildContext);
  const [text] = useWindupString(
    "Hello friend. I am definitely a living thing and not a computer. Ha ha ha",
    {
      pace: () => 70,
      onFinished: proceed
    }
  );

  return <div>{text}</div>;
};

const BetterExample = () => {
  const { proceed } = useContext(DialogChildContext);
  const [text] = useWindupString(
    "Hello friend. I am definitely a living thing and not a computer. Ha ha ha",
    {
      onFinished: proceed
    }
  );

  return <div>{text}</div>;
};

const PaceStringExample = () => {
  const { proceed } = useContext(DialogChildContext);

  const [text] = useWindupString("I'm thinking really hard.", {
    onFinished: proceed,
    pace: char => (char === " " ? 600 : 40)
  });

  return <div>{text}</div>;
};

const PaceComponentExample = () => {
  const { proceed } = useContext(DialogChildContext);

  return (
    <WindupChildren onFinished={proceed}>
      {"Didn't you hear me the first time? "}
      <Pace getPace={char => (char === " " ? 600 : 40)}>
        {"I'm thinking really hard."}
      </Pace>
    </WindupChildren>
  );
};

const PAUSED_CODE_EXAMPLE = `import { WindupChildren, Pause } from "windups";

const PausedExample = () => {
  return (
    <WindupChildren onFinished={proceed}>
      <p>
        {
          "I asked her: why did you do it? 
          Why did you tear apart the only lily pad I'd ever know as home?"
        }
      </p>
      <Pause ms={500}/>
      <p>
        {
          "She looked back at me with those 
          froggy little eyes of hers and croaked one word:"
        }
      </p>
      <Pause ms={800} />
      <p>
        <b>{"Pleasure."}</b>
      </p>
    </WindupChildren>
  );
};`;

const UntimedExample = () => {
  const { proceed } = useContext(DialogChildContext);

  return (
    <WindupChildren onFinished={proceed}>
      <p>
        {
          "I asked her: why did you do it? Why did you tear apart the only lily pad I'd ever know as home?"
        }
      </p>
      <p>
        {
          "She looked back at me with those froggy little eyes of hers and croaked one word:"
        }
      </p>
      <p>
        <b>{"Pleasure."}</b>
      </p>
    </WindupChildren>
  );
};

const PausedExample = () => {
  const { proceed } = useContext(DialogChildContext);

  return (
    <WindupChildren onFinished={proceed}>
      <p>
        {
          "I asked her: why did you do it? Why did you tear apart the only lily pad I'd ever know as home?"
        }
      </p>
      <Pause ms={500} />
      <p>
        {
          "She looked back at me with those froggy little eyes of hers and croaked one word:"
        }
      </p>
      <Pause ms={800} />
      <p>
        <b>{"Pleasure."}</b>
      </p>
    </WindupChildren>
  );
};

const PacingPausing = () => {
  return (
    <Section id={"timing"} title={"Pacing your windups"}>
      <Dialog>
        <Frog>
          {
            "By default, we try to breathe a little life into yer windups by changing the timing depending on which character's being printed."
          }
        </Frog>
        <Frog autoProceed>
          {"Without it, it can come off a "}
          <ShameExpression />
          <Emphasis>{"little bit unnatural"}</Emphasis>
          {"..."}
          <Pause ms={500} />
        </Frog>
        <Example>
          <RobotExample />
        </Example>
        <Frog>
          {"It just leaves you cold..."}
          <Pause ms={500} />
          {"but then look at it with the default pacing back on:"}
        </Frog>
        <Example>
          <BetterExample />
        </Example>
        <Frog>{"It's a subtle thing that makes a big difference."}</Frog>
        <Frog>
          {
            "But maybe you want faster text. Or you have text in a language other than English, which the defaults are built around..."
          }
        </Frog>
        <Frog expression={"HAPPY"}>
          {"Luckily we've got the tools to help you out."}
        </Frog>
        <Frog>{"Here's a simple example that slows down between words."}</Frog>
        <CodeExample>{PACE_HOOK_EXAMPLE}</CodeExample>
        <Example>
          <PaceStringExample />
        </Example>
        <Frog>
          <Emphasis>{"pace"}</Emphasis>
          {
            " is just a function that takes a character and returns a number of milliseconds."
          }
        </Frog>
        <Frog>
          {"Here's something similar with WindupChildren and the "}
          <Emphasis>{"Pace"}</Emphasis>
          {" component:"}
        </Frog>
        <CodeExample>{PACE_COMPONENT_EXAMPLE}</CodeExample>
        <Example>
          <PaceComponentExample />
        </Example>
        <Frog>
          {"The bonus With WindupChildren is you can "}
          <Emphasis>
            {"pace segments of text differently from each other"}
          </Emphasis>
          {"."}
        </Frog>
        <Frog>
          {
            "Now it's all very good setting the pace based on what letter's being printed, but sometimes you want to get "
          }
          <Emphasis>{"specific"}</Emphasis>
          {"."}
        </Frog>
        <Frog>
          {"Let's see how we could improve the timing of this windup."}
        </Frog>
        <Example>
          <UntimedExample />
        </Example>
        <Frog>
          {"It's got potential, but..."}
          <Pause ms={500} />
          <ShameExpression />
          {" the timing just ruins it."}
        </Frog>
        <Frog>
          {"Let's tighten it up with the "}
          <Emphasis>{"Pause"}</Emphasis>
          {" component."}
        </Frog>
        <CodeExample>{PAUSED_CODE_EXAMPLE}</CodeExample>
        <Example>
          <PausedExample />
        </Example>
        <Frog expression={"SHOCK"}>
          {"Woah."}
          <Pause ms={500} />
          {"Don't it just give you chills?"}
        </Frog>
        <Frog expression={"HAPPY"}>
          {
            "And that should give you everything you need to create an award-winning windup. See you in the next guide!"
          }
        </Frog>
      </Dialog>
    </Section>
  );
};

export default PacingPausing;
