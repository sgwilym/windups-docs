import React, { useContext } from "react";
import Section from "../Section";
import Dialog, { DialogChildContext } from "../Dialog";
import Frog, { HappyExpression } from "../performers/Frog";
import SmashEffect from "../SmashEffect";
import CodeExample from "../CodeExample";
import { TEXT_PINK } from "../colours";
import { useWindupString, WindupChildren } from "windups";
import Example from "../Example";
import { Emphasis } from "../Char";

const UNSTYLED_EXAMPLE = `import React from "react";
import { useWindupString } from "windups";

const DressCodeWarning = () => {
  const { proceed } = useContext(DialogChildContext);
  const [text] = useWindupString(
    "This club admits only those wearing bright pink hats."
  );

  return <div>{text}</div>;
};`;

const UnstyledExample: React.FC = () => {
  const { proceed } = useContext(DialogChildContext);
  const [text] = useWindupString(
    "This club admits only those wearing bright pink hats.",
    {
      onFinished: proceed
    }
  );

  return <div>{text}</div>;
};

const STYLED_EXAMPLE = `import React from "react";
import { WindupChildren } from "windups"; 

const StyledExample = () => {
  return (
    <WindupChildren>
        {"This club admits only those wearing "}
        <span style={{ color: "pink" }}>{"bright pink"}</span>
        {" hats."}
    </WindupChildren>
  );
};`;

const StyledExample = () => {
  const { proceed } = useContext(DialogChildContext);

  return (
    <WindupChildren onFinished={proceed}>
      {"This club admits only those wearing "}
      <span style={{ color: TEXT_PINK }}>{"bright pink"}</span>
      {" hats."}
    </WindupChildren>
  );
};

const GuideName = () => {
  return (
    <Section id={"styling-segments"} title={"Styling text segments"}>
      <Dialog>
        <Frog>{"Take a look at this."}</Frog>
        <CodeExample>{UNSTYLED_EXAMPLE}</CodeExample>
        <Example>
          <UnstyledExample />
        </Example>
        <Frog>
          {
            "Now, I don't know what it is, but a lot of people, when they see this, they get an idea in their heads."
          }
        </Frog>
        <Frog>
          {
            "What they want more than anything is for the words 'bright pink' to be, well, "
          }
          <Emphasis>{"bright pink"}</Emphasis>
          {"."}
        </Frog>
        <Frog>
          {
            "And I tell 'em, you try and do that with useWindupString, and yer' gonna tie yerself up in knots!"
          }
          <HappyExpression />
          {" Yar har har har!"}
        </Frog>
        <Frog>
          {"Lucky for them, I got something else cooked up for that."}
        </Frog>
        <CodeExample>{STYLED_EXAMPLE}</CodeExample>
        <Example>
          <StyledExample />
        </Example>
        <Frog>
          {"With this WindupChildren component, it's easy to "}
          <Emphasis>{"style different segments of text"}</Emphasis>
          {
            ". You just put what you want in there, and WindupChildren will make a windup out of it."
          }
        </Frog>
        <Frog>
          {
            "If yer' of a devious disposition you may be thinking, \"if I can put anything in there, what's stopping me from putting an "
          }
          <Emphasis>{"image"}</Emphasis>
          {" in there? Or a "}
          <Emphasis>{"button"}</Emphasis>
          {'?"'}
        </Frog>
        <Frog expression={"MAD"}>
          <SmashEffect />
          {"Nothing, that's what! So you gotta use some common sense."}
        </Frog>
        <Frog>
          {"But if yer' interested in how to use stuff "}
          <Emphasis>{"other than text"}</Emphasis>
          {" in your windups, check out the next guide."}
        </Frog>
      </Dialog>
    </Section>
  );
};

export default GuideName;
