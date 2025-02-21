import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home: React.FC = () => {
    const [time, setTime] = useState<string>('');

    useEffect(() => {
        const updateClock = () => {
            const date = new Date();
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            const seconds = String(date.getSeconds()).padStart(2, '0');
            setTime(`${hours}:${minutes}:${seconds}`);
        };

        const intervalId = setInterval(updateClock, 1000);
        updateClock();
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="home-container">
            <header className="home-header">
                <h1 className="home-title">Bienvenido a <span className="highlight">HorarioDocente</span></h1>
                <p className="home-subtitle">Administra y gestiona horarios de forma eficiente.</p>
            </header>

            <section className="main-content">
                {/* Sección del Reloj */}
                <div className="clock-container">
                    <h2 className="clock-title">Reloj Digital</h2>
                    <div className="clock-time">{time}</div>
                </div>

                {/* Menú de Navegación */}
                <div className="menu-container">
                    <h2 className="menu-title">Administración</h2>
                    <div className="menu-links">
                        <Link to="/admin/institutes" className="menu-link">🏫 Institutos</Link>
                        <Link to="/admin/teachers" className="menu-link">👨‍🏫 Profesores</Link>
                        <Link to="/admin/schedules" className="menu-link">📅 Horarios</Link>
                        <Link to="/admin/works" className="menu-link">📋 Trabajos</Link>
                    </div>
                </div>
            </section>

            {/* Botón de Volver */}
            <div className="back-button-container">
                <Link to="/" className="back-button">⬅ Volver al inicio</Link>
            </div>

            {/* Pie de Página */}
            <footer className="footer">
                <p>&copy; {new Date().getFullYear()} HorarioDocente. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
};

export default Home;
