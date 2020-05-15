import React, { useContext } from "react";
import Section from "../Section";
import Dialog, { DialogChildContext } from "../Dialog";
import Frog, { SmugExpression } from "../performers/Frog";
import SmashEffect from "../SmashEffect";
import CodeExample from "../CodeExample";
import Example from "../Example";
import { useWindupString } from "windups";
import { Emphasis } from "../Char";

const HOOK_EXAMPLE = `import React from "react";
import { useWindupString } from "windups";

// Make a new component
const StringyWindup = () => {
  const [text] = useWindupString("Hello world!");

  return <div>{text}</div>;
};`;

const StringyWindup = () => {
  const { proceed } = useContext(DialogChildContext);

  const [text] = useWindupString("Hello world!", {
    onFinished: proceed,
  });

  return <div>{text}</div>;
};

const HookIntro: React.FC = () => {
  return (
    <Section id={"stringy-windup"} title={"Make a stringy windup"}>
      <Dialog>
        <Frog>
          {"Okay, enough talking. Let's "}
          <SmashEffect />
          <SmugExpression />
          {"windup!"}
        </Frog>
        <Frog>
          {
            "If all you want to do is add the windup effect to a bit of text, I got just the thing. It's one of them new "
          }
          <Emphasis>{"React Hooks "}</Emphasis>
          {"you see city folk using."}
        </Frog>
        <Frog autoProceed>{"Hang on, lemme type this out..."}</Frog>
        <CodeExample>{HOOK_EXAMPLE}</CodeExample>
        <Example>
          <StringyWindup />
        </Example>
        <Frog>
          {
            "That's all. Give a string, get back a string. But now the string's all windup-like."
          }
        </Frog>
        <Frog>
          {
            "The text variable we got back from the hook will just be the letter 'H' at first. Then 'He'. Then 'Hel'. And so on. You get it?"
          }
        </Frog>
        <Frog>
          {
            "For a lot of people, that's all they need. But maybe you're different. Maybe you're sayin' \"I've got needs! Different parts of my text need their own styles!\""
          }
        </Frog>
        <Frog>
          {
            "If that's you, relax. I got you covered. Check out the guide for WindupChildren."
          }
        </Frog>
      </Dialog>
    </Section>
  );
};

export default HookIntro;
