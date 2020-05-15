import React, { useContext } from "react";
import Section from "../Section";
import Dialog, { DialogChildContext } from "../Dialog";
import Frog, { HappyExpression } from "../performers/Frog";
import CodeExample from "../CodeExample";
import Example from "../Example";
import { WindupChildren } from "windups";

const PIC_EXAMPLE = `import React from "react";
import { WindupComponent } from "windups";

const AuntieWindup = () => {
  return (
    <WindupChildren>
      <div>
        {"My dear auntie"}
      </div>
      <img src={"auntie.jpg"}/>
      <div>
        {"The world's kindest frog"}
      </div>
    </WindupChildren>
  );
};`;

const COMPOSED_EXAMPLE = `import React from "react";
import { WindupComponent } from "windups";

const ComponentWithInlineText = ({children}) => {
  return (
    <>
      <div>{"This text will render immediately!"}</div>
      <div>{children}</div>
    </>
  )
}

const ComposedWindup = () => {
  return (
    <WindupChildren>
      <ComponentWithInlineText>
        {"This text will become part of the windup."}
      </ComponentWithInlineText>
    </WindupChildren>
  );
};`;

// Real stuff starts here

const AuntieWindup = () => {
  const { proceed } = useContext(DialogChildContext);
  return (
    <WindupChildren onFinished={proceed}>
      <div>{"My dear auntie"}</div>
      <img src={"auntie.jpg"} />
      <div>{"The world's kindest frog"}</div>
    </WindupChildren>
  );
};

const ComponentWithInlineText: React.FC = ({ children }) => {
  return (
    <>
      <div>{"This text will render immediately!"}</div>
      <div>{children}</div>
    </>
  );
};

const ComposedWindup = () => {
  const { proceed } = useContext(DialogChildContext);

  return (
    <WindupChildren onFinished={proceed}>
      <ComponentWithInlineText>
        {"This text will become part of the windup."}
      </ComponentWithInlineText>
    </WindupChildren>
  );
};

const WindupsWithAnything: React.FC = () => {
  return (
    <Section id={"windups-non-strings"} title={"Windups with non-strings"}>
      <Dialog>
        <Frog>
          {
            "Because the WindupChildren component has a children prop, you can put just about anything in there."
          }
        </Frog>
        <Frog>
          {
            "But you may be asking 'what's gonna happen if I put a picture of my dear aunt in there?'. Well... let's give it a go."
          }
        </Frog>
        <CodeExample>{PIC_EXAMPLE}</CodeExample>
        <Example>
          <AuntieWindup />
        </Example>
        <Frog>
          {
            "WindupChildren treats that image as though it's just a character in a sentence."
          }
        </Frog>
        <Frog>
          {"Now, what if you use a component that has some text in it?"}
        </Frog>
        <CodeExample>{COMPOSED_EXAMPLE}</CodeExample>
        <Example>
          <ComposedWindup />
        </Example>
        <Frog>
          {
            "So what's the deal? How come the text passed as children becomes part of the windup, but the text in the component doesn't?"
          }
        </Frog>
        <Frog>
          {
            "That's why WindupChildren is called WindupChildren, see? It can only see what's been passed through a children prop. What a component eventually renders may as well be invisible to it."
          }
        </Frog>
        <Frog>
          {
            "That may seem like a cop-out, but in my experience it's real useful."
          }
          <HappyExpression />
          {
            " Gives you fine-grained control over what goes in the windup and what doesn't."
          }
        </Frog>
        <Frog autoProceed>{"So just remember:"}</Frog>
        <Frog>
          {"Anything passed in a children prop will become part of the windup."}
        </Frog>
        <Frog>
          {
            "Text passed as children props will be broken up into individual characters."
          }
        </Frog>
        <Frog>
          {"And text that's rendered by a component through other means won't."}
        </Frog>
        <Frog>
          {"With that knowledge, you can get real creative with WindupChildren"}
        </Frog>
      </Dialog>
    </Section>
  );
};

export default WindupsWithAnything;
