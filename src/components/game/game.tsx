import './game.css';
import { useGame } from "../../hooks/useGame";
import Won from "../resultOvelay/won";
import Lost from "../resultOvelay/lost";
import Loading from "../loading/loading";
import Button from "../button/button";
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
        loading,
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
                        <span
                            key={i2}
                            style={{
                                backgroundColor:
                                    l.solution === "correct"
                                        ? "green"
                                        : l.solution === "elsewhere"
                                            ? "gold"
                                            : "lightgray",
                                color: "white",
                                padding: "4px 8px",
                                borderRadius: "4px",
                            }}
                        >
                            {l.letter}
                        </span>
                    ))}
                </div>
            ))}

            {loading && (
                <div>
                    <Loading />
                </div>
            )}

            {status === "playing" && (
                <div>
                    <input
                        value={word}
                        onChange={(e) => setWord(e.target.value)}
                        maxLength={gameSession.wordLenght}
                    />
                    <Button onClick={handlePlay}>Enviar</Button>
                </div>
            )}

            {(status === "won" || status === "lost") && (
                <Button onClick={handleRestart}>Volver a jugar</Button>
            )}
            {showOverlay && status === "won" && (
                <Won onClose={closeOverlay} onRestart={handleRestart} />
            )}
            {showOverlay && status === "lost" && (
                <Lost onClose={closeOverlay} onRestart={handleRestart} />
            )}
        </div>
    );
};

export default Game;