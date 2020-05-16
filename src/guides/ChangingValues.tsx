import React, { useState, useContext } from "react";
import Section from "../Section";
import Frog, { MadExpression, HappyExpression } from "../performers/Frog";
import CodeExample from "../CodeExample";
import { Emphasis } from "../Char";
import Dialog, { DialogChildContext } from "../Dialog";
import { WindupChildren, Pause } from "windups";
import Example from "../Example";
import { TEXT_PINK } from "../colours";
import SmashEffect from "../SmashEffect";

const TRICKY_EXAMPLE = `const TrickyWindup = () => {
    const [isPink, setIsPink] = useState(false);
  
    return (
      <>
        <button onClick={() => setIsPink(true)}>{"Make it pink!"}</button>
        <WindupChildren>
          <div style={{ color: isPink ? TEXT_PINK : "black" }}>
            {"Click the button to turn this pink! Or not?!"}
          </div>
        </WindupChildren>
      </>
    );
  };
`;

const TrickyWindup = () => {
  const { proceed } = useContext(DialogChildContext);
  const [isPink, setIsPink] = useState(false);

  return (
    <>
      <button onClick={() => setIsPink(true)}>{"Make it pink!"}</button>
      <WindupChildren onFinished={proceed}>
        <div style={{ color: isPink ? TEXT_PINK : "black" }}>
          {"Click the button to turn this pink! Or not?!"}
        </div>
      </WindupChildren>
    </>
  );
};

const FIXED_EXAMPLE = `const FixedWindup = () => {
    const [isPink, setIsPink] = useState(false);
  
    return (
      <>
        <button onClick={() => setIsPink(true)}>{"Make it pink!"}</button>
        <WindupChildren>
          <div
            key={isPink ? "pink" : "normal"}
            style={{ color: isPink ? TEXT_PINK : "black" }}
          >
            {"Click the button to turn this pink! Or not?!"}
          </div>
        </WindupChildren>
      </>
    );
  };  
`;

const FixedWindup = () => {
  const { proceed } = useContext(DialogChildContext);
  const [isPink, setIsPink] = useState(false);

  return (
    <>
      <button onClick={() => setIsPink(true)}>{"Make it pink!"}</button>
      <WindupChildren onFinished={proceed}>
        <div
          key={isPink ? "pink" : "normal"}
          style={{ color: isPink ? TEXT_PINK : "black" }}
        >
          {"Click the button to turn this pink! Or not?!"}
        </div>
      </WindupChildren>
    </>
  );
};

const ChangingValues: React.FC = () => {
  return (
    <Section id={"restarting"} title="Dynamic values">
      <Dialog>
        <Frog>
          {
            "You may find yourself in a situation where the values you pass to useWindupString or WindupChildren are "
          }
          <Emphasis>{"dynamic"}</Emphasis>
          {"."}
        </Frog>
        <Frog>
          {
            "Let me be clear: changing the value of a windup while it's running will "
          }
          <Emphasis>{"restart it from scratch."}</Emphasis>
        </Frog>
        <Frog expression={"SHAME"}>
          {"At least... that's how it's meant to work."}
        </Frog>
        <Frog>
          {
            "See, with useWindupString it's easy to tell if the windup should restart: we just check if the string which was passed has changed."
          }
        </Frog>
        <Frog expression={"SHAME"}>
          {"But with WindupChildren this is a bit trickier..."}
        </Frog>
        <Frog>
          {
            "WindupChildren takes a children prop. But in React-land, technically speaking, the children prop "
          }
          <Emphasis>{"changes on every render."}</Emphasis>
        </Frog>
        <Frog expression={"SHOCK"}>
          {
            "Which means that there's no way for us to tell if the value of the children prop has actually changed or not."
          }
        </Frog>
        <Frog expression={"SHAME"}>{"So we kinda had to get creative..."}</Frog>
        <Frog>
          {
            "Now, in most cases, if you change the structure or text of the children you pass to WindupChildren, it'll pick up on it and restart the windup."
          }
        </Frog>
        <Frog expression={"SHAME"}>
          {"But here's a situation it wouldn't be able to:"}
        </Frog>
        <CodeExample>{TRICKY_EXAMPLE}</CodeExample>
        <Example>
          <TrickyWindup />
        </Example>
        <Frog>
          {"You will note that clicking the button does "}
          <Emphasis>{"not"}</Emphasis>
          {" turn the text pink."}
          <Pause ms={800} />
          <SmashEffect />
          <MadExpression />
          {"So what's the deal?!"}
        </Frog>
        <Frog>
          {"WindupChildren is only able to compare the "}
          <Emphasis>{"text content"}</Emphasis>
          {" and "}
          <Emphasis>{"shape"}</Emphasis>
          {" of the children you pass it."}
        </Frog>
        <Frog>
          {"What it can't do is know if you changed the values of any "}
          <Emphasis>{"objects, functions or components"}</Emphasis>
          {" inside that."}
        </Frog>
        <Frog>
          {"But it can see the "}
          <Emphasis>{"keys"}</Emphasis>
          {" used by those components."}
          <HappyExpression />
          {" That will let us fix the example from before!"}
        </Frog>
        <CodeExample>{FIXED_EXAMPLE}</CodeExample>
        <Example>
          <FixedWindup />
        </Example>
        <Frog expression={"HAPPY"}>
          {
            "Well, hopefully this guide will save at least one person from totally losin' their marbles."
          }
        </Frog>
      </Dialog>
    </Section>
  );
};

export default ChangingValues;
