import { useState } from "react";
import { isAxiosError } from "axios";
import { throwCorrectError } from "../../services/throwCorrectError";
import { postCheckWord } from "../../services/wordleService";
import type { GameSession } from "../../types/gameSession";
import type { LetterResult } from "../../types/letterResult";
import type { GameStatus } from "../../types/gameStatus";
import toast from "react-hot-toast";
import { InvalidWordError } from "../../services/wordleErrors";
import WonPage from "../resultPage/wonPage";
import LostPage from "../resultPage/lostPage";

interface GameProperties {
    gameSession: GameSession;
    onRestartToHome: () => void;
};

const Game = ({ gameSession, onRestartToHome }: GameProperties) => {
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

    const remainingAttempts = 6 - attempts.length;

    return (
        <div>
            <h3>Partida</h3>
            <h4>Dificultad: {gameSession.difficulty.name}</h4>
            <h4>Largo de la palabra: {gameSession.wordLenght}</h4>
            <h4>Rondas restantes: {remainingAttempts}</h4>

            {attempts.map((a, i) => (
                <div key={i} style={{ display: "flex", gap: 4 }}>
                    {a.map((l, i2) => (
                        <span key={i2} style={{
                            backgroundColor:
                                l.solution === "correct" ? "green"
                                    : l.solution === "elsewhere" ? "gold"
                                        : "lightgray", color: "white"
                        }}>
                            {l.letter}
                        </span>
                    ))
                    }
                </div>
            ))}

            {status === "playing" && (
                <div>
                    <input
                        value={word}
                        onChange={(e) => setWord(e.target.value)}
                        maxLength={gameSession.wordLenght}
                    />
                    <button onClick={handlePlay}>Enviar</button>
                </div>
            )}

            {showOverlay && status === "won" && (
                <WonPage onClose={closeOverlay} onRestart={handleRestart} />
            )}
            {showOverlay && status === "lost" && (
                <LostPage onClose={closeOverlay} onRestart={handleRestart} />
            )}
        </div>
    );
};

export default Game;