import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Welcome.css';
import { loginTeacher } from '../../Services/authService';

const Welcome: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [name, setName] = useState<string>(''); // Estado para el nombre
    const [password, setPassword] = useState<string>(''); // Estado para la contraseña
    const [error, setError] = useState<string>(''); // Estado para manejar errores
    const navigate = useNavigate(); // Crea la instancia de navigate

    // Función para manejar el login
    const handleLogin = async () => {
        setLoading(true);
        setError(''); // Limpiar cualquier error previo

        try {
            const response = await loginTeacher(name, password); // Llamada al servicio de login
            // Si el login es exitoso, redirigir al home
            localStorage.setItem('access_token', response.access_token); // Guarda el token en localStorage (opcional)
            navigate('/home');
        } catch (error) {
            setError('Credenciales incorrectas. Por favor, inténtalo de nuevo.'); // Muestra el error si ocurre un problema
        } finally {
            setLoading(false);
        }
    };

    // Función para redirigir al home
    const goHome = () => {
        navigate('/home');
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
                    {error && <p className="error-message">{error}</p>}

                    {/* Botón de Login */}
                    <div className="button-container">
                        <button onClick={handleLogin} className="btn-home">
                            Iniciar Sesión
                        </button>
                    </div>
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

                {/* Cargar Spinner */}
                {loading && (
                    <div id="loading" className="spinner-container">
                        <svg className="spinner" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="spinner-background" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="spinner-path" fill="currentColor" d="M4 12a8 8 0 0116 0H4z"></path>
                        </svg>
                    </div>
                )}
            </main>

            {/* Pie de página */}
            <footer className="footer">
                <p>&copy; {new Date().getFullYear()} HorarioDocente. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
};

export default Welcome;
