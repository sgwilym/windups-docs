import React, { useContext } from "react";
import Section from "../Section";
import Dialog, { DialogChildContext } from "../Dialog";
import Frog, {
  ShameExpression,
  MadExpression,
  HappyExpression,
} from "../performers/Frog";
import { WindupChildren, Linebreaker, Pace, Pause, StyledText } from "windups";
import Example from "../Example";
import CodeExample from "../CodeExample";
import SmashEffect from "../SmashEffect";
import { Emphasis, Thinking } from "../Char";
import useSize from "@rehooks/component-size";

const BROKEN_EXAMPLE = `<Linebreaker fontStyle={"36px monospace"} width={300}>
  <WindupChildren>
    {"Let's talk about the "}
    <span style={{fontSize: 72}}>{"elephant"}</span>
    {" in the room..."}
  </WindupChildren>
</Linebreaker>`;

const FIXED_EXAMPLE = `<Linebreaker fontStyle={"36px monospace"} width={300}>
  <WindupChildren onFinished={proceed}>
      {"Let's talk about the "}
      <StyledText fontStyle={"72px monospace"}>
        <span style={{ fontSize: 72 }}>{"elephant"}</span>
      </StyledText>
      {" in the room..."}
  </WindupChildren>
</Linebreaker>`;

const VanillaBreakingLine = () => {
  const divRef = React.useRef(null);
  const { width } = useSize(divRef);
  const { proceed } = useContext(DialogChildContext);

  return (
    <Linebreaker fontStyle={"36px 'Menlo', monospace"} width={width}>
      <div ref={divRef} style={{ fontSize: 36 }}>
        <WindupChildren onFinished={proceed}>
          <Pace ms={70}>{"Let's talk about the elephant in the room..."}</Pace>
        </WindupChildren>
      </div>
    </Linebreaker>
  );
};

const BadBreakingLine = () => {
  const divRef = React.useRef(null);
  const { width } = useSize(divRef);
  const { proceed } = useContext(DialogChildContext);

  return (
    <Linebreaker fontStyle={"36px 'Menlo', monospace"} width={width}>
      <div ref={divRef} style={{ fontSize: 36, lineHeight: 1 }}>
        <WindupChildren onFinished={proceed}>
          <Pace ms={130}>
            {"Let's talk about the "}
            <span style={{ fontSize: 72, lineHeight: 1 }}>{"elephant"}</span>
            {" in the room..."}
          </Pace>
        </WindupChildren>
      </div>
    </Linebreaker>
  );
};

const StyledBreakingLine = () => {
  const divRef = React.useRef(null);
  const { width } = useSize(divRef);
  const { proceed } = useContext(DialogChildContext);

  return (
    <Linebreaker fontStyle={"36px 'Menlo', monospace"} width={width}>
      <div ref={divRef} style={{ fontSize: 36 }}>
        <WindupChildren onFinished={proceed}>
          <Pace ms={130}>
            {"Let's talk about the "}
            <StyledText fontStyle={"72px 'Menlo', monospace"}>
              <span style={{ fontSize: 72 }}>{"elephant"}</span>
            </StyledText>
            {" in the room..."}
          </Pace>
        </WindupChildren>
      </div>
    </Linebreaker>
  );
};

const SeveralHoursLater = () => {
  const { proceed } = useContext(DialogChildContext);
  const divRef = React.useRef(null);
  const { width } = useSize(divRef);

  return (
    <Linebreaker fontStyle={"36px 'Menlo', monospace"} width={width}>
      <div
        ref={divRef}
        style={{
          fontSize: 36,
          fontFamily: "'Menlo', monospace",
          fontStyle: "italic",
          margin: "1em 0",
        }}
      >
        <WindupChildren onFinished={proceed}>
          <Pace ms={80}>{"SEVERAL HOURS LATER..."}</Pace>
          <Pause ms={1000} />
        </WindupChildren>
      </div>
    </Linebreaker>
  );
};

const LinebreakingWithStyle = () => {
  return (
    <Section id={"breaking-lines-styles"} title={"Advanced Line Breaking"}>
      <Dialog>
        <Frog>{"I've got this headline I'm working on for someone."}</Frog>
        <Example>
          <VanillaBreakingLine />
        </Example>
        <Frog>
          {
            "That's when I had this idea! How wild would it be if the word elephant was big —"
          }
          <HappyExpression />
          <Pause ms={1500} />
          <Emphasis>{"like an elephant?!"}</Emphasis>
        </Frog>
        <Example>
          <BadBreakingLine />
        </Example>
        <Frog expression={"SMUG"}>
          {"Sometimes it hurts thinking how smart I a —"}
          <SmashEffect />
          <MadExpression />
          {"woah what?!"}
        </Frog>
        <Frog expression={"MAD"}>
          {"What's with that screwy linebreaking?"}
        </Frog>
        <Frog>{"Let's take a look at the code..."}</Frog>
        <CodeExample>{BROKEN_EXAMPLE}</CodeExample>
        <Frog expression={"SHAME"}>{"Oh... right."}</Frog>
        <Frog>
          {
            "On the first line we tell <Linebreaker> that the fontStyle will be "
          }
          <Emphasis>{"36px"}</Emphasis>
          <ShameExpression />
          {"."}
          <Pause ms={1000} />
          {"But then we go ahead and style the word 'elephant' as "}
          <Emphasis>{"72px"}</Emphasis>
          {"!"}
        </Frog>
        <Frog>
          {
            "If only there were some way to get <Linebreaker> in on my amazing joke..."
          }
        </Frog>
        <SeveralHoursLater />
        <Frog expression={"SMUG"}>
          <SmashEffect />
          {"I've got it!"}
        </Frog>
        <Example>
          <StyledBreakingLine />
        </Example>
        <Frog expression={"HAPPY"}>
          {
            "See that? Words going where you expect 'em to! Nothing can stop this frog!"
          }
        </Frog>
        <Frog silent expression={"HAPPY"}>
          <Pace ms={80}>
            <Thinking>
              {"(Totally worth it for that elephant joke...)"}
            </Thinking>
          </Pace>
        </Frog>
        <Frog>
          {
            'What we needed was a way to tell <Linebreaker> "the style is different here!"'
          }
        </Frog>
        <Frog expression={"HAPPY"}>
          {"So we cooked up this fancy "}
          <Emphasis>{"<StyledText>"}</Emphasis>
          {" component that does just that! Check it out!"}
        </Frog>
        <CodeExample>{FIXED_EXAMPLE}</CodeExample>
        <Frog expression={"HAPPY"}>
          {"Now you can have differently styled text in the same run "}
          <Emphasis>{"without screwing up yer' linebreaking!"}</Emphasis>
        </Frog>
        <Frog>
          {
            "But... uh, I hope yer' needs won't get much more complicated than that."
          }
        </Frog>
      </Dialog>
    </Section>
  );
};

export default LinebreakingWithStyle;
