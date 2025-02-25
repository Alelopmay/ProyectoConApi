import axios from 'axios';
import { Checkin } from '../models/Checkin'; 

const API_URL = 'http://localhost:8000/api/checkins';

// Obtener todos los check-ins
export const fetchCheckins = async (): Promise<Checkin[]> => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error: any) {
        console.error('Error al obtener los check-ins:', error.response?.data || error.message);
        throw error;
    }
};

// Obtener los check-ins de un profesor por su ID
export const fetchCheckinsByTeacher = async (teacherId: number): Promise<Checkin[]> => {
    try {
        const response = await axios.get(`${API_URL}/teacher/${teacherId}`);
        return response.data;
    } catch (error: any) {
        console.error(`Error al obtener los check-ins del profesor ${teacherId}:`, error.response?.data || error.message);
        throw error;
    }
};

// Obtener los detalles de un check-in por su ID
export const fetchCheckinDetails = async (checkinId: number): Promise<Checkin> => {
    try {
        const response = await axios.get(`${API_URL}/details/${checkinId}`);
        return response.data;
    } catch (error: any) {
        console.error(`Error al obtener los detalles del check-in ${checkinId}:`, error.response?.data || error.message);
        throw error;
    }
};

// Registrar un check-in o check-out con contraseña
export const registerCheckin = async (teacherId: number, password: string): Promise<{ message: string }> => {
    try {
        const response = await axios.post(API_URL, {
            teacher_id: teacherId,
            password,
        });

        return response.data;
    } catch (error: any) {
        console.error('Error al registrar el check-in:', error.response?.data || error.message);
        throw error;
    }
};
