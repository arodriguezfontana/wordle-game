import './difficultySelector.css';
import Loading from "../loading/loading";
import Button from "../button/button";
import type { Difficulty } from "../../types/difficulty";

interface DifficultySelectorProperties {
  difficulties: Difficulty[];
  onSelect: (difficulty: Difficulty) => void;
  loading: boolean;
}

const DifficultySelector = ({ difficulties, onSelect, loading }: DifficultySelectorProperties) => {
  return (
    <div className="difficulty-selector-container">
      <h3 className="difficulty-title">Seleccioná la dificultad</h3>

      {loading && <div className="loading-wrapper"><Loading /></div>}

      {!loading && (
        <ul className="difficulty-list">
          {difficulties.map((d, i) => {
            const colors = ["#22c55e", "#facc15", "#fb923c", "#ef4444"];
            const color = colors[i] || "#6b7280";
            return (
              <li key={d.id}>
                <div className='difficulty-buttons'>
                  <Button onClick={() => onSelect(d)} color={color}>
                    {d.name}
                  </Button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default DifficultySelector;