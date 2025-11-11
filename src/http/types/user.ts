export interface UserProfile {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: 'PATIENT' | 'DOCTOR';
  avatar?: string;
  createdAt: string;

  phoneNumber?: string;
  region?: string;
  citate?: string;

  rate?: number;
  status?: string;
  experience?: number;
  education?: string[];
  specialization?: string;
  achievements?: string;
  incrementQualification?: string;

  registrationDate?: string;
}

export interface UserUpdateRequest {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  region?: string;
  citate?: string;
  avatar?: string;
}

export interface DoctorSpecificUpdate {
  specialization?: string;
  experience?: number;
  education?: string[];
  achievements?: string;
  incrementQualification?: string;
  status?: string;
  rate?: number;
}

export interface PatientSpecificUpdate {
  registrationDate?: string;
}
