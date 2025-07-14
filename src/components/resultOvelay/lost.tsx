import "./overlay.css";
import Button from "../button/button";

interface LostProps {
    onClose: () => void;
    onRestart: () => void;
}

const Lost = ({ onClose, onRestart }: LostProps) => {
    return (
        <div className="overlay">
            <div className="modal">
                <h2>Mucha suerte la proxima :(</h2>
                <p className="text">Perdiste, pero podes seguir jugando.</p>
                <Button onClick={onClose} border={true}>x</Button>
                <Button onClick={onRestart} border={false}>Volver a Jugar</Button>
            </div>
        </div>
    );
};

export default Lost;