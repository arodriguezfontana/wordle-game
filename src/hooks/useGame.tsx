import { useState, useEffect, useRef } from "react";
import type { GameSession } from "../types/gameSession";
import type { LetterResult } from "../types/letterResult";
import type { GameStatus } from "../types/gameStatus";
import { postCheckWord } from "../services/wordleService";
import { isAxiosError } from "axios";
import { throwCorrectError } from "../services/throwCorrectError";
import { InvalidWordError } from "../services/wordleErrors";
import toast from "react-hot-toast";

const VALID_LETTER_REGEX = /^[A-ZÑ]?$/;
const MAX_ATTEMPTS = 6;

export const useGame = (gameSession: GameSession, onRestartToHome: () => void) => {
    const [word, setWord] = useState("");
    const [attempts, setAttempts] = useState<LetterResult[][]>([]);
    const [status, setStatus] = useState<GameStatus>("playing");
    const [showOverlay, setShowOverlay] = useState(false);
    const [loading, setLoading] = useState(false);

    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    
    const handlePlay = async () => {
        if (status !== "playing") return;

        if (word.length !== gameSession.wordLenght) {
            toast.error("Faltan letras");
            return;
        }

        setLoading(true);
        try {
            const result = await postCheckWord(gameSession.sessionId, word.toLowerCase());
            if (!result) return;

            const newAttempts = [...attempts, result];
            setAttempts(newAttempts);
            setWord("");

            const won = result.every((letter) => letter.solution === "correct");

            if (won) {
                setStatus("won");
                setShowOverlay(true);
            } else if (newAttempts.length >= MAX_ATTEMPTS) {
                setStatus("lost");
                setShowOverlay(true);
            }
        } catch (err) {
            if (err instanceof InvalidWordError) {
                toast.error("La palabra no es válida");
                setWord("");
            } else if (isAxiosError(err)) {
                throwCorrectError(err, "postCheckWord");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleRestart = () => {
        setShowOverlay(false);
        onRestartToHome();
    };

    const closeOverlay = () => {
        setShowOverlay(false);
    };

    useEffect(() => {
        const firstEmptyIndex = word.length;
        if (status === "playing" && inputRefs.current[firstEmptyIndex]) {
            inputRefs.current[firstEmptyIndex]?.focus();
        }
    }, [word, status]);

    const handleLetterChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const val = e.target.value.toUpperCase();
        if (!VALID_LETTER_REGEX.test(val)) return;

        const newWord = word.split("");
        newWord[index] = val;
        setWord(newWord.join("").slice(0, gameSession.wordLenght));

        if (val && index < gameSession.wordLenght - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        const newWord = word.split("");

        if (e.key === "Backspace") {
            if (word[index]) {
                newWord[index] = "";
            } else if (index > 0) {
                newWord[index - 1] = "";
                inputRefs.current[index - 1]?.focus();
            }
            setWord(newWord.join(""));
        } else if (e.key === "Enter" && word.length === gameSession.wordLenght) {
            handlePlay();
        }
    };

    return {
        loading,
        word,
        setWord,
        attempts,
        status,
        showOverlay,
        handlePlay,
        handleRestart,
        closeOverlay,
        handleLetterChange,
        handleKeyDown,
        inputRefs
    };
};