export interface DoctorResponse {
  id: number;
  firstName: string;
  middleName?: string;
  lastName: string;
  rate: number;
  status: string;
  citate?: string;
  experience: number;
  education?: string[];
  specialization: string;
  achievements?: string[];
  incrementQualification?: string;
  avatar?: string;
  email: string;
  role: string;
  createdAt: string;
}

export interface ServiceResponse {
  id: number;
  title: string;
  subtitle?: string;
  createdAt: string;
}

export interface MedicalAppointmentRequest {
  medicalCardId: number;
  doctorId: number;
  serviceId?: number;
  appointmentName: string;
  appointmentDate: string; // ISO string
  appointmentTime: string; // "Утро", "День", "Вечер"
  description?: string;
  appointmentType?: string;
}

export interface MedicalAppointmentResponse {
  id: number;
  appointmentName: string;
  appointmentDate: string;
  appointmentTime: string;
  description?: string;
  appointmentType?: string;
  doctorInitials?: string;
  doctor?: DoctorResponse;
  service?: ServiceResponse;
}

