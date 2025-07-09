import { useState } from "react";
import { postCheckWord } from "../../services/wordleService";
import type { GameSession } from "../../types/gameSession";
import type { LetterResult } from "../../types/letterResult";
import type { GameStatus } from "../../types/gameStatus";

interface GameProperties {
    gameSession: GameSession;
};

const Game = ({ gameSession }: GameProperties) => {
    const [word, setWord] = useState("");
    const [attempts, setAttempts] = useState<LetterResult[][]>([]);
    const [status, setStatus] = useState<GameStatus>("playing");

    const handlePlay = async () => {
        if (word.length !== gameSession.wordLenght || status !== "playing") return;

        const result = await postCheckWord(gameSession.sessionId, word.trim().toLowerCase());
        if (!result) return;

        setAttempts([...attempts, result]);
        setWord("");

        const won = result.every((letter) => letter.solution === "correct");

        if (won) {
            setStatus("won");
        } else if (attempts.length + 1 >= 6) {
            setStatus("lost");
        }
    };

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

            {status === "won" && <p>Ganaste</p>}
            {status === "lost" && <p>Perdiste</p>}

        </div>
    );
};

export default Game;