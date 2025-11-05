import type { MedicalAppointment, MedicalAppointmentRequest } from './types/medical';
import $api from './api';

class MedicalAppointmentService {
  static async createMedicalAppointment(
    medicalCardId: number,
    request: MedicalAppointmentRequest
  ): Promise<MedicalAppointment> {
    try {
      const response = await $api.post<MedicalAppointment>(
        `/medical-cards/${medicalCardId}/appointments`,
        request
      );

      return response.data;
    } catch (error) {
      console.error('Error creating medical appointment:', error);
      throw new Error('Failed to create medical appointment');
    }
  }

  static async getMedicalAppointments(medicalCardId: number): Promise<MedicalAppointment[]> {
    try {
      const response = await $api.get<MedicalAppointment[]>(
        `/medical-cards/${medicalCardId}/appointments`
      );

      return response.data;
    } catch (error) {
      console.error('Error fetching medical appointments:', error);
      throw new Error('Failed to get medical appointments');
    }
  }

  static async getMedicalAppointmentById(id: number): Promise<MedicalAppointment> {
    try {
      const response = await $api.get<MedicalAppointment>(`/appointments/${id}`);

      return response.data;
    } catch (error) {
      console.error('Error fetching medical appointment:', error);
      throw new Error('Failed to get medical appointment');
    }
  }

  static async updateMedicalAppointment(
    id: number,
    request: MedicalAppointmentRequest
  ): Promise<MedicalAppointment> {
    try {
      const response = await $api.put<MedicalAppointment>(`/appointments/${id}`, request);

      return response.data;
    } catch (error) {
      console.error('Error updating medical appointment:', error);
      throw new Error('Failed to update medical appointment');
    }
  }

  static async deleteMedicalAppointment(id: number): Promise<void> {
    try {
      await $api.delete(`/appointments/${id}`);
    } catch (error) {
      console.error('Error deleting medical appointment:', error);
      throw new Error('Failed to delete medical appointment');
    }
  }

  static async getMedicalAppointmentsByDate(
    medicalCardId: number,
    date: string
  ): Promise<MedicalAppointment[]> {
    try {
      const response = await $api.get<MedicalAppointment[]>(
        `/medical-cards/${medicalCardId}/appointments/by-date?date=${date}`
      );

      return response.data;
    } catch (error) {
      console.error('Error fetching medical appointments by date:', error);
      throw new Error('Failed to get medical appointments by date');
    }
  }

  static async getMedicalAppointmentsByPeriod(
    medicalCardId: number,
    startDate: string,
    endDate: string
  ): Promise<MedicalAppointment[]> {
    try {
      const response = await $api.get<MedicalAppointment[]>(
        `/medical-cards/${medicalCardId}/appointments/by-period?startDate=${startDate}&endDate=${endDate}`
      );

      return response.data;
    } catch (error) {
      console.error('Error fetching medical appointments by period:', error);
      throw new Error('Failed to get medical appointments by period');
    }
  }
}

export default MedicalAppointmentService;
