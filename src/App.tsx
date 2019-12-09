import React from "react";

import Dialog from "./Dialog";
import DialogElement from "./DialogElement";

const App: React.FC = () => {
  return (
    <div>
      <Dialog>
        <DialogElement>{"Oh, hello there."}</DialogElement>
        <DialogElement>
          {"Come to see what this is all about, have you?"}
        </DialogElement>
        <>
          <DialogElement>{"Let's make it worth your while."}</DialogElement>
        </>
      </Dialog>
    </div>
  );
};

export default App;
