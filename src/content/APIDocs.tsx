import React from "react";
import Heading from "../Heading";
import Subheading from "../Subheading";
import { default as P } from "../Paragraph";
import { useLocation } from "react-router-dom";
import StaticCodeExample from "../StaticCodeExample";
import { css } from "linaria";
import { YELLOW } from "../colours";
import BlockLink from "../BlockLink";
import { SubGrid, Indent1 } from "../App";
import FrogIcon from "../images/frog-menu.svg";

const extraInfoText = css`
  background-color: ${YELLOW};
`;

const extraInfoRoot = css`
  font: 14px Menlo, monospace;
  margin: 0 0 16px 0;
  line-height: 1.7em;
`;

const ExtraInfo: React.FC = ({ children }) => {
  return (
    <div className={extraInfoRoot}>
      <mark className={extraInfoText}>{children}</mark>
    </div>
  );
};

type PropInfo = { sig: string; desc: string };

const propBitRootStyle = css`
  display: flex;
  align-items: baseline;
  margin: 0 0 12px 0;
`;

const propSigStyle = css`
  background: #f9f9f9;
  padding: 0 8px;
  border: 2px solid #f9f9f9;
  border-radius: 5px;
`;

const propDescStyle = css`
  margin-left: 16px;
`;

type PropBitProps = {
  info: PropInfo;
};

const PropBit: React.FC<PropBitProps> = ({ info }) => {
  return (
    <div className={propBitRootStyle}>
      <div className={propSigStyle}>
        <P>{info.sig}</P>
      </div>
      <div className={propDescStyle}>
        <P>{info.desc}</P>
      </div>
    </div>
  );
};

const docRootStyles = css`
  padding-top: 72px;
  grid-column: 1/8;
`;

type DocProps = {
  title: string;
  shortDesc: string;
  basicExample: string;
  sig?: string;
  guides?: { path: string; name: string }[];
  extraInfo?: string[];
  props?: PropInfo[];
  id: string;
};

const Doc: React.FC<DocProps> = ({
  title,
  shortDesc,
  sig,
  props,
  guides,
  extraInfo,
  basicExample,
  id
}) => {
  const { hash } = useLocation();

  const isHashLinked = hash === `#${id}`;

  return (
    <article className={docRootStyles} id={id} key={id}>
      <SubGrid>
        <Heading noWindup={!isHashLinked}>{title}</Heading>
        <Indent1>
          <div>
            <P>{shortDesc}</P>
            {guides && (
              <>
                <Subheading>{"Guides"}</Subheading>
                {guides.map(guide => (
                  <BlockLink
                    to={`/guides/${guide.path}`}
                    key={guide.path}
                    theme={"GREEN"}
                  >
                    <img alt={"a frog"} src={FrogIcon} />
                    {guide.name}
                  </BlockLink>
                ))}
              </>
            )}
            <Subheading>{"Example"}</Subheading>
            <StaticCodeExample>{basicExample}</StaticCodeExample>
            {sig && (
              <>
                <Subheading>{"Arguments and return values"}</Subheading>
                <StaticCodeExample>{sig}</StaticCodeExample>
              </>
            )}
            {props && (
              <>
                <Subheading>{"Props"}</Subheading>
                {props.map(p => {
                  return <PropBit key={p.sig} info={p} />;
                })}
              </>
            )}
            {extraInfo && (
              <>
                <Subheading>{"Notes"}</Subheading>
                {extraInfo.map((info, i) => (
                  <ExtraInfo key={i}>{info}</ExtraInfo>
                ))}
              </>
            )}
          </div>
        </Indent1>
      </SubGrid>
    </article>
  );
};

