import React, { useContext } from "react";
import Section from "../Section";
import Dialog, { DialogChildContext } from "../Dialog";
import Frog, { ShameExpression } from "../performers/Frog";
import { useWindupString, WindupChildren, Linebreaker, Pace } from "windups";
import Example from "../Example";
import CodeExample from "../CodeExample";
import SmashEffect from "../SmashEffect";
import { Emphasis } from "../Char";
import useSize from "@rehooks/component-size";

const BadlyBreakingLine = () => {
  const { proceed } = useContext(DialogChildContext);
  const [text] = useWindupString("Is line-breaking necessary?", {
    pace: () => 200,
    onFinished: proceed,
  });

  return <div style={{ fontSize: "72px" }}>{text}</div>;
};

const FULL_EXAMPLE = `import { Linebreaker, WindupChildren } from "windups";

const GoodBreakingLine = () => {
  return (
    <Linebreaker fontStyle={"72px monospace"} width={300}>
      <div style={{ fontSize: 72, width: 300 }}>
        <WindupChildren>
          {"Is line-breaking necessary?"}
        </WindupChildren>
      </div>
    </Linebreaker>
  );
}
`;

const GoodBreakingLine = () => {
  const divRef = React.useRef(null);
  const { width } = useSize(divRef);
  const { proceed } = useContext(DialogChildContext);

  return (
    <Linebreaker fontStyle={"72px 'Menlo', monospace"} width={width}>
      <div ref={divRef} style={{ fontSize: 72 }}>
        <WindupChildren onFinished={proceed}>
          <Pace ms={200}>{"Is line-breaking necessary?"}</Pace>
        </WindupChildren>
      </div>
    </Linebreaker>
  );
};

const STEP_ONE = `<Linebreaker>
    <WindupChildren>
      {"Is line-breaking necessary?"}
    </WindupChildren>
</Linebreaker>
`;

const STEP_TWO = `<Linebreaker fontStyle={"72px 'Menlo', monospace"} width={width}>
  <div style={{ fontSize: 72, width: 300 }}>
    <WindupChildren onFinished={proceed}>
      {"Is line-breaking necessary?"}
    </WindupChildren>
  </div>
</Linebreaker>
`;

const Linebreaking = () => {
  return (
    <Section id={"breaking-lines"} title={"Breaking lines"}>
      <Dialog>
        <Frog>
          {
            "If you use a lot of windups, you're going to bump into this problem sooner or later."
          }
        </Frog>
        <Frog expression="MAD">{"Brace 'yerself."}</Frog>
        <Example>
          <BadlyBreakingLine />
        </Example>
        <Frog>
          {
            "You saw it, right? How the words were jumping from line to line like eyes ain't a thing?"
          }
        </Frog>
        <Frog>{"I know: it's disgusting."}</Frog>
        <Frog>
          {"But what are we supposed to do?"}
          <ShameExpression />
          {
            " How're you supposed to know when to break a line when you don't have the whole word yet?!"
          }
        </Frog>
        <Frog>
          {
            "So we got this new stuff from the frogs up at the advanced windups lab."
          }
        </Frog>
        <Frog>
          {"They call it the "}
          <Emphasis>{"Linebreaker"}</Emphasis>
          {" component, and sent this example."}
        </Frog>
        <CodeExample>{FULL_EXAMPLE}</CodeExample>
        <Example>
          <GoodBreakingLine />
        </Example>
        <Frog expression={"HAPPY"}>
          <SmashEffect />
          {"See that?! Now that's how you break a line!"}
        </Frog>
        <Frog>
          {
            "But it's a lot to take in, I know. We'll go through it step by step."
          }
        </Frog>
        <Frog>
          {"Firstly, we wrap everything inside the Linebreaker component."}
        </Frog>
        <CodeExample>{STEP_ONE}</CodeExample>
        <Frog>{"For props we give it a font style, and a width."}</Frog>
        <CodeExample>{STEP_TWO}</CodeExample>
        <Frog>
          {
            "It then looks for text inside of the children that's been provided to it."
          }
        </Frog>
        <Frog>
          {
            "And then takes these things... the available width, the font style, and the text, and puts it all together to figure out where new lines should start before it's ever laid out by the browser."
          }
        </Frog>
        <Frog>{"Now, 'course this approach has caveats."}</Frog>
        <Frog>
          {
            "Firstly you gotta know the style of your text, and the width available for it to fit in beforehand. Seems reasonable enough."
          }
        </Frog>
        <Frog>{"All the text has to be the same style for it to work."}</Frog>
        <Frog>
          {
            "And if you render non-text stuff that adds to the horizontal content of the line, it's all gonna get out of shape. "
          }
        </Frog>
        <Frog>
          {
            "Finally, the placement of this component really matters. It's gotta be "
          }
          <Emphasis>{"outside the WindupChildren component"}</Emphasis>
          {
            ". Otherwise WindupChildren will feed incomplete text into the Linebreaker component and it'll all get weird."
          }
        </Frog>
        <Frog>
          {
            "Which is coincidentally the same reason that it doesn't work with useWindupString. If you want to do that, you can use the "
          }
          <Emphasis>{"break-styled-lines"}</Emphasis>
          {" package that powers Linebreaker."}
        </Frog>
      </Dialog>
    </Section>
  );
};

export default Linebreaking;
