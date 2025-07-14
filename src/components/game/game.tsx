import './game.css';
import { useGame } from "../../hooks/useGame";
import Won from "../resultOvelay/won";
import Lost from "../resultOvelay/lost";
import Loading from "../loading/loading";
import Button from "../button/button";
import H3Section from '../../layouts/h3Section/h3Section';
import type { GameSession } from "../../types/gameSession";

interface GameProperties {
    gameSession: GameSession;
    onRestartToHome: () => void;
    goBack: () => void;
}

const Game = ({ gameSession, onRestartToHome, goBack }: GameProperties) => {
    const {
        word,
        attempts,
        status,
        showOverlay,
        loading,
        handlePlay,
        handleRestart,
        closeOverlay,
        handleLetterChange,
        handleKeyDown,
        inputRefs
    } = useGame(gameSession, onRestartToHome);

    return (
        <div>
            <H3Section title='Partida'>

                {attempts.map((a, i) => (
                    <div key={i} className="attempt-row">
                        {a.map((l, i2) => (
                            <span
                                key={i2}
                                className={`letter-box ${l.solution}`}
                            >
                                {l.letter}
                            </span>
                        ))}
                    </div>
                ))}

                {status === "playing" && (
                    <>
                        <div className="input-row">
                            {Array.from({ length: gameSession.wordLenght }).map((_, i) => (
                                <input
                                    key={i}
                                    ref={(el) => { inputRefs.current[i] = el; }}
                                    value={word[i] || ""}
                                    onChange={(e) => handleLetterChange(e, i)}
                                    onKeyDown={(e) => handleKeyDown(e, i)}
                                    maxLength={1}
                                    className="input-box"
                                />
                            ))}
                        </div>

                        {loading && (
                            <div className="loading-wrapper">
                                <Loading />
                            </div>
                        )}

                        <div className="button-wrapper">
                            <Button onClick={handlePlay} border={false}>Enviar</Button>
                        </div>

                        <div className='back-button'>
                            <Button onClick={goBack} border={true}>Ir atras</Button>
                        </div>
                    </>
                )}

                <div className='play-button-container'>
                    {(status === "won" || status === "lost") && (
                        <Button onClick={handleRestart} border={false}>Volver a jugar</Button>
                    )}
                </div>

                {showOverlay && status === "won" && (
                    <Won onClose={closeOverlay} onRestart={handleRestart} attempts={attempts.length} />
                )}
                {showOverlay && status === "lost" && (
                    <Lost onClose={closeOverlay} onRestart={handleRestart} />
                )}
            </H3Section >
        </div>
    );
};

export default Game;