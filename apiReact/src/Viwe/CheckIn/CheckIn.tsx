import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Teacher } from "../../models/Teacher";
import { getTeachers } from "../../Services/teacherService";
import { registerCheckin } from "../../Services/CheckinService";
import "./CheckIn.css";

const CheckIn: React.FC = () => {
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [selectedTeacher, setSelectedTeacher] = useState<string>("");
    const [password, setPassword] = useState<string>(""); // Estado para la contraseña
    const [horaActual, setHoraActual] = useState(new Date());
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const navigate = useNavigate();
// Cargar los profesores al cargar el componente
    useEffect(() => {
        const fetchData = async () => {
            try {
                const teachersData = await getTeachers();
                setTeachers(teachersData);
            } catch (error: any) {
                setError("No se pudieron cargar los profesores.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
// Actualizar la hora cada segundo
    useEffect(() => {
        const interval = setInterval(() => {
            setHoraActual(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);
// Manejar el Check-In
    const handleCheckIn = async () => {
        if (!selectedTeacher) {
            setMessage("Por favor, seleccione un profesor.");
            return;
        }

        if (!password) {
            setMessage("Por favor, ingrese su contraseña.");
            return;
        }

        setIsSubmitting(true);
        setMessage(null);

        try {
            await registerCheckin(parseInt(selectedTeacher), password); // Se envía la contraseña ingresada
            setMessage("✅ Check-In realizado con éxito.");
            setSelectedTeacher(""); // Limpiar selección del profesor
            setPassword(""); // Limpiar contraseña
        } catch (error) {
            setMessage("❌ Error al realizar el Check-In. Intente de nuevo.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="checkin-container">
            <header className="header">
                <button className="back-button" onClick={() => navigate("/")}>Volver</button>
                <h1 className="title">Bienvenido al <span className="highlight">Check In</span></h1>
            </header>

            <div className="main-content">
                <div className="form-container">
                    <h2 className="section-title">Zona de Check In</h2>
                    {message && <p className="message">{message}</p>}

                    <div className="form-group">
                        <label>Seleccione un profesor:</label>
                        <select className="form-input" value={selectedTeacher} onChange={(e) => setSelectedTeacher(e.target.value)} disabled={loading || error !== null || isSubmitting}>
                            {loading ? <option>Cargando profesores...</option> : error ? <option disabled>{error}</option> : (
                                <>
                                    <option value="">Seleccione un profesor</option>
                                    {teachers.map((teacher) => <option key={teacher.id} value={teacher.id}>{teacher.name}</option>)}
                                </>
                            )}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Contraseña:</label>
                        <input
                            type="password"
                            className="form-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={isSubmitting}
                        />
                    </div>

                    <button className="checkin-button" onClick={handleCheckIn} disabled={isSubmitting}>
                        {isSubmitting ? "Procesando..." : "Realizar Check In"}
                    </button>
                </div>

                <div className="clock-container">
                    <h2 className="clock-title">Hora Actual</h2>
                    <p className="clock-time">{horaActual.toLocaleTimeString()}</p>
                </div>
            </div>
        </div>
    );
};

export default CheckIn;
