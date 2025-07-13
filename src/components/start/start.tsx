import { useState } from "react";
import Button from "../button/button";
import Rules from "../rules/rules";
import "./Start.css";

interface StartProperties {
  onClickStart: () => void;
}

const Start = ({ onClickStart }: StartProperties) => {
  const [showRules, setShowRules] = useState(false);

  return (
    <div>
      <div className="start-buttons">
        <Button onClick={() => setShowRules(true)} border={true}>
          Reglas del juego
        </Button>
        <Button onClick={onClickStart}>
          Empezar a jugar
        </Button>
      </div>
      {showRules && <Rules onClose={() => setShowRules(false)} />}
    </div>
  );
};

export default Start;