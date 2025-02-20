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
        updateClock(); // Actualización inmediata al renderizar

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="home-container">
            {/* Botón para volver al inicio */}
            <div className="back-button-container">
                <Link to="/" className="back-button">⬅ Volver al inicio</Link>
            </div>

            {/* Sección del Reloj Digital */}
            <section className="clock-section">
                <div className="clock-container">
                    <h2 className="clock-title">Reloj Digital</h2>
                    <div className="clock-time">{time}</div>
                </div>
            </section>

            {/* Menú de navegación */}
            <section className="menu-section">
                <div className="menu-container">
                    <h2 className="menu-title">Administración</h2>
                    <div className="menu-links">
                        <Link to="/admin/institutes" className="menu-link">🏫 Administrar Institutos</Link>
                        <Link to="/admin/teachers" className="menu-link">👨‍🏫 Administrar Profesores</Link>
                        <Link to="/admin/schedules" className="menu-link">📅 Administrar Horarios</Link>
                        <Link to="/admin/works" className="menu-link">📋 Administrar Trabajos</Link>
                    </div>
                </div>
            </section>

            {/* Pie de página */}
            <footer className="footer">
                <p>&copy; {new Date().getFullYear()} HorarioDocente. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
};

export default Home;
