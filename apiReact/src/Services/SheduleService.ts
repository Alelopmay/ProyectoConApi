import axios from "axios";
import { Schedule } from "../models/Shedule";

const API_URL = "http://127.0.0.1:8000/api/schedules";

// Crear un nuevo horario
export const createSchedule = async (schedule: any): Promise<void> => {
    try {
        console.log("Datos enviados al backend:", schedule);

        await axios.post(API_URL, schedule, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error: any) {
        if (error.response) {
            console.error("❌ Error en createSchedule:", error.response.data);
        } else {
            console.error("❌ Error en createSchedule:", error);
        }
        throw error;
    }
};

// Obtener horarios de un profesor por ID
export const fetchSchedules = async (teacherId: number): Promise<Schedule[]> => {
    const response = await axios.get(`${API_URL}/teacher/${teacherId}`);
    return response.data;
};

// Eliminar un horario
export const deleteSchedule = async (scheduleId: number): Promise<void> => {
    await axios.delete(`${API_URL}/${scheduleId}`);
};