const docs: DocProps[] = [
  {
    id: "use-windup-string",
    title: "useWindupString",
    shortDesc:
      "given a string and some options, this hook returns a tuple containing a string and some handy extras.",
    extraInfo: [
      "If the string you pass to useWindupString changes, the windup effect will restart from the beginning."
    ],
    basicExample: `const MyStringyWindup = () => {
    const [windup] = useWindupString("Hello world!");

    return <div>{windup}</div>;
}`,
    sig: `useWindup(
    // the text to turn into a windup
    text: string,
    options: {
        // A function that fires every time a character is added
        onChar?: (char: string) => void;
        // A function that fires when the windup ends
        onFinished?: () => void;
        // A function that returns how long to wait until adding the next character in milliseconds
        pace?: (char: string) => number;
        // A boolean indicating whether the windup effect should be skipped.
        skipped?: boolean;
    }
) = [
    // A string with all the characters added to the windup so far
    windup: string,
    {
        // Calling this will finish the windup effect instantly
        skip: () => void;
        // Calling this will restart the windup effect
        rewind: () => void;
        // Indicates whether the windup effect has finished or not
        isFinished: boolean;
    }
]`,
    guides: [
      {
        name: "Make a stringy windup",
        path: "/guides#stringy-windup"
      }
    ]
  },
  {
    id: "windup-children",
    title: "<WindupChildren>",
    basicExample: `const MyStylishWindup = () => {
    return (
        <WindupChildren>
            {"This is "}
            <em>{"super"}</em>
            {" cool!"}
        </WindupChildren>
    );
}`,
    shortDesc:
      "A component that creates a windup effect out of children provided to it, which makes windups with differently styled parts possible.",
    extraInfo: [
      "As the name implies, the WindupChildren component only works on text passed to components as children. For example, if WindupChildren is passed a component that renders text from a source other than the children prop, it will not be able to detect that text and will not include it in the windup effect.",
      "If the shape of the children or their props changes, the windup effect will start over."
    ],
    props: [
      {
        sig: "onFinished: () => void",
        desc: "A function that fires when the windup effect finishes."
      },
      {
        sig: "skipped: boolean",
        desc: "Whether to windup effect is skipped or not"
      },
      {
        sig: "children: node",
        desc: "The React children to be turned into a windup"
      }
    ],
    guides: [
      {
        name: "Styling text segments",
        path: "/guides#styling-text-segments"
      }
    ]
  },
  {
    id: "pause",
    title: "<Pause>",
    shortDesc: "Adds an arbitrary pause to a WindupChildren windup",
    basicExample: `const MyAwkwardPause = () => {
  return (
    <WindupChildren>
      {"Hey, so... "}
      <Pause ms={1000}/>
      {"are you gonna eat that?"}
    </WindupChildren>
  );
}`,
    props: [
      { desc: "The number of milliseconds to pause for.", sig: "ms: number" }
    ],
    extraInfo: [
      "For <WindupChildren> to detect <Pause>, it must be passed through a component's children prop."
    ],
    guides: [
      {
        name: "Getting timing right",
        path: "/guides#timing"
      }
    ]
  },
  {
    id: "effect",
    title: "<Effect>",
    shortDesc:
      "Calls a function once when rendered in a WindupChildren windup.",
    basicExample: `const MyDramaticEffect = () => {
  return (
    <WindupChildren>
      {"Hey, watch out! The floor is- "}
      <Effect fn={playCrashingSound}/>
      {"wet..."}
    </WindupChildren>
  );
}`,
    props: [
      {
        desc: "The function to fire when this renders.",
        sig: "fn: () => void"
      }
    ],
    guides: [
      {
        name: "Calling your own functions",
        path: "/guides#calling-functions"
      }
    ]
  },
  {
    id: "pace",
    title: "<Pace>",
    shortDesc: "Changes the pace of the windup for characters within it.",
    basicExample: `const MyPatronisingLecture = () => {
  return (
    <WindupChildren>
      {"Let me spell it out for you. You are "}
      <Pace ms={100}>{"G-R-O-U-N-D-E-D."}</Pace>
    </WindupChildren>
  );
}`,
    props: [
      {
        desc:
          "The number of milliseconds to use as the pace for every character.",
        sig: "ms: number"
      },
      {
        desc:
          "A function that returns the number of milliseconds to wait until the adding the next character.",
        sig: "fn: (char: string) => number"
      }
    ],
    extraInfo: [
      "For <WindupChildren> to detect <Pace>, it must be passed through a component's children prop."
    ],
    guides: [
      {
        name: "Getting timing right",
        path: "/guides#timing"
      }
    ]
  },
  {
    id: "on-char",
    title: "<OnChar>",
    shortDesc: "Fires a callback for each character printed within it.",
    basicExample: `const MyVeryAnimatedText = () => {
      return (
        <WindupChildren>
          <OnChar fn={playMorseSound}>{"S.O.S!!!"}</OnChar>
        </WindupChildren>
      );
    }`,
    props: [
      {
        desc: "A function to fire when each character is printed",
        sig: "fn: (char: string) => void"
      }
    ],
    guides: [
      {
        name: "Calling your own functions",
        path: "/guides#calling-functions"
      }
    ]
  },
  {
    id: "char-wrapper",
    title: "<CharWrapper>",
    shortDesc:
      "Wraps each individual character inside within a given element. Useful when you want to animate characters individually.",
    basicExample: `const MyVeryAnimatedText = () => {
  return (
    <WindupChildren>
      <CharWrapper element={ConfettiExplosionComponent}>{"Fabulous!"}</CharWrapper>
    </WindupChildren>
  );
}`,
    props: [
      {
        desc:
          "The element to wrap each character in. Can be a React component or a HTML element.",
        sig: "element: ReactElement"
      }
    ],
    extraInfo: [
      "CharWrapper will automatically break up strings provided to it into characters and wrap each one. If its children contains any React components, it will treat it as a character and wrap it."
    ],
    guides: [
      {
        name: "Animating individual characters",
        path: "/guides#animating-characters"
      }
    ]
  },
  {
    id: "linebreaker",
    title: "<Linebreaker>",
    shortDesc:
      "Automatically adds newlines to text given a font style and width. Simplifies a complex issue but has a few caveats.",
    basicExample: `const MyNicelyTypesetWindup = () => {
  return (
    <Linebreaker fontStyle={"16px Georgia"} width={350}>
      <WindupChildren>
        {"This text will never awkwardly jump from one line to to the next."}
      </WindupChildren>
    </Linebreaker>
  );
}`,
    props: [
      {
        desc: "A string representing a CSS font style.",
        sig: "fontStyle: string"
      },
      {
        desc: "The width that the text should break on in pixels",
        sig: "width: number"
      }
    ],
    extraInfo: [
      "Linebreaker must be used outside of WindupChildren, and not the other way around.",
      "The font style of text rendered within Linebreaker must match that provided to the fontStyle prop",
      "Arbitrary components used inside of Linebreaker must not add extra width to the layout."
    ],
    guides: [
      {
        name: "Breaking lines",
        path: "/guides#breaking-lines"
      }
    ]
  },
  {
    id: "use-skip",
    title: "useSkip",
    shortDesc: "A hook which returns a function that skips the windup effect.",
    basicExample: `const SkipButton = () => {
  const skip = useSkip();
  return <button onClick={skip}>{"Skip"}</button>;
}

const MySkippableWindup = () => {
  return (
    <WindupChildren>
      <SkipButton/>
      {"If you're in a hurry, you can use the skip button above."}
    </WindupChildren>
  );
}`,
    extraInfo: [
      "To work this must be called by a component rendered within <WindupChildren>."
    ],
    guides: [
      {
        name: "Skip and Rewind",
        path: "/guides#skip-rewind"
      }
    ]
  },
  {
    id: "use-rewind",
    title: "useRewind",
    shortDesc:
      "A hook which returns a function that rewinds the windup effect.",
    basicExample: `const RewindButton = () => {
  const rewind = useRewind();
  return <button onClick={rewind}>{"Rewind"}</button>;
}

const MySkippableWindup = () => {
  return (
    <WindupChildren>
      {"Liked this text? Click below!"}
      <RewindButton/>
    </WindupChildren>
  );
}`,
    extraInfo: [
      "To work this must be called by a component rendered within <WindupChildren>."
    ],
    guides: [
      {
        name: "Skip and Rewind",
        path: "/guides#skip-rewind"
      }
    ]
  },
  {
    id: "use-is-finished",
    title: "useIsFinished",
    shortDesc:
      "A hook which returns a boolean indicating whether the windup has finished or not.",
    basicExample: `const FinishedIndicator = () => {
  const isFinished = useIsFinished();
  return isFinished ? "✔" : null;
}

const MySkippableWindup = () => {
  return (
    <WindupChildren>
      <FinishedIndicatior/>
      {"This windup has finished animating."} 
    </WindupChildren>
  );
}`,
    extraInfo: [
      "To work this must be called by a component rendered within <WindupChildren>."
    ]
  },
  {
    id: "text-from-children",
    sig: "(children: React.ReactNode) => string",
    title: "textFromChildren",
    shortDesc:
      "A function that returns the text content of React children, useful for enhancing accessibility.",
    basicExample: `const windupText = textFromChildren(children);

return (
    <>
      <VisuallyHidden>{text}</VisuallyHidden>
      <div aria-hidden>
        <WindupChildren>
          {children}
        </WindupChildren>
      </div>
  </>
);
    `
  }
];

const linkStyle = css`
  margin-bottom: 8px;
`;

const APIDocs: React.FC = () => {
  return (
    <SubGrid>
      <Heading>{"API"}</Heading>
      <Indent1>
        <ExtraInfo>
          {"FYI, windups comes with its own Typescript type definitions."}
        </ExtraInfo>
        <nav>
          {docs.map(d => (
            <div className={linkStyle} key={d.id}>
              <BlockLink to={`/api#${d.id}`}>{d.title}</BlockLink>
            </div>
          ))}
        </nav>
      </Indent1>
      {docs.map(d => (
        <Doc key={d.id} {...d} />
      ))}
    </SubGrid>
  );
};

export default APIDocs;
