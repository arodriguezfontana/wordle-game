import "./overlay.css";

interface WonProps {
    onClose: () => void;
    onRestart: () => void;
}

const Won = ({ onClose, onRestart }: WonProps) => {
    return (
        <div className="overlay">
            <div className="modal">
                <h2>Ganaste</h2>
                <button onClick={onClose}>X</button>
                <button onClick={onRestart}>Volver a Jugar</button>
            </div>
        </div>
    );
};

export default Won;
