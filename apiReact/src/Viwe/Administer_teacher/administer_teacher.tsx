// AdministerTeacher.tsx
import React from "react";
import TeacherForm from "../../Components/Form_teacher/Form_teacher";
import TeacherList from "../../Components/Teachers_list/Teacher_list";

const AdministerTeacher: React.FC = () => {
    return (
        <div className="container mx-auto p-4">
            {/* Header */}
            <header className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-6 text-white shadow-lg rounded-lg mb-4">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-extrabold">Administrar Profesores</h1>
                    <a
                        href="/home"
                        className="bg-white text-blue-500 px-4 py-2 rounded-lg shadow-md hover:bg-blue-500 hover:text-white transition-all duration-300"
                    >
                        Volver al Home
                    </a>
                </div>
            </header>

            {/* Formulario de Crear Profesor */}
            <TeacherForm />

            {/* Lista de Profesores */}
            <TeacherList />
        </div>
    );
};

export default AdministerTeacher;
