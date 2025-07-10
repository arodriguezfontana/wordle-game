import "./overlay.css";

interface LostPageProps {
    onClose: () => void;
    onRestart: () => void;
}

const LostPage = ({ onClose, onRestart }: LostPageProps) => {
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

export default LostPage;