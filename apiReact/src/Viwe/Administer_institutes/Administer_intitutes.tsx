
import React from 'react';
import FormInstitute from '../../Components/Form_institute/Form_institute';
import './Administer_intitutes.css';
import InstitutesList from '../../Components/Intitutes_list/Intitutes_list';
const AdminInstitutes: React.FC = () => {
    return (
        <div className="admin-institutes-container">
            <header className="bg-gradient-to-r from-gray-800 via-indigo-900 to-purple-800 p-6 text-white shadow-lg rounded-lg mb-4">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-extrabold">Administrar Institutos</h1>
                    <a href="/home" className="bg-gray-800 text-indigo-500 px-4 py-2 rounded-lg shadow-md hover:bg-indigo-600 hover:text-white transition-all duration-300">
                        Volver al Home
                    </a>
                </div>
            </header>

            <FormInstitute />
            <InstitutesList />
        </div>
    );
};

export default AdminInstitutes;
