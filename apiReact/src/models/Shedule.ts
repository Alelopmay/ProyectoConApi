export interface Schedule {
    teacher_id: number;  // 🔧 Ahora solo se guarda el ID del profesor
    day: string;
    start_time: string;  // 🔧 Cambiado a string (HH:mm:ss)
    end_time: string;  // 🔧 Cambiado a string (HH:mm:ss)
}
