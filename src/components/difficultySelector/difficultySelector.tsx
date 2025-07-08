import type { Difficulty } from "../../types/difficulty";

type DifficultySelectorProperties = {
    difficulties: Difficulty[];
    onSelect: (difficulty: Difficulty) => void;
};

const DifficultySelector = ({ difficulties, onSelect }: DifficultySelectorProperties) => {
    return (
        <div>
            <h3>Select the difficulty</h3>
            <ul>
                {difficulties.map((d) => (
                    <button key={d.id} onClick={() => onSelect(d)}>
                        {d.name}
                    </button>
                ))}
            </ul>
        </div>
    );
};

export default DifficultySelector;