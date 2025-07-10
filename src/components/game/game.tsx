import { useGame } from "../../hooks/useGame";
import WonPage from "../resultPage/wonPage";
import LostPage from "../resultPage/lostPage";
import type { GameSession } from "../../types/gameSession";

interface GameProperties {
    gameSession: GameSession;
    onRestartToHome: () => void;
};

const Game = ({ gameSession, onRestartToHome }: GameProperties) => {
    const {
        word,
        setWord,
        attempts,
        status,
        showOverlay,
        handlePlay,
        handleRestart,
        closeOverlay,
    } = useGame(gameSession, onRestartToHome);

    return (
        <div>
            <h3>Partida</h3>
            <h4>Dificultad: {gameSession.difficulty.name}</h4>
            <h4>Largo de la palabra: {gameSession.wordLenght}</h4>

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