import React, { useContext } from "react";
import Section from "../Section";
import Dialog, { DialogChildContext } from "../Dialog";
import Frog from "../performers/Frog";
import SmashEffect from "../SmashEffect";
import { useWindupString, WindupChildren } from "windups";
import Example from "../Example";
import { Emphasis } from "../Char";

const OnFinishHookExample = () => {
  const { proceed } = useContext(DialogChildContext);

  const [text] = useWindupString(
    "When this text finishes, I'll alert you about it. I'm sorry.",
    {
      onFinished: () => {
        alert("Finished!");
        proceed();
      }
    }
  );

  return <div>{text}</div>;
};

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

const ContrivedOnCharExample = () => {
  const { proceed } = useContext(DialogChildContext);
  const [count, setCount] = React.useState(0);
  const [text] = useWindupString(
    "You'll probably want to do something more interesting than this!",
    {
      onChar: () => setCount(prev => prev + 1),
      onFinished: proceed
    }
  );

  return (
    <div>
      <div>{text}</div>
      <div>{`Characters printed: ${count}`}</div>
    </div>
  );
};
const Effects = () => {
  return (
    <Section id={"calling-fns"} title={"Calling your own functions"}>
      <Dialog>
        <Frog>
          {
            "Addin' an element of time to yer' text means there'll be plenty of occasions you'll want something to happen at just the right time."
          }
        </Frog>
        <Frog>{"Maybe you'll want to save a user's reading progress."}</Frog>
        <Frog>
          {"Or B"}
          <SmashEffect />
          {"AM! Add a special effect."}
        </Frog>
        <Frog>
          {
            "One of the most common cases is you'll want to do something when a windup "
          }
          <Emphasis>{"finishes"}</Emphasis>
          {"."}
        </Frog>
        <Example>
          <OnFinishHookExample />
        </Example>
        <Frog>
          {"WindupChildren has something similar: an onFinished prop."}
        </Frog>
        <Frog>
          {
            "Making something happen at the end is just one common use case. Maybe you want to call a function at a precise moment?"
          }
        </Frog>
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
            "There's one more common pattern I see... and that's when you want to fire a function every time a character's added."
          }
        </Frog>
        <Example>
          <ContrivedOnCharExample />
        </Example>
        <Frog>
          {
            "And if you need different onChar callbacks for different parts of your text, WindupChildren supports an OnChar component."
          }
        </Frog>
      </Dialog>
    </Section>
  );
};

export default Effects;
