import { useRewind } from "auto-strings";
import useKey from "@rooks/use-key";
import { useContext } from "react";
import { DialogChildContext } from "./Dialog";

type RewindListenerProps = {
  onRewind: () => void;
};

const RewindListener: React.FC<RewindListenerProps> = ({ onRewind }) => {
  const { isActive } = useContext(DialogChildContext);
  const rewind = useRewind();
  useKey(
    [37],
    isActive
      ? () => {
          onRewind();
          rewind();
        }
      : () => {}
  );

  return null;
};

export default RewindListener;
