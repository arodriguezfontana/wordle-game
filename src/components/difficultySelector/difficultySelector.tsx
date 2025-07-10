import Loading from "../loading/loading";
import type { Difficulty } from "../../types/difficulty";

interface DifficultySelectorProperties {
    difficulties: Difficulty[];
    onSelect: (difficulty: Difficulty) => void;
    loading: boolean;
};

const DifficultySelector = ({ difficulties, onSelect, loading }: DifficultySelectorProperties) => {
    return (
        <div>
            <h3>Seleccioná la dificultad</h3>

            {loading && (
                <Loading />
            )}

            {!loading && (
                <ul>
                    {difficulties.map((d) => (
                        <button key={d.id} onClick={() => onSelect(d)}>
                            {d.name}
                        </button>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default DifficultySelector;