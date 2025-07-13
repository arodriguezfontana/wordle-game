import { useHome } from "../hooks/useHome";
import DifficultySelector from "../components/difficultySelector/difficultySelector";
import Start from "../components/start/start";
import Game from "../components/game/game";
import H1Section from "../layouts/h1Section/h1Section";

const Home = () => {
    const {
        stage,
        difficulties,
        gameSession,
        loading,
        handleDifficultySelection,
        goToStart,
        goToDifficulty
    } = useHome();

    return (
        <div>
            <H1Section title="Wordle">

                {stage === "start" && (
                    <Start
                        onClickStart={goToDifficulty}
                    />
                )}

                {stage === "difficulty" && (
                    <DifficultySelector
                        difficulties={difficulties}
                        onSelect={handleDifficultySelection}
                        loading={loading}
                    />
                )}

                {stage === "game" && gameSession && (
                    <Game
                        gameSession={gameSession}
                        onRestartToHome={goToStart}
                    />
                )}

            </H1Section>
        </div>
    );
};

export default Home;