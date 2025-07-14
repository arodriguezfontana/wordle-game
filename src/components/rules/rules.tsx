import "./rules.css";
import Button from "../button/button";

interface RulesProps {
  onClose: () => void;
}

const Rules = ({ onClose }: RulesProps) => {
  return (
    <div className="rules-overlay">
      <div className="rules-content">
        <h3 className="rules-title">Reglas del Juego</h3>
        <p>
          Se escribe una palabra de x cantidad de letras válida en español.
          El juego evalúa cada letra y las marca con colores para mejorar un próximo intento.
          Son 6 intentos como máximo para adivinar la palabra.
        </p>
        <ul className="color-rules">
          <li><strong style={{ color: '#22c55e' }}>VERDE</strong>: en la palabra y en la posición correcta.</li>
          <li><strong style={{ color: '#facc15' }}>AMARILLO</strong>: en la palabra pero en la posición incorrecta.</li>
          <li><strong style={{ color: '#6b7280' }}>GRIS</strong>: no presente en la palabra.</li>
        </ul>
        <Button onClick={onClose} border={true}>x</Button>
      </div>
    </div>
  );
};

export default Rules;