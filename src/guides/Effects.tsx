import React, { useContext } from "react";
import Section from "../Section";
import Dialog, { DialogChildContext } from "../Dialog";
import Frog, { HappyExpression } from "../performers/Frog";
import SmashEffect from "../SmashEffect";
import { useWindupString, WindupChildren, OnChar } from "windups";
import Example from "../Example";
import CodeExample from "../CodeExample";
import { Emphasis } from "../Char";
import { SFXContext } from "../App";

const ON_FINISH_HOOK_EXAMPLE = `import { useWindupString } from "windups";

const OnFinishHookExample = () => {
  const [text] = useWindupString(
    "When this text finishes, I'll alert you. I'm sorry.",
    {
      onFinished: () => {
        alert("Finished!");
      }
    }
  );

  return <div>{text}</div>;
}
`;

const OnFinishHookExample = () => {
  const { proceed } = useContext(DialogChildContext);

  const [text] = useWindupString(
    "When this text finishes, I'll alert you. I'm sorry.",
    {
      onFinished: () => {
        alert("Finished!");
        proceed();
      },
    }
  );

  return <div>{text}</div>;
};

const EFFECT_EXAMPLE = `import { useWindupString } from "windups";
import { smash } from 'gratuitous-fx';

const EffectExample = () => {
  return (
    <WindupChildren onFinished={proceed}>
      {"I carefully steadied my aim... and "}
      <Effect fn={smash} />
      {"struck! The carrot was cut clean in half."}
    </WindupChildren>
  );
};
`;

const EffectExample = () => {
  const { proceed } = useContext(DialogChildContext);

  return (
    <WindupChildren onFinished={proceed}>
      {"I carefully steadied my aim... and "}
      <SmashEffect />
      {"struck! The carrot was cut clean in half."}
    </WindupChildren>
  );
};

const ON_CHAR_EXAMPLE = `import { WindupChildren } from "windups";

const ContrivedOnCharExample = () => {
  const [count, setCount] = React.useState(0);
  const [text] = useWindupString(
    "You'll probably want to do something more interesting than this!",
    {
      onChar: () => setCount(prev => prev + 1),
    }
  );

  return (
    <div>
      <div>{text}</div>
      <div>{"Characters printed: "}{count}</div>
    </div>
  );
};
`;

const ContrivedOnCharExample = () => {
  const { proceed } = useContext(DialogChildContext);
  const [count, setCount] = React.useState(0);
  const [text] = useWindupString(
    "You'll probably want to do something more interesting than this!",
    {
      onChar: () => setCount((prev) => prev + 1),
      onFinished: proceed,
    }
  );

  return (
    <div>
      <div>{text}</div>
      <div>{`Characters printed: ${count}`}</div>
    </div>
  );
};

const ON_CHAR_CHILDREN_EXAMPLE = `import { WindupChildren, OnChar } from "windups";
import { smash } from "gratuitous-fx";

const OnCharChildrenExample = () => {
  const { smash } = useContext(SFXContext);

  return (
    <WindupChildren>
      {"Hey! Use the brakes! "}
      <OnChar fn={smash}>{"Noooo!"}</OnChar>
    </WindupChildren>
  );
};
`;

const OnCharChildrenExample = () => {
  const { smash } = useContext(SFXContext);
  const { proceed } = useContext(DialogChildContext);

  return (
    <WindupChildren onFinished={proceed}>
      {"Hey! Use the brakes! "}
      <OnChar fn={smash}>{"Noooo!"}</OnChar>
    </WindupChildren>
  );
};

const Effects = () => {
  return (
    <Section id={"calling-functions"} title={"Calling your own functions"}>
      <Dialog>
        <Frog>
          {
            "Addin' the element of time to yer' text means there'll be plenty of occasions you'll want something to happen at just the right moment."
          }
        </Frog>
        <Frog>{"Maybe you'll want to save a user's reading progress."}</Frog>
        <Frog>
          {"Or B"}
          <SmashEffect />
          <HappyExpression />
          {"AM! Add a special effect."}
        </Frog>
        <Frog>
          {
            "One of the most common cases is you'll want to do something when a windup "
          }
          <Emphasis>{"finishes"}</Emphasis>
          {"."}
        </Frog>
        <CodeExample>{ON_FINISH_HOOK_EXAMPLE}</CodeExample>
        <Example>
          <OnFinishHookExample />
        </Example>
        <Frog>
          {"WindupChildren has something similar: an"}{" "}
          <Emphasis>{"onFinished"}</Emphasis> {"prop."}
        </Frog>
        <Frog>
          {
            "Making something happen at the end is just one common use case. Maybe you want to call a function at a precise moment?"
          }
        </Frog>
        <CodeExample>{EFFECT_EXAMPLE}</CodeExample>
        <Example>
          <EffectExample />
        </Example>
        <Frog>
          {"Using WindupChildren with the "}
          <Emphasis>{"Effect"}</Emphasis>
          {" component's by far the easiest way to do something like that."}
        </Frog>
        <Frog>
          {
            "There's another common pattern I see... and that's when you want to fire a function every time a character's added."
          }
        </Frog>
        <CodeExample>{ON_CHAR_EXAMPLE}</CodeExample>
        <Example>
          <ContrivedOnCharExample />
        </Example>
        <Frog>
          {
            "And if you need different onChar callbacks for different parts of your text, WindupChildren supports an "
          }
          <Emphasis>{"OnChar"}</Emphasis>
          {" component."}
        </Frog>
        <CodeExample>{ON_CHAR_CHILDREN_EXAMPLE}</CodeExample>
        <Example>
          <OnCharChildrenExample />
        </Example>
        <Frog>{"..."}</Frog>
        <Frog>{"That's it."}</Frog>
        <Frog expression={"SHAME"}>
          {"Ain't you gettin' tired of all these code examples yet?"}
        </Frog>
      </Dialog>
    </Section>
  );
};

export default Effects;
