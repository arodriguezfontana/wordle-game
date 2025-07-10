import { useEffect, useState } from "react";
import { getDifficulties, getSession } from "../services/wordleService";
import { isAxiosError } from "axios";
import { throwCorrectError } from "../services/throwCorrectError";
import type { Stage } from "../types/stage";
import type { Difficulty } from "../types/difficulty";
import type { GameSession } from "../types/gameSession";

export const useHome = () => {
    const [stage, setStage] = useState<Stage>("start");
    const [difficulties, setDifficulties] = useState<Difficulty[]>([]);
    const [gameSession, setGameSession] = useState<GameSession | null>(null);

    useEffect(() => {
        if (stage === "difficulty") {
            fetchDifficulties();
        }
    }, [stage]);

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

    const goToStart = () => setStage("start");
    const goToDifficulty = () => setStage("difficulty");

    const handleDifficultySelection = async (difficulty: Difficulty) => {
        try {
            const session = await getSession(difficulty.id);
            setGameSession(session);
            setStage("game");
        } catch (err) {
            if (isAxiosError(err)) {
                throwCorrectError(err, "getSession");
            }
        };
    };

    return {
        stage,
        difficulties,
        gameSession,
        handleDifficultySelection,
        goToStart,
        goToDifficulty
    };
};