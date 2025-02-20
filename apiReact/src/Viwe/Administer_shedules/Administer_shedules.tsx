import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Schedule } from "../../models/Shedule";
import { Teacher } from "../../models/Teacher";
import { createSchedule, fetchSchedules } from "../../Services/SheduleService";
import { fetchTeachers } from "../../Services/teacherService";
import "./Administer_shedules.css";

const AdministerSchedule: React.FC = () => {
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [teacherId, setTeacherId] = useState<number | null>(null);
    const [day, setDay] = useState<string>("Lunes");
    const [startTime, setStartTime] = useState<string>("");
    const [endTime, setEndTime] = useState<string>("");
    const [schedulesByTeacher, setSchedulesByTeacher] = useState<{ [key: number]: Schedule[] }>({});

    const navigate = useNavigate();

    useEffect(() => {
        const loadTeachers = async () => {
            const data = await fetchTeachers();
            setTeachers(data);
        };
        loadTeachers();
    }, []);

    useEffect(() => {
        const loadSchedules = async () => {
            const newSchedules: { [key: number]: Schedule[] } = {};

            for (const teacher of teachers) {
                try {
                    const data = await fetchSchedules(teacher.id);
                    newSchedules[teacher.id] = data;
                } catch (error) {
                    console.error(`❌ Error al obtener horarios para ${teacher.name}:`, error);
                    newSchedules[teacher.id] = [];
                }
            }

            setSchedulesByTeacher(newSchedules);
        };

        if (teachers.length > 0) {
            loadSchedules();
        }
    }, [teachers]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!teacherId) {
            console.log("No se ha seleccionado un profesor.");
            return;
        }

        const formatTime = (time: string): string => time.substring(0, 5);

        const schedule: Schedule = {
            teacher_id: teacherId,
            day,
            start_time: formatTime(startTime),
            end_time: formatTime(endTime),
        };

        console.log("📤 Enviando horario:", schedule);

        try {
            await createSchedule(schedule);
            alert("✅ Horario creado exitosamente");
            resetForm();
            setSchedulesByTeacher({
                ...schedulesByTeacher,
                [teacherId]: [...(schedulesByTeacher[teacherId] || []), schedule],
            });
        } catch (error) {
            console.error("❌ Error al crear el horario:", error);
            alert("❌ Error al crear el horario");
        }
    };

    const resetForm = () => {
        setDay("Lunes");
        setStartTime("");
        setEndTime("");
    };

    const daysOfWeekOrder = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

    return (
        <div className="container">
            <h2>Administrar Horarios</h2>
            <button onClick={() => navigate("/home")} style={{ marginBottom: "15px" }}>
                Volver al Home
            </button>

            <div id="createScheduleForm" style={{ marginTop: "20px" }}>
                <form onSubmit={handleSubmit}>
                    <label>Profesor:</label>
                    <select
                        value={teacherId || ""}
                        onChange={(e) => setTeacherId(Number(e.target.value))}
                        required
                    >
                        <option value="">Selecciona un profesor</option>
                        {teachers.map((teacher) => (
                            <option key={teacher.id} value={teacher.id}>
                                {teacher.name}
                            </option>
                        ))}
                    </select>

                    <label>Día:</label>
                    <select value={day} onChange={(e) => setDay(e.target.value)}>
                        {daysOfWeekOrder.map((d) => (
                            <option key={d} value={d}>
                                {d}
                            </option>
                        ))}
                    </select>

                    <label>Hora de Inicio:</label>
                    <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />

                    <label>Hora de Fin:</label>
                    <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />

                    <button type="submit">Guardar Horario</button>
                </form>
            </div>

            {/* Sección para mostrar los horarios organizados por profesor */}
            <div style={{ marginTop: "20px" }}>
                <h3>Horarios por Profesor</h3>
                {teachers.map((teacher) => (
                    <div key={teacher.id} style={{ marginBottom: "20px" }}>
                        <h4>{teacher.name}</h4>
                        {schedulesByTeacher[teacher.id]?.length > 0 ? (
                            <table border={1} style={{ width: "100%", textAlign: "center" }}>
                                <thead>
                                    <tr>
                                        <th>Día</th>
                                        <th>Hora de Inicio</th>
                                        <th>Hora de Fin</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {schedulesByTeacher[teacher.id]
                                        .sort((a, b) => daysOfWeekOrder.indexOf(a.day) - daysOfWeekOrder.indexOf(b.day))
                                        .map((schedule, index) => (
                                            <tr key={index}>
                                                <td>{schedule.day}</td>
                                                <td>{schedule.start_time}</td>
                                                <td>{schedule.end_time}</td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>No hay horarios registrados para este profesor.</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdministerSchedule;
