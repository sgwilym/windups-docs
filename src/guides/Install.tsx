import React from "react";
import Section from "../Section";
import Dialog from "../Dialog";
import Frog, { ShameExpression, HappyExpression } from "../performers/Frog";
import CodeExample from "../CodeExample";
import { Emphasis } from "../Char";

const Install: React.FC = () => {
  return (
    <Section id={"install"} title={"Installing windups"}>
      <Dialog>
        <CodeExample>{"npm install windups"}</CodeExample>
        <Frog expression={"MAD"}>
          {
            "Wait just one minute! Are you saying we expect everyone to know what that means?"
          }
        </Frog>
        <Frog expression={"SHAME"}>
          {"So... in case three random words doesn't mean anything to you..."}
        </Frog>
        <Frog>
          {"To use windups, you have to add it as a "}{" "}
          <Emphasis>{"dependency"}</Emphasis> {" to your project first."}
        </Frog>
        <Frog>
          {
            "Navigate to the directory containing your project in your command line, and type this..."
          }
        </Frog>
        <CodeExample>{"npm install windups"}</CodeExample>
        <Frog expression={"HAPPY"}>
          {
            "And hit return! That should download windups' code to your computer so that you can actually use it."
          }
        </Frog>
        <Frog>
          {
            "If that didn't work, or if you don't know what I'm talking about, well..."
          }
          <ShameExpression />
          {"I'd start by searching online..."}
        </Frog>
        <Frog expression={"SHAME"}>
          {"If you're just starting with programming,"}
          <HappyExpression />
          {" that's a skill you'll be usin' a lot!"}
        </Frog>
      </Dialog>
    </Section>
  );
};

export default Install;
