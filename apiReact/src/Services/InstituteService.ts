

import { Institute } from "../models/Institute";

const API_URL = 'http://alelopmay:8000/api/institutes';

// Crear instituto
export const createInstitute = async (institute: Omit<Institute, 'id'>): Promise<Institute | string> => {
    console.log('Iniciando creación del instituto:', institute); // Log para saber que se está llamando la función
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(institute),
        });

        const data = await response.json();
        console.log('Respuesta del servidor:', data); // Log para ver la respuesta del servidor

        // Si la respuesta es ok, retorna el nuevo instituto, sino, retorna el mensaje de error
        if (response.ok) {
            console.log('Instituto creado con éxito:', data); // Log de éxito
            return data;
        } else {
            console.log('Error al crear el instituto:', data.message || 'Error desconocido');
            return data.message || 'Error al crear el instituto'; // Log de error
        }
    } catch (error) {
        console.error('Error creando el instituto:', error);
        return 'Hubo un error al intentar crear el instituto';
    }
};

// Obtener institutos
export const fetchInstitutes = async (): Promise<Institute[]> => {
    console.log('Iniciando obtención de los institutos'); // Log para saber que se está llamando la función
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        console.log('Respuesta de los institutos:', data); // Log para ver la respuesta de los institutos

        // Si la respuesta es ok, retorna los institutos, sino, retorna un arreglo vacío
        if (response.ok) {
            console.log('Institutos obtenidos con éxito:', data);
            return data;
        } else {
            console.log('Error al obtener los institutos');
            return []; // Log de error
        }
    } catch (error) {
        console.error('Error obteniendo los institutos:', error);
        return [];
    }
};

// Eliminar instituto
export const deleteInstitute = async (id: number): Promise<boolean> => {
    console.log('Iniciando eliminación del instituto con ID:', id); // Log para saber que se está llamando la función
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            console.log('Instituto eliminado con éxito:', id); // Log de éxito
            return true;
        } else {
            console.log('Error al eliminar el instituto:', id); // Log de error
            return false;
        }
    } catch (error) {
        console.error('Error eliminando el instituto:', error);
        return false;
    }

    
};
// Actualizar instituto
export const updateInstitute = async (id: number, updatedInstitute: Institute): Promise<Institute | string> => {
    console.log('Iniciando actualización del instituto con ID:', id); // Log para saber que se está llamando la función
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedInstitute),
        });

        const data = await response.json();
        console.log('Respuesta del servidor:', data); // Log para ver la respuesta del servidor

        // Si la respuesta es ok, retorna el instituto actualizado, sino, retorna el mensaje de error
        if (response.ok) {
            console.log('Instituto actualizado con éxito:', data); // Log de éxito
            return data;
        } else {
            console.log('Error al actualizar el instituto:', data.message || 'Error desconocido');
            return data.message || 'Error al actualizar el instituto'; // Log de error
        }
    } catch (error) {
        console.error('Error actualizando el instituto:', error);
        return 'Hubo un error al intentar actualizar el instituto';
    }
};
