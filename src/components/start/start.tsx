interface StartProperties {
    onClickStart: () => void;
    onClickRules: () => void;
};

const Start = ({ onClickStart, onClickRules }: StartProperties) => {
    return (
        <div>
            <button onClick={onClickRules}>Reglas del juego</button>
            <button onClick={onClickStart}>Empezar a jugar</button>
        </div>
    );
};

export default Start;