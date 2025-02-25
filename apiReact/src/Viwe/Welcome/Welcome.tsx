import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Welcome.css';

const Welcome: React.FC = () => {
    const [name, setName] = useState(''); // Estado para el nombre
    const [password, setPassword] = useState(''); // Estado para la contraseña
    const navigate = useNavigate(); // Crea la instancia de navigate

    // Función para manejar el login (acepta cualquier usuario y contraseña)
    const handleLogin = () => {
        if (name && password) {
            navigate('/home'); // Redirigir al home
        }
    };

    // Función para redirigir al Check-In
    const goCheckIn = () => {
        navigate('/checking'); // Redirige al Check-In
    };

    return (
        <div className="welcome-container">
            {/* Encabezado */}
            <header className="header">
                <h1 className="title">
                    Bienvenido a <span className="highlighted-text">HorarioDocente</span>
                </h1>
                <p className="subheading">
                    La solución ideal para gestionar horarios y profesores de forma eficiente.
                </p>
            </header>

            {/* Contenido Principal */}
            <main className="main-content">
                {/* Sección de descripción */}
                <div className="description-card">
                    <h2 className="section-title">Iniciar Sesión</h2>
                    <p className="section-description">
                        Ingresa al sistema para administrar los horarios o realizar un Check-In.
                    </p>
                </div>

                {/* Formulario de Login */}
                <div className="login-form">
                    <input
                        type="text"
                        placeholder="Nombre"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="input-field"
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="input-field"
                    />
                    <button onClick={handleLogin} className="btn-home">
                        Iniciar Sesión
                    </button>
                </div>

                {/* Botón de Check-In */}
                <div className="button-container">
                    <button onClick={goCheckIn} className="btn-check-in">
                        Hacer Check-In
                    </button>
                    <p className="check-in-text">
                        Haz clic en el botón de Check-In para registrar tu entrada.
                    </p>
                </div>
            </main>

            {/* Pie de página */}
            <footer className="footer">
                <p>&copy; {new Date().getFullYear()} HorarioDocente. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
};

export default Welcome;
