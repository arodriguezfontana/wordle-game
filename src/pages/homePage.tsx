import { useEffect, useState } from "react";
import { getDifficulties, getSession } from "../services/wordleService";
import { isAxiosError } from "axios";
import { throwCorrectException } from "../services/errorHandler";
import DifficultySelector from "../components/difficultySelector/difficultySelector";
import Start from "../components/start/start";
import Game from "../components/game/game";
import type { Difficulty } from "../types/difficulty";
import type { GameSession } from "../types/gameSession";
import type { Stage } from "../types/stage";
import WordleSection from "../layouts/wordleSection";

const HomePage = () => {
    const [stage, setStage] = useState<Stage>("start");
    const [difficulties, setDifficulties] = useState<Difficulty[]>([]);
    const [gameSession, setGameSession] = useState<GameSession | null>(null);

    const fetchDifficulties = async () => {
        try {
            const data = await getDifficulties();
            setDifficulties(data);
        } catch (error) {
            if (isAxiosError(error)) {
                throwCorrectException(error);
            }
        }
    };

    useEffect(() => {
        if (stage === "difficulty") {
            fetchDifficulties();
        }
    }, [stage]);

    const handleStartClick = () => {
        setStage("difficulty");
    };

    const handleDifficultySelect = async (difficulty: Difficulty) => {
        try {
            const session = await getSession(difficulty.id);
            setGameSession(session);
            setStage("game");
        } catch (error) {
            if (isAxiosError(error)) {
                throwCorrectException(error);
            }
        }
    };

    return (
        <div>
            <WordleSection>

                {stage === "start" && (
                    <section>
                        <Start
                            onClick={handleStartClick}
                        />
                    </section>
                )}

                {stage === "difficulty" && (
                    <section>
                        <DifficultySelector
                            difficulties={difficulties}
                            onSelect={handleDifficultySelect}
                        />
                    </section>
                )}

                {stage === "game" && gameSession && (
                    <section>
                        <Game
                            gameSession={gameSession}
                        />
                    </section>
                )}
                
            </WordleSection>
        </div>
    );
};

export default HomePage;