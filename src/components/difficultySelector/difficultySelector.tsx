import './difficultySelector.css';
import Loading from "../loading/loading";
import Button from "../button/button";
import H3Section from '../../layouts/h3Section/h3Section';
import type { Difficulty } from "../../types/difficulty";

interface DifficultySelectorProperties {
  difficulties: Difficulty[];
  onSelect: (difficulty: Difficulty) => void;
  loading: boolean;
  goBack: () => void;
}

const DifficultySelector = ({ difficulties, onSelect, loading, goBack }: DifficultySelectorProperties) => {
  return (
    <div className="difficulty-selector-container">
      <H3Section title='Seleccioná la dificultad'>
        {loading && <div className="loading-wrapper"><Loading /></div>}

        {!loading && (
          <ul className="difficulty-list">
            {difficulties.map((d, i) => {
              const colors = ["#22c55e", "#facc15", "#fb923c", "#ef4444"];
              const color = colors[i] || "#8b8b8b";
              return (
                <li key={d.id}>
                  <div className='difficulty-buttons'>
                    <Button onClick={() => onSelect(d)} color={color} border={false}>
                      {d.name}
                    </Button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
        <div className='back-button'>
          <Button onClick={goBack} border={true}>Ir atras</Button>
        </div>
      </H3Section>
    </div>
  );
};

export default DifficultySelector;