import React, { useEffect, useState } from 'react';
import { Teacher } from '../../models/Teacher';
import { getTeachers, deleteTeacher, updateTeacher } from '../../Services/teacherService';

const TeacherList: React.FC = () => {
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [editMode, setEditMode] = useState<boolean>(false);
    const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);

    // Cargar la lista de profesores al cargar el componente
    useEffect(() => {
        const loadTeachers = async () => {
            const data = await getTeachers();
            setTeachers(data);
        };
        loadTeachers();
    }, [teachers]); // Dependencia de teachers, para que se recargue la lista después de eliminar o actualizar

    // Eliminar profesor
    const handleDelete = async (id: number) => {
        try {
            await deleteTeacher(id.toString());
            alert('Profesor eliminado exitosamente');
            setTeachers((prevTeachers) => prevTeachers.filter(teacher => teacher.id !== id));
        } catch (error) {
            console.error('Error al eliminar el profesor:', error);
        }
    };

    // Activar modo de edición
    const handleEdit = (teacher: Teacher) => {
        setSelectedTeacher(teacher);
        setEditMode(true);
    };

    // Manejo del formulario de edición
    const handleEditSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!selectedTeacher) return;

        try {
            await updateTeacher(selectedTeacher);
            alert('Profesor actualizado con éxito!');
            setEditMode(false);
            setSelectedTeacher(null);
        } catch (error) {
            console.error('Error al actualizar el profesor:', error);
        }
    };

    // Actualizar valores del formulario de edición
    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (selectedTeacher) {
            const { name, value } = e.target;
            setSelectedTeacher({ ...selectedTeacher, [name]: value });
        }
    };

    return (
        <div className="max-w-3xl mx-auto bg-gradient-to-br from-gray-800 via-indigo-800 to-purple-700 shadow-lg rounded-lg p-8 mt-10">
            <h2 className="text-3xl font-semibold text-center text-white mb-6">Lista de Profesores</h2>

            {/* Mostrar lista de profesores */}
            <div className="overflow-y-auto max-h-80">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                        <tr>
                            <th className="py-3 px-4 text-lg font-semibold">Nombre</th>
                            <th className="py-3 px-4 text-lg font-semibold">Categoría</th>
                            <th className="py-3 px-4 text-lg font-semibold">Edad</th>
                            <th className="py-3 px-4 text-lg font-semibold">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teachers.map((teacher) => (
                            <tr className="border-b hover:bg-gray-700" key={teacher.id}>
                                <td className="py-4 px-4 text-gray-200">{teacher.name}</td>
                                <td className="py-4 px-4 text-gray-200">{teacher.category}</td>
                                <td className="py-4 px-4 text-gray-200">{teacher.age}</td>
                                <td className="py-4 px-4">
                                    <button
                                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-md transition-all"
                                        onClick={() => handleDelete(teacher.id)}
                                    >
                                        Eliminar
                                    </button>
                                    <button
                                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow-md mt-2 transition-all"
                                        onClick={() => handleEdit(teacher)}
                                    >
                                        Editar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Formulario de edición de profesor */}
            {editMode && selectedTeacher && (
                <div className="mt-6 p-6 bg-gray-700 rounded-lg">
                    <h3 className="text-xl text-white mb-4">Editar Profesor</h3>
                    <form onSubmit={handleEditSubmit}>
                        <div>
                            <label className="block text-sm font-medium text-gray-200">Nombre</label>
                            <input
                                type="text"
                                className="w-full mt-1 p-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-indigo-500"
                                name="name"
                                value={selectedTeacher.name}
                                onChange={handleEditChange}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-200">Categoría</label>
                            <input
                                type="text"
                                className="w-full mt-1 p-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-indigo-500"
                                name="category"
                                value={selectedTeacher.category}
                                onChange={handleEditChange}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-200">Edad</label>
                            <input
                                type="number"
                                className="w-full mt-1 p-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-indigo-500"
                                name="age"
                                value={selectedTeacher.age}
                                onChange={handleEditChange}
                                required
                            />
                        </div>
                        <div className="flex justify-end mt-4">
                            <button
                                type="submit"
                                className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg transition-all"
                            >
                                Guardar Cambios
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default TeacherList;
