interface StartProperties {
    onClick: () => void;
};

const Start = ({ onClick }: StartProperties) => {
    return (
        <div>
            <div>
                <h3>Reglas del Juego</h3>
                <p>Las reglas son sencillas:
                    Escribís una palabra de X letras válida (en español).
                    El juego evalúa cada letra y marca las pistas con colores.
                    Usás esas pistas para mejorar tu próximo intento.
                    Tenés 6 intentos como máximo para adivinar la palabra.</p>
            </div>
            {/* 
            Las reglas son simples: adivina la palabra oculta en 6 intentos. 
            Cada intento debe ser una palabra validá y si la palabra no existe el juego te avisará.
            Después de cada intento el color de las casillas cambia para mostrar qué tan cerca estás de acertar la palabra
            
            VERDE significa que la letra está en la palabra y en la posición CORRECTA.
            AMARILLO significa que la letra letra está presente en la palabra pero en la posición INCORRECTA.
            GRIS significa que la letra letra NO está presente en la palabra.
            */}
            <button onClick={onClick}>Empezar a jugar</button>
        </div>
    );
};

export default Start;