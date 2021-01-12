import React, { useRef, useState } from "react";
import { css, cx } from "linaria";
import Chat from "./content/Chat";
import Heading from "./Heading";
import Banner from "./Banner";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  NavLinkProps,
  useLocation,
} from "react-router-dom";
import { GREY, TEXT_PINK, GREEN } from "./colours";
import { useInView } from "react-intersection-observer";
import useInternetTime from "use-internet-time";
import QuickStart from "./content/QuickStart";
import Guides from "./content/Guides";
import APIDocs from "./content/APIDocs";
import KeyIcon from "./images/key-menu.svg";
import CompassIcon from "./images/compass-menu.svg";
import FrogIcon from "./images/frog-menu.svg";
import KeyboardIcon from "./images/keyboard-menu.svg";
import GitIcon from "./images/repo-menu.svg";
import Megayaki from "./images/mega-yaki.svg";
import SnowmanKebab from "./images/snowman-kebab.svg";
import RufflePizza from "./images/ruffle-pizza.svg";
import { useWindupString, CharWrapper, Pause } from "windups";
import Cutlery from "./images/forks.svg";
import useComponentSize from "@rehooks/component-size";
import Frog, { HappyExpression, usePreloadFrogFrames } from "./performers/Frog";
import Dialog from "./Dialog";
import SectionFocusContext from "./SectionFocusContext";
import BlockLink from "./BlockLink";
import { NextButton } from "./DialogElement";

type SectionProps = {
  title: string;
  right?: boolean;
};

const sectionRootStyle = css`
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const Section: React.FC<SectionProps> = ({ title, children, right }) => {
  const [titlePrinted, setIsTitlePrinted] = React.useState(false);

  return (
    <div className={sectionRootStyle}>
      <Heading
        onFinished={() => {
          setTimeout(() => {
            setIsTitlePrinted(true);
          }, 300);
        }}
        right={right}
      >
        {title}
      </Heading>
      {titlePrinted && children}
    </div>
  );
};

const contentStyle = css`
  grid-column: 2/9;
  margin: 72px 0 0 0;
  transform: translateZ(0);
`;

const footerStyle = css`
  font-family: "Menlo", monospace;
  text-align: center;
  padding-bottom: 36px;
  grid-column: 2/9;

  a {
    color: black;
    text-decoration-thickness: 2px;
    text-decoration-color: ${TEXT_PINK};
  }
`;

const navStyle = css`
  box-shadow: 2px 2px 7px rgba(0, 0, 0, 0.05);
  height: 1.5em;
  position: sticky;
  top: 1em;
  background: ${GREY};
  z-index: 100;
  font-family: "Menlo", monospace;
  font-style: italic;
  padding: 16px 0px;
  display: flex;
  justify-content: space-between;
  grid-column: 2/9;
  border-radius: 8px;
  border: 2px black solid;
  margin-top: 1em;
  padding: 8px;
  align-items: center;
  overflow: auto;
`;

const activeLinkStyle = css`
  text-decoration-color: ${TEXT_PINK};
`;

const landingSectionRoot = css`
  margin: 0 0 5em 0;
`;

const LandingSection: React.FC = ({ children }) => {
  return <section className={landingSectionRoot}>{children}</section>;
};

const landingNextButtonStyles = css`
  width: 20em;

  margin: 3em auto 0;
`;

const LandingNextButton: React.FC = () => {
  return (
    <div className={landingNextButtonStyles}>
      <NextButton />
    </div>
  );
};

const IntroScreen: React.FC = () => {
  const [bannerFinished, setIsBannerFinished] = useState(false);
  const [chatFinished, setIsChatFinished] = useState(false);

  return (
    <LandingSection>
      <Banner onFinished={() => setIsBannerFinished(true)} />
      {bannerFinished && (
        <Section title={"Make text come alive!"}>
          <Chat onFinished={() => setIsChatFinished(true)} />
        </Section>
      )}
      {chatFinished && <LandingNextButton />}
    </LandingSection>
  );
};

const itemRootStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Menlo, sans-serif;
  font-size: 1.2em;
`;

const nameStyle = css`
  margin: 0.6em 0;
  transform: skew(5deg, 5deg);
  color: white;
  background-color: black;
  padding: 8px;
`;

