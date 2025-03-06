import { Checkin } from "../models/Checkin";
import { Institute } from "../models/Institute";
import { Teacher } from "../models/Teacher";
import { Work } from "../models/Work";

const API_BASE_URL = "http://docalelopmay.duckdns.org:8000/api"; 

// Obtener todos los institutos
export const fetchInstitutes = async (): Promise<Institute[]> => {
    const response = await fetch(`${API_BASE_URL}/institutes`);
    if (!response.ok) {
        throw new Error("Error al obtener institutos");
    }
    return response.json();
};

// Obtener todos los profesores
export const fetchTeachers = async (): Promise<Teacher[]> => {
    const response = await fetch(`${API_BASE_URL}/teachers`);
    if (!response.ok) {
        throw new Error("Error al obtener profesores");
    }
    return response.json();
};

// Obtener todas las asignaciones de trabajos
export const fetchWorks = async (): Promise<Work[]> => {
    const response = await fetch(`${API_BASE_URL}/works`);
    if (!response.ok) {
        throw new Error("Error al obtener asignaciones");
    }
    return response.json();
};

// Obtener los profesores de un instituto específico
export const fetchInstituteTeachers = async (instituteId: number): Promise<Teacher[]> => {
    const response = await fetch(`${API_BASE_URL}/works/institute/${instituteId}`);
    if (!response.ok) {
        throw new Error(`Error al obtener profesores para el instituto con ID: ${instituteId}`);
    }
    return response.json();
};

// Asignar un profesor a un instituto
export const assignTeacherToInstitute = async (instituteId: number, teacherId: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/works`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ institute_id: instituteId, teacher_id: teacherId }),
    });

    if (!response.ok) {
        throw new Error("Error al asignar profesor al instituto");
    }
};

// Obtener checkins de un profesor
export const fetchCheckins = async (teacherId: number): Promise<Checkin[]> => {
    const response = await fetch(`${API_BASE_URL}/checkins/${teacherId}`);
    if (!response.ok) {
        throw new Error(`Error al obtener checkins para el profesor con ID: ${teacherId}`);
    }
    return response.json();
};
