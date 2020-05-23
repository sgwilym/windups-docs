import React, { useContext } from "react";
import Section from "../Section";
import Dialog, { DialogChildContext } from "../Dialog";
import Frog, { ShockExpression, ShameExpression } from "../performers/Frog";
import CodeExample from "../CodeExample";
import { useWindupString, CharWrapper, WindupChildren, Pace } from "windups";
import SmashEffect from "../SmashEffect";
import { Emphasis } from "../Char";
import { css } from "linaria";
import Example from "../Example";

const BORING_EXAMPLE = `import React from "react";
import { useWindupString } from "windups";

const VanillaWindup = () => {
  const [text] = useWindupString("Baked Beans On Toast");

  return <div>{text}</div>;
};`;

const STRING_EXAMPLE = `import React from "react";
import { useWindupString, CharWrapper } from "windups";
import { css } from "unnamed-styling-library";

// Our animation CSS. A slow fade in.
const fadeInAnimationStyle = css\`
@keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  animation-name: fadeIn;
  animation-duration: 3s;
  animation-iteration-count: 1;
\`;

// A component to wrap around each character.
const SpookyChar = ({children}) => {
  return <span className={fadeInAnimationStyle}>{children}</span>
}

// Our windup
const GhostlyWindup = () => {
  const [text] = useWindupString("Baked Beans On Toast");

  return <div><CharWrapper element={SpookyChar}>{text}</Charwrapper></div>;
};`;

const WITHOUT_CHARWRAPPER_EXAMPLE = `return (
  <div>
    {text.split("").map(char => (
      <SpookyChar>{char}</SpookyChar>
    ))}
  </div>
);`;

const WINDUP_CHILDREN_EXAMPLE = `import React from "react";
import { WindupChildren, CharWrapper } from "windups";
import { SpookyChar } from "./that-last-example";

const SpookyEmphasisedWindup = () => {
  return (
    <WindupChildren>
      <CharWrapper element={SpookyChar}>
        {"Baked "}
        <em>{"beans"}</em>
        {" on toast"}
      </CharWrapper>
    </WindupChildren>
  )
}
`;

// Our animation CSS. A simple fade.
const fadeInAnimationStyle = css`
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  animation-name: fadeIn;
  animation-duration: 3s;
  animation-iteration-count: 1;
`;

const VanillaWindup = () => {
  const { proceed } = useContext(DialogChildContext);
  const [text] = useWindupString("Baked Beans On Toast", {
    onFinished: proceed
  });

  return <div>{text}</div>;
};

const SpookyChar: React.FC = ({ children }) => {
  return <span className={fadeInAnimationStyle}>{children}</span>;
};

const GhostlyWindup = () => {
  const { proceed } = useContext(DialogChildContext);

  const [text] = useWindupString("Baked Beans On Toast", {
    onFinished: proceed,
    pace: () => 200
  });

  return (
    <div>
      <CharWrapper element={SpookyChar}>{text}</CharWrapper>
    </div>
  );
};

const SpookyEmphasisedWindup = () => {
  const { proceed } = useContext(DialogChildContext);

  return (
    <WindupChildren onFinished={proceed}>
      <CharWrapper element={SpookyChar}>
        <Pace ms={200}>
          {"Baked "}
          <b>{"beans"}</b>
          {" on toast"}
        </Pace>
      </CharWrapper>
    </WindupChildren>
  );
};

const StylingCharacters: React.FC = () => {
  return (
    <Section
      id={"animating-characters"}
      title={"Animating individual characters"}
    >
      <Dialog>
        <Frog>{"Tell me if you see something wrong here:"}</Frog>
        <CodeExample>{BORING_EXAMPLE}</CodeExample>
        <Example>
          <VanillaWindup />
        </Example>
        <Frog>{"No? Still don't see it? Need a hint?"}</Frog>
        <Frog expression={"MAD"}>
          {"It's "}
          <SmashEffect />
          {"boring!"}
        </Frog>
        <Frog>
          {
            "Sure, in the right spot a windup's better than no windup. But to really shine, a windup needs... "
          }
          <Emphasis>{"panache."}</Emphasis>
        </Frog>
        <Frog>
          <Emphasis>{"Flair."}</Emphasis>
        </Frog>
        <Frog expression={"COOL"}>
          <Pace ms={120}>
            <Emphasis>{"Styyyyyyle."}</Emphasis>
          </Pace>
        </Frog>
        <Frog expression={"MAD"}>
          <SmashEffect />
          {"Ya get me?!"}
        </Frog>
        <Frog>
          {"What I'm saying is it looks "}
          <Emphasis>{"real cool"}</Emphasis>
          {" when you animate the characters "}
          <Emphasis>{"individually as they come in."}</Emphasis>
        </Frog>
        <Frog>{"Let's try it out first with useWindupString."}</Frog>
        <CodeExample>{STRING_EXAMPLE}</CodeExample>
        <Example>
          <GhostlyWindup />
        </Example>
        <Frog>
          {"See, a little animation turned what "}
          <Emphasis>{"was a menu item"}</Emphasis>
          {" into a "}
          <ShockExpression />
          <Emphasis>{"chilling final warning"}</Emphasis>
          {"."}
        </Frog>
        <Frog>
          {"Anyway, about that "}
          <Emphasis>{"CharWrapper"}</Emphasis>
          {" component..."}
        </Frog>
        <Frog>
          {
            "With useWindupString, it's just a convenience. You could also do this:"
          }
        </Frog>
        <CodeExample>{WITHOUT_CHARWRAPPER_EXAMPLE}</CodeExample>
        <Frog expression={"HAPPY"}>{"But why would you?"}</Frog>
        <Frog>
          {
            "Where you'll really want CharWrapper is when you use WindupChildren."
          }
        </Frog>
        <CodeExample>{WINDUP_CHILDREN_EXAMPLE}</CodeExample>
        <Example>
          <SpookyEmphasisedWindup />
        </Example>
        <Frog expression="HAPPY">
          {
            "Without CharWrapper, you'd have to wrap each character individually! What a bore that'd be!"
          }
        </Frog>
        <Frog>
          {
            "Anyway. I got one last tip for you, if you're planning to animate characters individually using "
          }
          <Emphasis>{"CSS transforms"}</Emphasis>
          {"."}
        </Frog>
        <Frog expression={"SHOCK"}>
          {"CSS transforms "}
          <Emphasis>{"don't work on inline elements"}</Emphasis>
          <ShameExpression />
          {
            "! So you'll probably have to render your characters as inline-block. Make sense?"
          }
        </Frog>
        <Frog>{"All right. That's enough about that."}</Frog>
      </Dialog>
    </Section>
  );
};

export default StylingCharacters;
