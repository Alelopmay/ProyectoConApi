import React, { useState } from 'react';
import { createTeacher } from '../../Services/teacherService';

// Definir un tipo para los datos que incluye 'password_confirmation'
interface CreateTeacherInput {
    name: string;
    category: string;
    age: number;
    password: string;
    password_confirmation: string;
}

const FormTeacher: React.FC = () => {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [age, setAge] = useState<number | ''>('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        // Validar que todos los campos estén completos
        if (!name || !category || age === '' || !password || !passwordConfirmation) {
            alert('Todos los campos son obligatorios.');
            return;
        }

        // Validar que las contraseñas coincidan
        if (password !== passwordConfirmation) {
            alert('Las contraseñas no coinciden.');
            return;
        }

        try {
            // Crear un objeto con los datos correctos
            const teacherData: CreateTeacherInput = {
                name,
                category,
                age: Number(age),
                password,
                password_confirmation: passwordConfirmation,
            };

            // Enviar los datos para crear un nuevo profesor
            await createTeacher(teacherData);
            alert('Profesor creado con éxito!');
            setName('');
            setCategory('');
            setAge('');
            setPassword('');
            setPasswordConfirmation('');
        } catch (error) {
            console.error('Error al crear el profesor:', error);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto p-6 bg-gradient-to-r from-gray-900 via-gray-800 to-indigo-700 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold text-center text-gray-200 mb-4">Crear Profesor</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-200">Nombre</label>
                    <input
                        type="text"
                        className="w-full mt-1 p-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-indigo-500"
                        placeholder="Ingrese el nombre"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-200">Categoría</label>
                    <input
                        type="text"
                        className="w-full mt-1 p-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-indigo-500"
                        placeholder="Ingrese la categoría"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-200">Edad</label>
                    <input
                        type="number"
                        className="w-full mt-1 p-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-indigo-500"
                        placeholder="Ingrese la edad"
                        value={age}
                        onChange={(e) => setAge(e.target.value ? Number(e.target.value) : '')}
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-200">Contraseña</label>
                    <input
                        type="password"
                        className="w-full mt-1 p-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-indigo-500"
                        placeholder="Ingrese la contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-200">Confirmar Contraseña</label>
                    <input
                        type="password"
                        className="w-full mt-1 p-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-indigo-500"
                        placeholder="Confirme la contraseña"
                        value={passwordConfirmation}
                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-300"
                >
                    Crear Profesor
                </button>
            </form>
        </div>
    );
};

export default FormTeacher;
