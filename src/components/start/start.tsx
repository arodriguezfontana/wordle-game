import Button from "../button/button";

interface StartProperties {
    onClickStart: () => void;
    onClickRules: () => void;
};

const Start = ({ onClickStart, onClickRules }: StartProperties) => {
    return (
        <div>
            <Button onClick={onClickRules} color={"red"}>Reglas del juego</Button>
            <Button onClick={onClickStart} color={"green"}>Empezar a jugar</Button>
        </div>
    );
};

export default Start;