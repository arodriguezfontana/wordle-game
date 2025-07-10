import "./overlay.css";

interface LostProps {
    onClose: () => void;
    onRestart: () => void;
}

const Lost = ({ onClose, onRestart }: LostProps) => {
    return (
        <div className="overlay">
            <div className="modal">
                <h2>Perdiste</h2>
                <button onClick={onClose}>X</button>
                <button onClick={onRestart}>Volver a Jugar</button>
            </div>
        </div>
    );
};

export default Lost;