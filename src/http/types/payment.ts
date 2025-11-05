export interface PaymentHistory {
  id: number;
  date: string; 
  title: string;
  description?: string;
  price: number;
  doctor?: string;
  patientId: number;
  patientName?: string;
  createdAt: string;
}

export interface PaymentHistoryRequest {
  date: string;
  title: string;
  description?: string;
  price: number;
  doctor?: string;
  patientId: number;
}
