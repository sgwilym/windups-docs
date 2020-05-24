import React from "react";
import Section from "../Section";
import Dialog from "../Dialog";
import Frog from "../performers/Frog";
import { Emphasis } from "../Char";
import CodeExample from "../CodeExample";

const REDUCED_MOTION_EXAMPLE = `import { useWindupString } from "windups";
import { usePrefersReducedMotion } from "../a11y-hooks";
// Good example at https://joshwcomeau.com/snippets/react-hooks/use-prefers-reduced-motion

const SkipForReducedMotion = () => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [text] = useWindupString("Respect user preferences!", {
    skipped: prefersReducedMotion,
  });

  return <div>{text}</div>;
};`;

const SCREENREADER_EXAMPLE = `import { useWindupString } from "windups";
import { VisuallyHidden } from "@reach/visually-hidden";

const AccessibleWindupString = ({ text }) => {
    const [windupText] = useWindupString(text);

    return (
        <>
            <VisuallyHidden>{text}</VisuallyHidden>
            <div aria-hidden>{windupText}</div>
        </>
    )
} 
`;

const SCREENREADER_CHILDREN_EXAMPLE = `import { WindupChildren, textFromChildren } from "windups";
import { VisuallyHidden } from "@reach/visually-hidden";

const AccessibleWindupChildren = ({ children }) => {
    const text = textFromChildren(children);

    return (
        <>
            <VisuallyHidden>{text}</VisuallyHidden>
            <div aria-hidden>
                <WindupChildren>
                    {text}
                </WindupChildren>
            </div>
        </>
    )
} 
`;

const Accessibility: React.FC = () => {
  return (
    <Section title={"Accessibility"} id={"a11y"}>
      <Dialog>
        <Frog>
          {
            "It's hard to imagine... but not everyone is going to enjoy seeing a windup."
          }
        </Frog>
        <Frog expression={"SHAME"}>
          {"Maybe they get motion sick from all the animation."}
        </Frog>
        <Frog expression={"HAPPY"}>
          {
            "Or maybe they use a screenreader, in which case they just want to hear the text all at once, not letter by letter!"
          }
        </Frog>
        <Frog>
          {"In these cases you'll want to"}
          <Emphasis>{"disable"}</Emphasis>
          {" or "}
          <Emphasis>{"hide"}</Emphasis>
          {" the windup effect."}
        </Frog>
        <Frog>
          {
            "To disable the effect, both useWindupString and WindupChildren accept a "
          }
          <Emphasis>{"skipped"}</Emphasis>
          {" prop, which will skip the effect as long as its value is true."}
        </Frog>
        <Frog>
          {"Here's how we could use that with users who prefer reduced motion:"}
        </Frog>
        <CodeExample>{REDUCED_MOTION_EXAMPLE}</CodeExample>
        <Frog expression={"HAPPY"}>
          {
            "And now they can enjoy your epic eighty-hour amphibian legal drama the way "
          }
          <Emphasis>{"they"}</Emphasis> {" want to!"}
        </Frog>
        <Frog>
          {
            "And how about screenreaders? As your windup could be wrapped up in all kinds of markup to make it animate the way you want it, best way is to hide the windup altogether and expose the text to screenreaders only:"
          }
        </Frog>
        <CodeExample>{SCREENREADER_EXAMPLE}</CodeExample>
        <Frog>
          {
            "It's not always this easy to get the text you want people to see. Maybe your text is all mixed up in a big tree of children that you're passing to WindupChildren."
          }
        </Frog>
        <Frog>
          {"That's why we have a lil' "}
          <Emphasis>{"textFromChildren"}</Emphasis>
          {
            " function you can use to extract the text from a children parameter."
          }
        </Frog>
        <CodeExample>{SCREENREADER_CHILDREN_EXAMPLE}</CodeExample>
        <Frog>
          {
            "And with those techniques you can use windups without taking away anyone else's fun!"
          }
        </Frog>
      </Dialog>
    </Section>
  );
};

export default Accessibility;
