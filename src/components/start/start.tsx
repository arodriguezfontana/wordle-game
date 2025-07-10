import { useState } from "react";
import Button from "../button/button";
import Rules from "../rules/rules";

interface StartProperties {
  onClickStart: () => void;
}

const Start = ({ onClickStart }: StartProperties) => {
  const [showRules, setShowRules] = useState(false);

  return (
    <div>
      <Button onClick={() => setShowRules(true)} color={"red"}>
        Reglas del juego
      </Button>
      <Button onClick={onClickStart} color={"green"}>
        Empezar a jugar
      </Button>

      {showRules && <Rules onClose={() => setShowRules(false)} />}
    </div>
  );
};

export default Start;