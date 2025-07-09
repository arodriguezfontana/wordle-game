import { useEffect, useState } from "react";
import { getDifficulties, getSession } from "../services/wordleService";
import { isAxiosError } from "axios";
import DifficultySelector from "../components/difficultySelector/difficultySelector";
import Start from "../components/start/start";
import Game from "../components/game/game";
import type { Difficulty } from "../types/difficulty";
import type { GameSession } from "../types/gameSession";
import type { Stage } from "../types/stage";
import WordleSection from "../layouts/wordleSection";
import { throwCorrectError } from "../services/throwCorrectError";

const HomePage = () => {
    const [stage, setStage] = useState<Stage>("start");
    const [difficulties, setDifficulties] = useState<Difficulty[]>([]);
    const [gameSession, setGameSession] = useState<GameSession | null>(null);

    const fetchDifficulties = async () => {
        try {
            const data = await getDifficulties();
            setDifficulties(data);
        } catch (err) {
            if (isAxiosError(err)) {
                throwCorrectError(err, "getDifficulties");
            }
        }
    };

    useEffect(() => {
        if (stage === "difficulty") {
            fetchDifficulties();
        }
    }, [stage]);

    const handleDifficultySelection = async (difficulty: Difficulty) => {
        try {
            const session = await getSession(difficulty.id);
            setGameSession(session);
            setStage("game");
        } catch (err) {
            if (isAxiosError(err)) {
                throwCorrectError(err, "getSession");
            }
        }
    };
    
    const handleStartClick = () => {
        setStage("difficulty");
    };

    const handleRulesClick = () => {
        setStage("difficulty");
    };
    
    return (
        <div>
            <WordleSection>

                {stage === "start" && (
                        <Start
                            onClickStart={handleStartClick}
                            onClickRules={handleRulesClick}
                        />
                )}

                {stage === "difficulty" && (
                        <DifficultySelector
                            difficulties={difficulties}
                            onSelect={handleDifficultySelection}
                        />
                )}

                {stage === "game" && gameSession && (
                        <Game
                            gameSession={gameSession}
                        />
                )}
                
            </WordleSection>
        </div>
    );
};

export default HomePage;