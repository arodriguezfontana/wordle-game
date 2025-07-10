import "./rules.css";
import Button from "../button/button";

interface RulesProps {
  onClose: () => void;
}

const Rules = ({ onClose }: RulesProps) => {
  return (
    <div className="rules-overlay">
      <div className="rules-content">
        <h3>Reglas del Juego</h3>
        <p>
          Las reglas son sencillas: escribís una palabra de X letras válida (en español).
          El juego evalúa cada letra y marca las pistas con colores.
          Usás esas pistas para mejorar tu próximo intento.
          Tenés 6 intentos como máximo para adivinar la palabra.
        </p>
        <ul>
          <li><strong style={{ color: "green" }}>VERDE</strong>: letra en la palabra y en la posición correcta.</li>
          <li><strong style={{ color: "yellow" }}>AMARILLO</strong>: letra en la palabra pero en la posición incorrecta.</li>
          <li><strong style={{ color: "gray" }}>GRIS</strong>: letra no presente en la palabra.</li>
        </ul>
        <Button onClick={onClose}>X</Button>
      </div>
    </div>
  );
};

export default Rules;