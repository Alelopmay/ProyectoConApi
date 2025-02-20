// FormInstitute.tsx
import React, { useState } from 'react';
import { Institute } from '../../models/Institute';
import { createInstitute } from '../../Services/InstituteService'; // Importar las funciones de los servicios
import './Form_institute.css';

const FormInstitute: React.FC = () => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    // Crear instituto
    const handleCreateInstitute = async (event: React.FormEvent) => {
        event.preventDefault();

        console.log("Formulario enviado");  // Log cuando se envía el formulario
        const newInstitute: Institute = { id: 0, name, address };  // `id` es 0 porque el backend lo genera
        console.log("Nuevo Instituto:", newInstitute);  // Log de la nueva institución que se va a crear

        setLoading(true);
        setMessage('');
        console.log("Estado de carga activado");  // Log cuando comienza la carga

        try {
            console.log("Intentando crear instituto...");
            const createdInstitute = await createInstitute(newInstitute);
            if (typeof createdInstitute === 'string') {
                console.error(createdInstitute);
                setMessage('Hubo un error al intentar crear el instituto');
            } else {
                setMessage('Instituto creado exitosamente!');
                console.log("Instituto creado exitosamente!");  // Log cuando la creación es exitosa
            }
        } catch (error) {
            console.error("Error al crear el instituto:", error);  // Log si ocurre un error
            setMessage('Hubo un error al intentar crear el instituto');
        } finally {
            setLoading(false);
            console.log("Estado de carga desactivado");  // Log cuando termina la carga
            setName('');
            setAddress('');
            console.log("Campos de nombre y dirección reseteados");  // Log cuando se resetan los campos
        }
    };

    return (
        <div className="w-full max-w-md mx-auto p-6 bg-gradient-to-r from-gray-900 via-gray-800 to-indigo-700 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold text-center text-gray-200 mb-4">Crear Instituto</h2>
            <form onSubmit={handleCreateInstitute} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-200">Nombre del Instituto</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="w-full mt-1 p-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-indigo-500"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                            console.log("Nuevo nombre:", e.target.value);  // Log para mostrar el cambio del nombre
                        }}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-200">Dirección del Instituto</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        className="w-full mt-1 p-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-indigo-500"
                        value={address}
                        onChange={(e) => {
                            setAddress(e.target.value);
                            console.log("Nueva dirección:", e.target.value);  // Log para mostrar el cambio de la dirección
                        }}
                        required
                    />
                </div>

                {message && <div className="text-center text-lg mt-4">{message}</div>}

                <div className="text-center">
                    <button
                        type="submit"
                        className={`w-full py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={loading}
                    >
                        {loading ? 'Creando...' : 'Crear Instituto'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FormInstitute;
