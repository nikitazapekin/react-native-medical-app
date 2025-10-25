export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
  role?: string;
}

export interface AuthResponse {
  accessToken: string;
  tokenType: string;
  role: string;
  email: string;
  message?: string;
}

export interface Patient {
  id: number;
  firstName: string;
  lastName: string;
  registrationDate?: string;
  phoneNumber?: string;
  region?: string;
  avatar?: string;
  citate?: string;
  createdAt?: string;
  email: string;
  role: string;
}

export interface Doctor {
  id: number;
  firstName: string;
  lastName: string;
  rate?: number;
  status?: string;
  citate?: string;
  experience?: number;
  education?: string[];
  specialization?: string;
  achievements?: string;
  incrementQualification?: string;
  avatar?: string;
  createdAt?: string;
  email: string;
  role: string;
}

export interface ApiResponse<T> {
  data?: T;
  message?: string;
  success: boolean;
}
