//boton para regresar a una pagina anterior
import React from 'react';
import { useNavigate } from 'react-router-dom';

function BackTo({ to }) {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(to);
    };

    return (
        <button onClick={handleBack} className="back-button">
            Back
        </button>
    );
}
export default BackTo;