const ctaCharStyle = css`
  @keyframes slam {
    from {
      transform: scale(7) rotate(30deg);
      opacity: 0;
    }
    to {
      transform: scale(1) rotate(-10deg);
      opacity: 1;
    }
  }
  animation-name: slam;
  animation-duration: 600ms;
  animation-iteration-count: 1;
  animation-timing-function: cubic-bezier(0.82, -0.35, 1, 1);
  animation-fill-mode: both;
  color: ${GREEN};
  display: inline-block;
`;

const strikethroughStyle = css`
  margin-right: 0.5em;
  text-decoration-color: ${GREEN};
  text-decoration-thickness: 2px;
`;

const CtaChar: React.FC = ({ children }) => {
  return <span className={ctaCharStyle}>{children}</span>;
};

const MenuItem: React.FC<{
  name: string;
  img: string;
  price: number;
  discountedPrice?: number;
  onFinished?: () => void;
}> = ({ img, name, discountedPrice, price, onFinished }) => {
  const [wasInViewRef, wasInView] = useWasInView();
  const [windup] = useWindupString(
    wasInView && discountedPrice ? `ƒ${discountedPrice}!` : "",
    {
      pace: () => 450,
      onFinished,
    }
  );

  return (
    <div className={itemRootStyle}>
      <img src={img} alt={"A fantasy menu item"} />
      <div ref={wasInViewRef} className={nameStyle}>
        {name}
      </div>
      <div>
        {discountedPrice ? (
          <>
            <s className={strikethroughStyle}>{`ƒ${price}`}</s>
            {wasInView && <CharWrapper element={CtaChar}>{windup}</CharWrapper>}
          </>
        ) : (
          `ƒ${price}`
        )}
      </div>
    </div>
  );
};

const pizzaRowStyle = css`
  display: flex;
  justify-content: center;
`;

const secondRowStyle = css`
  display: flex;
  justify-content: space-around;
`;

const menuStyle = css`
  @keyframes drift {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: 150px 90px;
    }
  }
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  animation-name: drift, fadeIn;
  animation-duration: 20s, 1s;
  animation-iteration-count: infinite, 1;
  animation-timing-function: linear, ease-in-out;
  background-color: white;
  border: 3px solid black;
  padding: 16px;
  transform: translateZ(0) rotate(3deg);
  border-radius: 2px;
  box-shadow: 2px 2px 7px rgba(0, 0, 0, 0.05);
  background-image: url(${Cutlery});
  background-size: 150px 90px;
`;

function useWasInView(): [() => void, boolean] {
  const [wasInView, setWasInView] = React.useState(false);
  const [inViewRef, isInView] = useInView({
    rootMargin: "-100px 0px",
  });

  React.useEffect(() => {
    if (isInView && !wasInView) {
      setWasInView(true);
    }
  }, [isInView, wasInView]);

  return [inViewRef, wasInView];
}

const AttentionScreen: React.FC = () => {
  const [isFinished, setIsFinished] = useState(false);

  return (
    <LandingSection>
      <Section title={"Call attention!"} right>
        <div className={menuStyle}>
          <div className={pizzaRowStyle}>
            <MenuItem name={"Mega-Yaki"} img={Megayaki} price={500} />
          </div>
          <div className={secondRowStyle}>
            <MenuItem
              name={"Ruffle Pizza"}
              img={RufflePizza}
              price={400}
              discountedPrice={200}
              onFinished={() => setIsFinished(true)}
            />
            <MenuItem name={"Snowman Kebab"} img={SnowmanKebab} price={300} />
          </div>
        </div>
        {isFinished && <LandingNextButton />}
      </Section>
    </LandingSection>
  );
};

const buttonsRootStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const buttonStyle = css`
  margin-left: 1em;
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @keyframes enter {
    0% {
      opacity: 0;
    }
    20% {
      opacity: 1;
    }
    25% {
      animation-timing-function: cubic-bezier(0.4, 0, 1, 0.6);
      transform: translate3d(0, -100%, 0);
      transform-style: preserve-3d;
    }
    0%,
    50%,
    88%,
    96%,
    100% {
      animation-timing-function: cubic-bezier(0.12, 0.52, 0.57, 1);
      transform: translate3d(0, 0, 0);
      transform-style: preserve-3d;
    }
    75% {
      animation-timing-function: cubic-bezier(0.4, 0, 1, 0.6);
      transform: translate3d(0, -33%, 0);
      transform-style: preserve-3d;
    }
    94% {
      animation-timing-function: cubic-bezier(0.4, 0, 1, 0.6);
      transform: translate3d(0, -11%, 0);
      transform-style: preserve-3d;
    }
    97% {
      animation-timing-function: cubic-bezier(0.4, 0, 1, 0.6);
      transform: translate3d(0, -3%, 0);
      transform-style: preserve-3d;
    }
  }
  animation-name: enter, fadeIn;
  animation-duration: 500ms, 1s;
  animation-iteration-count: 1;
`;

