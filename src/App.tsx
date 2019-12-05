import React from "react";
import { AngryChar } from "./Char";
import Dialog from "./Dialog";

const App: React.FC = () => {
  return (
    <div>
      <Dialog
        dialog={[
          {
            textArgs: [
              "Oh this old chestnut again. ",
              [
                "It's a bald-faced lie and you know it! ",
                { charElement: AngryChar }
              ],
              "Bob Marley did not die from toe cancer!"
            ]
          },
          {
            textArgs: [
              "It's ",
              ["true!!! ", { charElement: AngryChar }],
              "Bobby from the shops told me."
            ]
          }
        ]}
      />
    </div>
  );
};

export default App;
