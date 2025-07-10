import Loading from "../loading/loading";
import Button from "../button/button";
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
                    {difficulties.map((d, i) => {
                        const colors = ["green", "yellow", "orange", "red"];
                        const color = colors[i] || "gray";

                        return (
                            <li key={d.id}>
                                <Button onClick={() => onSelect(d)} color={color}>
                                    {d.name}
                                </Button>
                            </li>
                        );
                    })}
                </ul>

            )}
        </div>
    );
};

export default DifficultySelector;