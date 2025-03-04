import axios from "axios";
import { Teacher } from "../models/Teacher";

const API_URL = 'http://alelopmay:8000/api/teachers'; 

// Obtener todos los profesores
export const getTeachers = async (): Promise<Teacher[]> => {
    const response = await axios.get(API_URL);
    return response.data;
};

// Crear un nuevo profesor
export const createTeacher = async (teacher: Omit<Teacher, 'id'>): Promise<Teacher> => {
    const response = await axios.post(API_URL, teacher);
    return response.data;
};

// Eliminar un profesor por ID
export const deleteTeacher = async (id: string): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
};

// Actualizar un profesor
export const updateTeacher = async (teacher: Teacher): Promise<Teacher> => {
    const response = await axios.put(`${API_URL}/${teacher.id}`, teacher);
    return response.data;
};

// Obtener todos los profesores (ajustado para usar axios)
export const fetchTeachers = async (): Promise<Teacher[]> => {
    const response = await axios.get(API_URL);  // Cambié a axios
    return response.data;
};
