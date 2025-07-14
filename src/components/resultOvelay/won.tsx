import "./overlay.css";
import Button from "../button/button";

interface WonProps {
    onClose: () => void;
    onRestart: () => void;
    attempts: number;
}

const Won = ({ onClose, onRestart, attempts }: WonProps) => {
    return (
        <div className="overlay">
            <div className="modal">
                <h2>Felicidades :)</h2>
                <p className="text">Ganaste en {attempts} intentos.</p>
                <Button onClick={onClose} border={true}>x</Button>
                <Button onClick={onRestart} border={false}>Volver a Jugar</Button>
            </div>
        </div>
    );
};

export default Won;
