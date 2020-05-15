import React, { useContext } from "react";
import Section from "../Section";
import Dialog, { DialogChildContext } from "../Dialog";
import Frog from "../performers/Frog";
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
      onFinished: proceed,
    }
  );

  return <div>{text}</div>;
};

const BetterExample = () => {
  const { proceed } = useContext(DialogChildContext);
  const [text] = useWindupString(
    "Hello friend. I am definitely a living thing and not a computer. Ha ha ha",
    {
      onFinished: proceed,
    }
  );

  return <div>{text}</div>;
};

const PaceStringExample = () => {
  const { proceed } = useContext(DialogChildContext);

  const [text] = useWindupString("I'm thinking really hard.", {
    onFinished: proceed,
    pace: (char) => (char === " " ? 600 : 40),
  });

  return <div>{text}</div>;
};

const PaceComponentExample = () => {
  const { proceed } = useContext(DialogChildContext);

  return (
    <WindupChildren onFinished={proceed}>
      {"Didn't you hear me the first time? "}
      <Pace getPace={(char) => (char === " " ? 600 : 40)}>
        {"I'm thinking really hard."}
      </Pace>
    </WindupChildren>
  );
};

const PacingPausing = () => {
  return (
    <Section id={"timing"} title={"Getting timing right"}>
      <Dialog>
        <Frog>
          {
            "By default, we try to breathe a little life into yer windups by changing the timing depending on which character's being printed."
          }
        </Frog>
        <Frog autoProceed>
          {"Without it, it can come off a "}
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
            "But maybe you want faster text. Or you have text in a language other than English (the default pacing is built around English language text)... luckily we've got the tools to help you out."
          }
        </Frog>
        <Frog>{"Here's a simple example that slows down between words."}</Frog>
        <CodeExample>{PACE_HOOK_EXAMPLE}</CodeExample>
        <Example>
          <PaceStringExample />
        </Example>
        <Frog>
          {
            "Pace is just a function that takes a character and returns a number of milliseconds."
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
            "Speaking of WindupChildren... if you're trying to get your timing right there's one component you'll need."
          }
        </Frog>
      </Dialog>
    </Section>
  );
};

export default PacingPausing;
