import { Teacher } from "./Teacher";

export interface Checkin {
    entry_date: string;
    exit_date: string | null;
    teacher: Teacher;
}