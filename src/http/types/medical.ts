export interface MedicalCard {
  id: number;
  childId: number;
  childName: string;
  createdAt: string;
  updatedAt: string;
  diseaseHistories: DiseaseHistory[];
  medicalTests: MedicalTest[];
  medicalAppointments: MedicalAppointment[];
}

export interface DiseaseHistory {
  id: number;
  diseaseName: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface DiseaseHistoryRequest {
  diseaseName: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface MedicalTest {
  id: number;
  testName: string;
  testDate: string;
  description: string;
  doctorName: string;
}

export interface MedicalTestRequest {
  testName: string;
  testDate: string;
  description: string;
  doctorName: string;
}

export interface MedicalAppointment {
  id: number;
  appointmentName: string;
  appointmentDate: string;
  description: string;
  appointmentType: string;
  doctorInitials: string;
}

export interface MedicalAppointmentRequest {
  appointmentName: string;
  appointmentDate: string;
  description: string;
  appointmentType: string;
  doctorInitials: string;
}
