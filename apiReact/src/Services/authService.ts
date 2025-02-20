import axios from 'axios';

// URL base de la API (ajústala según tu configuración de backend)
const API_URL = 'http://localhost:8000/api/login'; // Cambia esta URL a la URL correcta de tu API

// Función para hacer login del profesor
export const loginTeacher = async (name: string, password: string) => {
    try {
        const response = await axios.post(API_URL, {
            name,
            password,
        });
        return response.data; // Devuelve el token de acceso si la autenticación es exitosa
    } catch (error) {
        console.error('Error en la autenticación', error);
        throw new Error('Credenciales incorrectas'); // Lanza un error si la autenticación falla
    }
};
