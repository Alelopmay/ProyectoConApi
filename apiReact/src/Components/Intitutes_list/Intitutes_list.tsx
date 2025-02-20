import React, { useState, useEffect } from 'react';
import { Institute } from '../../models/Institute';
import { fetchInstitutes, deleteInstitute, updateInstitute } from '../../Services/InstituteService';

const InstitutesList: React.FC = () => {
    const [institutes, setInstitutes] = useState<Institute[]>([]);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [selectedInstitute, setSelectedInstitute] = useState<Institute | null>(null);
    const [updatedName, setUpdatedName] = useState<string>('');
    const [updatedAddress, setUpdatedAddress] = useState<string>('');
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState<boolean>(false);
    const [deletingInstituteId, setDeletingInstituteId] = useState<number | null>(null);

    // Obtener la lista de institutos al cargar el componente
    useEffect(() => {
        const getInstitutes = async () => {
            const institutesList = await fetchInstitutes();
            setInstitutes(institutesList);
        };

        getInstitutes();
    }, []);

    // Eliminar instituto
    const handleDelete = async (id: number) => {
        const success = await deleteInstitute(id);
        if (success) {
            setInstitutes((prev) => prev.filter((institute) => institute.id !== id));
            console.log(`Instituto con ID ${id} eliminado`);
            setShowDeleteConfirmation(false);  // Cerrar el cuadro de confirmación después de eliminar
        } else {
            console.error('Error al eliminar el instituto');
        }
    };

    // Manejo de edición
    const handleEdit = (institute: Institute) => {
        setIsEditing(true);
        setSelectedInstitute(institute);
        setUpdatedName(institute.name);
        setUpdatedAddress(institute.address);
    };

    // Confirmar edición
    const handleUpdate = async () => {
        if (selectedInstitute) {
            const updatedInstitute: Institute = { ...selectedInstitute, name: updatedName, address: updatedAddress };
            const result = await updateInstitute(selectedInstitute.id, updatedInstitute);
            if (typeof result !== 'string') {
                setInstitutes((prev) =>
                    prev.map((institute) =>
                        institute.id === selectedInstitute.id ? { ...institute, name: updatedName, address: updatedAddress } : institute
                    )
                );
                setIsEditing(false);
                setSelectedInstitute(null);
            } else {
                console.error(result);
            }
        }
    };

    // Cancelar edición
    const handleCancelEdit = () => {
        setIsEditing(false);
        setSelectedInstitute(null);
    };

    // Mostrar cuadro de confirmación de eliminación
    const showDeleteDialog = (id: number) => {
        setDeletingInstituteId(id);
        setShowDeleteConfirmation(true);
    };

    // Cancelar eliminación
    const cancelDelete = () => {
        setShowDeleteConfirmation(false);
        setDeletingInstituteId(null);
    };

    return (
        <div className="institutes-list-container mt-6">
            <table className="min-w-full bg-gradient-to-r from-gray-900 via-gray-800 to-indigo-700 shadow-lg rounded-lg overflow-hidden">
                <thead className="bg-indigo-600 text-white">
                    <tr>
                        <th className="py-2 px-4 text-left">Nombre del Instituto</th>
                        <th className="py-2 px-4 text-left">Dirección</th>
                        <th className="py-2 px-4 text-left">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {institutes.map((institute) => (
                        <tr key={institute.id} className="border-b">
                            <td className="py-2 px-4">
                                {isEditing && selectedInstitute?.id === institute.id ? (
                                    <input
                                        type="text"
                                        value={updatedName}
                                        onChange={(e) => setUpdatedName(e.target.value)}
                                        className="w-full p-2 border border-gray-600 rounded-md"
                                    />
                                ) : (
                                    institute.name
                                )}
                            </td>
                            <td className="py-2 px-4">
                                {isEditing && selectedInstitute?.id === institute.id ? (
                                    <input
                                        type="text"
                                        value={updatedAddress}
                                        onChange={(e) => setUpdatedAddress(e.target.value)}
                                        className="w-full p-2 border border-gray-600 rounded-md"
                                    />
                                ) : (
                                    institute.address
                                )}
                            </td>
                            <td className="py-2 px-4 flex space-x-2">
                                {isEditing && selectedInstitute?.id === institute.id ? (
                                    <>
                                        <button
                                            onClick={handleUpdate}
                                            className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
                                        >
                                            Confirmar
                                        </button>
                                        <button
                                            onClick={handleCancelEdit}
                                            className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700"
                                        >
                                            Cancelar
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            onClick={() => handleEdit(institute)}
                                            className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
                                        >
                                            Editar
                                        </button>
                                        <button
                                            onClick={() => showDeleteDialog(institute.id)}
                                            className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
                                        >
                                            Eliminar
                                        </button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Confirmación de eliminación */}
            {showDeleteConfirmation && deletingInstituteId !== null && (
                <div className="mt-4 p-4 bg-gray-800 rounded-lg">
                    <p className="text-white">¿Estás seguro de que quieres eliminar este instituto?</p>
                    <div className="mt-4 flex space-x-4 justify-center">
                        <button
                            onClick={() => handleDelete(deletingInstituteId)}
                            className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
                        >
                            Confirmar
                        </button>
                        <button
                            onClick={cancelDelete}
                            className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700"
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InstitutesList;