const LearnScreen: React.FC = () => {
  return (
    <LandingSection>
      <SectionFocusContext.Provider
        value={{ activeSectionID: "", setActiveSectionID: () => {} }}
      >
        <Section title={"Let this frog be your guide!"}>
          <Dialog>
            <Frog>
              {"Yup."}
              <Pause ms={500} />
              {"That'll be me."}
              <Pause ms={500} />
              {"Folks call me..."}
              <Pause ms={500} />
              {"frog."}
            </Frog>
            <Frog>
              {
                "Yeah yeah. I know. “I'm going to be taught how to use this thing by a frog?”"
              }
            </Frog>
            <Frog>
              {"Yup."}
              <Pause ms={500} />
              {
                "Originally we wanted a pig to do it, but didn't have the budget."
              }
              <HappyExpression /> {"Yar har har!"}
            </Frog>
            <Frog autoProceed>
              {"Just kidding."}
              <Pause ms={500} />
              {"This is open source, so we don't have a budget."}
              <Pause ms={500} />
            </Frog>
            <Frog autoProceed>{"Start wherever you want."}</Frog>
            <div className={buttonsRootStyle}>
              <BlockLink className={buttonStyle} theme={"BLACK"} to={"/quick"}>
                <img src={CompassIcon} />
                {"lookup"}
              </BlockLink>
              <BlockLink className={buttonStyle} to={"/guides"} theme={"GREEN"}>
                <img src={FrogIcon} />
                {"guides"}
              </BlockLink>
              <BlockLink className={buttonStyle} to={"/api"}>
                <img src={KeyboardIcon} />
                {"api"}
              </BlockLink>
            </div>
          </Dialog>
        </Section>
      </SectionFocusContext.Provider>
    </LandingSection>
  );
};

const SMASH_MS = 300;

const smashStyles = css`
  @keyframes smash {
    0% {
      transform: translate(0, 10px);
    }
    10% {
      transform: translate(20px, -30px);
    }
    20% {
      transform: translate(-12px, 17px);
    }
    40% {
      transform: translate(7px, -9px);
    }
    60% {
      transform: translate(-3px, 4px);
    }
    80% {
      transform: translate(1px, -1px);
    }
    100% {
      transform: translate(0, 0);
    }
  }

  animation-name: smash;
  animation-duration: ${SMASH_MS}ms;
  animation-iteration-count: 1;
  animation-timing-function: ease-in-out;
`;

export const SFXContext = React.createContext({
  smash: () => {},
});

const SFX: React.FC = ({ children }) => {
  const [isSmashing, setIsSmashing] = React.useState(false);

  const smash = React.useCallback(() => {
    setIsSmashing(true);
  }, []);

  React.useEffect(() => {
    if (isSmashing) {
      setTimeout(() => {
        setIsSmashing(false);
      }, SMASH_MS);
    }
  }, [isSmashing]);

  return (
    <SFXContext.Provider value={{ smash }}>
      <div className={cx(isSmashing && smashStyles)}>{children}</div>
    </SFXContext.Provider>
  );
};

const gridStyles = css`
  display: grid;
  grid-template-columns: 1fr repeat(7, 96px) 1fr;
  grid-template-rows: 20px 1fr 36px;
  column-gap: 8px;
  min-height: 100vh;
`;

const mobileGridStyles = css`
  display: grid;
  grid-template-columns: 0fr repeat(7, 1fr) 0fr;
  column-gap: 8px;
  min-height: 100vh;
  grid-template-rows: 20px 1fr 36px;

  nav {
    height: 40px;
  }
`;

const subgridStyles = css`
  display: grid;
  grid-template-columns: repeat(7, 96px);
  column-gap: 8px;
`;

