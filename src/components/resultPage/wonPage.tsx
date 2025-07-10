import "./overlay.css";

interface WonPageProps {
    onClose: () => void;
    onRestart: () => void;
}

const WonPage = ({ onClose, onRestart }: WonPageProps) => {
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

export default WonPage;
