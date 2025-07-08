import { useEffect, useState } from "react";
import type { Difficulty } from "../types/difficulty";
import type { GameSession } from "../types/gameSession";
import { getDifficulties } from "../services/wordleService";
import DifficultySelector from "../components/difficultySelector/difficultySelector";

const HomePage = () => {

    const [difficulties, setDifficulties] = useState<Difficulty[]>([]);

    useEffect(() => {
        const fetchDifficulties = async () => {
            try {
                const data = await getDifficulties();
                if (data) {
                    setDifficulties(data);
                } else {
                    console.warn("No se recibieron dificultades.");
                }
            } catch (error) {
                console.error("Error fetching difficulties:", error);
            }
        };
        fetchDifficulties();
    }, []);

    return (
        <div>
            <h1>WORDLE</h1>
            <section>
                <DifficultySelector
                    difficulties={difficulties}
                />
            </section>
        </div>
    );

};

export default HomePage;