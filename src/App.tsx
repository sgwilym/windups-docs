import React from "react";

import Dialog from "./Dialog";
import DialogElement from "./DialogElement";
import useInternetTime from "use-internet-time";

const App: React.FC = () => {
  const time = useInternetTime({ fractional: true });

  return (
    <div>
      <Dialog>
        <DialogElement>{"What is this thing?"}</DialogElement>
        <DialogElement>{`It's ${time} everywhere in the world!`}</DialogElement>
      </Dialog>
      <Dialog>
        <DialogElement>{"Oh, hello there."}</DialogElement>
        <DialogElement>
          {"Come to see what this is all about, have you?"}
        </DialogElement>
        <DialogElement>{"Let's make it worth your while."}</DialogElement>
      </Dialog>
    </div>
  );
};

export default App;
