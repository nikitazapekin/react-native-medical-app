export interface DoctorEditField {
  id: number;
  label: string;
  type: string;
  placeholder: string;
  field: keyof {
    firstName?: string;
    middleName?: string;
    lastName?: string;
    specialization?: string;
    email?: string;
    education?: string;
    incrementQualification?: string;
    experience?: number;
    achievements?: string;
    status?: string;
    citate?: string;
  };
}

export const DOCTOR_EDIT_CONSTANTS: DoctorEditField[] = [
  { id: 1, label: "Имя", type: "text", placeholder: "Имя", field: "firstName" },
  { id: 2, label: "Отчество", type: "text", placeholder: "Отчество", field: "middleName" },
  { id: 3, label: "Фамилия", type: "text", placeholder: "Фамилия", field: "lastName" },
  { id: 4, label: "Специализация", type: "text", placeholder: "Специализация", field: "specialization" },
  { id: 5, label: "Электронная почта", type: "email", placeholder: "Почта", field: "email" },
  { id: 6, label: "Образование", type: "text", placeholder: "Образование", field: "education" },
  { id: 7, label: "Повышение квалификации", type: "text", placeholder: "Повышение квалификации", field: "incrementQualification" },
  { id: 8, label: "Опыт работы (лет)", type: "numeric", placeholder: "Опыт работы", field: "experience" },
  { id: 9, label: "Достижения", type: "text", placeholder: "Достижения", field: "achievements" },
  { id: 10, label: "Статус", type: "text", placeholder: "Статус", field: "status" },
  { id: 11, label: "Цитата", type: "text", placeholder: "Цитата", field: "citate" },
];
