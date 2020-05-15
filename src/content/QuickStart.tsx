import React from "react";
import { css } from "linaria";
import { PINK } from "../colours";
import Heading from "../Heading";
import BlockLink from "../BlockLink";
import { SubGrid, Indent1 } from "../App";
import KeyboardIcon from "../images/keyboard-menu.svg";
import FrogIcon from "../images/frog-menu.svg";

type LinkType = "GUIDE" | "API";

type FeatureDesc = {
  capability: string;
  doesItWith: {
    path: string;
    name: string;
    type: LinkType;
  }[];
};

type TableRowProps = {
  feature: FeatureDesc;
};

const TableRow: React.FC<TableRowProps> = ({ feature }) => (
  <tr>
    <th>{feature.capability}</th>
    <td>{"→"}</td>
    <td>
      {feature.doesItWith.map((thing, i) => (
        <>
          <BlockLink
            to={thing.path}
            theme={thing.type === "API" ? "PINK" : "GREEN"}
          >
            <img
              alt={"a frog or a keyboard"}
              src={thing.type === "API" ? KeyboardIcon : FrogIcon}
            />
            {thing.name}
          </BlockLink>
          {i < feature.doesItWith.length - 1 && <br />}
        </>
      ))}
    </td>
  </tr>
);

const tableStyle = css`
  border: none;
  border-collapse: collapse;
  font-family: "Menlo", monospace;
  grid-column: 1/8;

  tr {
    border: 1px solid ${PINK};
    border-left: none;
    border-right: none;
  }

  tr:first-child {
    border-top: none;
  }

  tr:last-child {
    border-bottom: none;
  }

  th {
    font-weight: normal;
    font-style: italic;
    text-align: left;
  }

  th,
  td {
    padding: 6px;
  }

  a {
    margin-bottom: 8px;
  }
`;

const features: FeatureDesc[] = [
  {
    capability: "Create animated strings",
    doesItWith: [
      {
        name: "useWindupString",
        path: "/api#use-windup-string",
        type: "API"
      },
      {
        name: "Make a stringy windup",
        path: "/guides#stringy-windup",
        type: "GUIDE"
      }
    ]
  },
  {
    capability: "Create animated text with different styles",
    doesItWith: [
      { name: "WindupChildren", path: "/api#windup-children", type: "API" },
      {
        name: "Styling text segments",
        path: "/guides#styling-text-segments",
        type: "GUIDE"
      }
    ]
  },
  {
    capability: "Include non-string elements",
    doesItWith: [
      { name: "WindupChildren", path: "/api#windup-children", type: "API" },
      {
        name: "Windups with non-strings",
        path: "/guides#windups-non-strings",
        type: "GUIDE"
      }
    ]
  },
  {
    capability: "Style many individual characters",
    doesItWith: [
      {
        name: "CharWrapper + WindupChildren",
        path: "/api#char-wrapper",
        type: "API"
      },
      {
        name: "Animating invidual characters",
        path: "/guides#animating-characters",
        type: "GUIDE"
      }
    ]
  },
  {
    capability: "Add arbitrary pauses",
    doesItWith: [
      { name: "Pause + WindupChildren", path: "/api#pause", type: "API" },
      {
        name: "Getting timing right",
        path: "/guides#timing",
        type: "GUIDE"
      }
    ]
  },
  {
    capability: "Configure the pace of windup effect",
    doesItWith: [
      { name: "Pace", path: "/api#pace", type: "API" },
      {
        name: "useWindupString pace option",
        path: "/api#use-windup-string",
        type: "API"
      },
      {
        name: "Getting timing right",
        path: "/guides#timing",
        type: "GUIDE"
      }
    ]
  },
  {
    capability: "Call functions upon addition of elements",
    doesItWith: [
      { name: "OnChar", path: "/api#on-char", type: "API" },
      {
        name: "useWindupString onChar option",
        path: "/api#use-windup-string",
        type: "API"
      },
      {
        name: "Calling your own functions",
        path: "/guides#calling-functions",
        type: "GUIDE"
      }
    ]
  },
  {
    capability: "Call functions at arbitrary points",
    doesItWith: [
      { name: "Effect + WindupChildren", path: "/api#effect", type: "API" }
    ]
  },
  {
    capability: "Call function when windup effect finishes",
    doesItWith: [
      {
        name: "useWindupString onFinished option",
        path: "/api#use-windup-string",
        type: "API"
      },
      {
        name: "onFinished prop of WindupChildren",
        path: "/api#windup-children",
        type: "API"
      },
      {
        name: "useIsFinished + WindupChildren",
        path: "/api#use-is-finished",
        type: "API"
      },

      {
        name: "Calling your own functions",
        path: "/guides#calling-functions",
        type: "GUIDE"
      }
    ]
  },
  {
    capability: "Dynamically break lines based on width",
    doesItWith: [
      { name: "Linebreaker", path: "/api#linebreaker", type: "API" },

      {
        name: "Breaking lines",
        path: "/guides#breaking-lines",
        type: "GUIDE"
      }
    ]
  },
  {
    capability: "Skip the windup effect",
    doesItWith: [
      {
        name: "useSkip + WindupChildren",
        path: "/api#use-skip",
        type: "API"
      },
      {
        name: "useWindupString skipped option",
        path: "/api#use-windup-string",
        type: "API"
      },
      {
        name: "skip callback returned by useWindupString",
        path: "/api#use-windup-string",
        type: "API"
      },
      {
        name: "Skip and Rewind",
        path: "/guides#skip-rewind",
        type: "GUIDE"
      }
    ]
  },
  {
    capability: "Rewind the windup effect",
    doesItWith: [
      {
        name: "useRewind + WindupChildren",
        path: "/api#use-rewind",
        type: "API"
      },
      {
        name: "rewind callback returned by useWindupString",
        path: "/api#use-windup-string",
        type: "API"
      },
      {
        name: "Skip and Rewind",
        path: "/guides#skip-rewind",
        type: "GUIDE"
      }
    ]
  }
];

const IWantToTable: React.FC = () => {
  return (
    <SubGrid>
      <Heading>{"I want to..."}</Heading>
      <Indent1>
        <table className={tableStyle}>
          <tbody>
            {features.map(f => (
              <TableRow feature={f} />
            ))}
          </tbody>
        </table>
      </Indent1>
    </SubGrid>
  );
};

const QuickStart: React.FC = () => {
  return <IWantToTable />;
};

export default QuickStart;