const mobileSubGridStyle = css`
  display: grid;
  grid-template-columns: 0fr repeat(6, 1fr);
  column-gap: 8px;
`;

const indentStyle = css`
  grid-column: 2/8;
`;

const Grid: React.FC = ({ children }) => {
  const gridRef = useRef(null);
  const { width } = useComponentSize(gridRef);

  const style = width <= 672 ? mobileGridStyles : gridStyles;

  return (
    <div ref={gridRef} className={style}>
      {children}
    </div>
  );
};

export const SubGrid: React.FC = ({ children }) => {
  const gridRef = useRef(null);
  const { width } = useComponentSize(gridRef);

  const style = width <= 672 ? mobileSubGridStyle : subgridStyles;

  return (
    <div ref={gridRef} className={style}>
      {children}
    </div>
  );
};

export const Indent1: React.FC = ({ children }) => (
  <div className={indentStyle}>{children}</div>
);

const navMenuLinkStyle = css`
  display: flex;
  align-items: center;
  flex: 0 1 auto;
  color: black;
  text-decoration-thickness: 2px;
  margin-right: 1em;
  text-transform: lowercase;

  &:hover {
    color: ${TEXT_PINK};
    text-decoration-color: black;
  }

  img {
    margin-right: 0.3em;
  }
`;

const NavMenuLink: React.FC<NavLinkProps> = ({ children, ...props }) => (
  <NavLink {...props} className={navMenuLinkStyle}>
    {children}
  </NavLink>
);

const internetTimeStyle = css`
  text-align: right;
  flex: 1 0 auto;
  color: black;
  text-decoration-thickness: 2px;
`;

const Time = () => {
  const time = useInternetTime();
  return (
    <a
      target={"_blank"}
      href={"http://gwil.co/internet-time"}
      className={internetTimeStyle}
    >
      {time}
    </a>
  );
};

function useScrollToTop() {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
}

const Landing: React.FC = () => {
  return (
    <SectionFocusContext.Provider
      value={{ activeSectionID: "", setActiveSectionID: () => {} }}
    >
      <Dialog>
        <IntroScreen />
        <AttentionScreen />
        <LearnScreen />
      </Dialog>
    </SectionFocusContext.Provider>
  );
};

const App: React.FC = () => {
  useScrollToTop();
  usePreloadFrogFrames();

  return (
    <Grid>
      <nav className={cx(navStyle)} title="Navigation">
        <NavMenuLink exact activeClassName={activeLinkStyle} to={"/"}>
          <img src={KeyIcon} aria-hidden alt={"A wind-up key"} />
          {"windups"}
        </NavMenuLink>
        <NavMenuLink activeClassName={activeLinkStyle} to={"/quick"}>
          <img src={CompassIcon} aria-hidden alt={"A compass"} />
          {"Lookup"}
        </NavMenuLink>
        <NavMenuLink activeClassName={activeLinkStyle} to={"/guides"}>
          <img src={FrogIcon} aria-hidden alt={"A frog"} />
          {"Guides"}
        </NavMenuLink>
        <NavMenuLink
          activeClassName={activeLinkStyle}
          to={"/api"}
          title={"A.P.I."}
        >
          <img src={KeyboardIcon} aria-hidden alt={"A tiny keyboard"} />
          {"API"}
        </NavMenuLink>
        <a
          className={navMenuLinkStyle}
          href={"https://github.com/sgwilym/windups"}
          title={"repo"}
        >
          <img src={GitIcon} aria-hidden alt={"A little forking icon"} />
          {"repo"}
        </a>
        <Time />
      </nav>

      <div className={contentStyle}>
        <SFX>
          <Route exact path={"/"}>
            <Landing />
          </Route>
          <Route exact path={"/guides"}>
            <Guides />
          </Route>
          <Route exact path={"/quick"}>
            <QuickStart />
          </Route>
          <Route exact path={"/api"}>
            <APIDocs />
          </Route>
        </SFX>
      </div>
      <div className={footerStyle}>
        {"© "}
        <a href={"https://gwil.co"}>{"Sam Gwilym"}</a>
        {" 2020"}
      </div>
    </Grid>
  );
};

const AppWithRouter = () => (
  <Router>
    <App />
  </Router>
);

export default AppWithRouter;
