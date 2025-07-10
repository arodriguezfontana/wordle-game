import { useState } from "react";
import { postCheckWord } from "../services/wordleService";
import { isAxiosError } from "axios";
import { throwCorrectError } from "../services/throwCorrectError";
import { InvalidWordError } from "../services/wordleErrors";
import toast from "react-hot-toast";
import type { GameSession } from "../types/gameSession";
import type { LetterResult } from "../types/letterResult";
import type { GameStatus } from "../types/gameStatus";

export const useGame = (gameSession: GameSession, onRestartToHome: () => void) => {
    const [word, setWord] = useState("");
    const [attempts, setAttempts] = useState<LetterResult[][]>([]);
    const [status, setStatus] = useState<GameStatus>("playing");
    const [showOverlay, setShowOverlay] = useState(false);

    const handlePlay = async () => {
        const validWordLenght = word.length === gameSession.wordLenght;
        const gameInProgress = status === "playing";

        if (!validWordLenght || !gameInProgress) return;

        try {
            const result = await postCheckWord(gameSession.sessionId, word.toLowerCase());
            if (!result) return;

            setAttempts([...attempts, result]);
            setWord("");

            const won = result.every((letter) => letter.solution === "correct");

            if (won) {
                setStatus("won");
                setShowOverlay(true);
            } else if (attempts.length + 1 >= 6) {
                setStatus("lost");
                setShowOverlay(true);
            }
        } catch (err) {
            if (err instanceof InvalidWordError) {
                toast.error("La palabra no es valida")
            } else if (isAxiosError(err)) {
                throwCorrectError(err, "postCheckWord");
            }
        };
    }

    const handleRestart = () => {
        setShowOverlay(false);
        onRestartToHome();
    };

    const closeOverlay = () => setShowOverlay(false);
    
    return {
        word,
        setWord,
        attempts,
        status,
        showOverlay,
        handlePlay,
        handleRestart,
        closeOverlay
    };
};