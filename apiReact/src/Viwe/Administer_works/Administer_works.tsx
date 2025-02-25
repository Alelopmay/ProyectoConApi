import React, { useEffect, useState } from "react";
import { Institute } from "../../models/Institute";
import { Teacher } from "../../models/Teacher";
import { Work } from "../../models/Work";
import { Checkin } from "../../models/Checkin";
import { fetchTeachers } from "../../Services/teacherService";
import { fetchInstitutes, fetchWorks, assignTeacherToInstitute, fetchCheckins } from "../../Services/WorkService";
import './Administer_works.css';
import { FaArrowLeft, FaBuilding, FaChalkboardTeacher, FaClipboardList } from "react-icons/fa";

const AdministerWork: React.FC = () => {
    const [institutes, setInstitutes] = useState<Institute[]>([]);
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [works, setWorks] = useState<Work[]>([]);
    const [checkins, setCheckins] = useState<Checkin[]>([]);
    const [selectedTeacherId, setSelectedTeacherId] = useState<number | null>(null);
    const [showModal, setShowModal] = useState(false);
// Cargar datos
    useEffect(() => {
        fetchInstitutes().then(setInstitutes);
        fetchTeachers().then(setTeachers);
        fetchWorks().then(setWorks);
    }, []);
// Asignar profesor a instituto 
    const handleAssign = async (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const instituteId = Number(form.institute_id.value);
        const teacherId = Number(form.teacher_id.value);

        try {
            await assignTeacherToInstitute(instituteId, teacherId);
            alert("Profesor asignado correctamente");
            setWorks(await fetchWorks());
        } catch (error) {
            alert("Error al asignar profesor: " + error);
        }
    };
// Cargar los registros de entrada
    const loadCheckins = async (teacherId: number) => {
        try {
            setSelectedTeacherId(teacherId);
            const data = await fetchCheckins(teacherId);
            setCheckins(data);
            setShowModal(true);
        } catch (error) {
            alert("Error al cargar los registros de entrada: " + error);
        }
    };
// Renderizar la vista
    return (
        <div className="container">
            <header>
                <h1><FaChalkboardTeacher /> Administrar Profesores</h1>
                <a href="/home" className="back-button">
                    <FaArrowLeft /> Volver al Home
                </a>
            </header>

            <h1 className="section-title">Asignar Profesor a Instituto</h1>
            <form onSubmit={handleAssign} className="form-card">
                <label>Instituto:</label>
                <select name="institute_id" required>
                    {institutes.map((inst) => (
                        <option key={inst.id} value={inst.id}>{inst.name}</option>
                    ))}
                </select>
                <label>Profesor:</label>
                <select name="teacher_id" required>
                    {teachers.map((teacher) => (
                        <option key={teacher.id} value={teacher.id}>{teacher.name}</option>
                    ))}
                </select>
                <button type="submit">Asignar</button>
            </form>

            <h1 className="section-title">Institutos y Profesores Asociados</h1>
            {institutes.map((institute) => {
                const instituteWorks = works.filter((work) => work.institute.id === institute.id);
                return (
                    <div key={institute.id} className="card">
                        <h2><FaBuilding /> {institute.name}</h2>
                        <p><strong>Dirección:</strong> {institute.address}</p>
                        <h3><FaClipboardList /> Profesores:</h3>
                        {instituteWorks.map((work) => (
                            <div key={work.teacher.id} className="teacher-card">
                                <span>{work.teacher.name} ({work.teacher.category})</span>
                                <button onClick={() => loadCheckins(work.teacher.id)}>Ver Registros</button>
                            </div>
                        ))}
                    </div>
                );
            })}

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h2>Registros de Entrada</h2>
                        <ul>
                            {checkins.length ? checkins.map((c, idx) => (
                                <li key={idx}>Entrada: {c.entry_date} - Salida: {c.exit_date || "No registrada"}</li>
                            )) : <li>No hay registros.</li>}
                        </ul>
                        <button onClick={() => setShowModal(false)}>Cerrar</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdministerWork;
