import type { MedicalAppointmentRequest, MedicalAppointmentResponse } from "./types/doctor";
import $api from "./api";

class MedicalAppointmentService {
  static async getAppointmentsByMedicalCardId(medicalCardId: number): Promise<MedicalAppointmentResponse[]> {
    try {
      const response = await $api.get<MedicalAppointmentResponse[]>(
        `/medical-appointments/medical-card/${medicalCardId}`
      );

      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error("Error fetching appointments:", error);

      return [];
    }
  }

  static async getAnalyzesByMedicalCardId(medicalCardId: number): Promise<MedicalAppointmentResponse[]> {
    try {
      const response = await $api.get<MedicalAppointmentResponse[]>(
        `/medical-appointments/medical-card/${medicalCardId}/analyzes`
      );

      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error("Error fetching analyzes:", error);

      return [];
    }
  }

  static async getAppointmentById(id: number): Promise<MedicalAppointmentResponse> {
    try {
      const response = await $api.get<MedicalAppointmentResponse>(`/medical-appointments/${id}`);

      return response.data;
    } catch (error) {
      console.error(`Error fetching appointment ${id}:`, error);
      throw new Error("Failed to get appointment information");
    }
  }

  static async createAppointment(appointment: MedicalAppointmentRequest): Promise<MedicalAppointmentResponse> {
    try {
      const response = await $api.post<MedicalAppointmentResponse>("/medical-appointments", appointment);

      return response.data;
    } catch (error) {
      console.error("Error creating appointment:", error);
      throw new Error("Failed to create appointment");
    }
  }

  static async deleteAppointment(id: number): Promise<void> {
    try {
      await $api.delete(`/medical-appointments/${id}`);
    } catch (error) {
      console.error(`Error deleting appointment ${id}:`, error);
      throw new Error("Failed to delete appointment");
    }
  }

  // История консультаций
  static async getConsultationHistory(
    patientId: number,
    year?: number,
    sortBy?: string
  ): Promise<MedicalAppointmentResponse[]> {
    try {
      const params: any = { sortBy: sortBy || "date_desc" };

      if (year) {
        params.year = year;
      }

      const response = await $api.get<MedicalAppointmentResponse[]>(
        `/medical-appointments/consultations/patient/${patientId}`,
        { params }
      );

      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error("Error fetching consultation history:", error);

      return [];
    }
  }

  static async getConsultationHistoryByChild(childId: number): Promise<MedicalAppointmentResponse[]> {
    try {
      const response = await $api.get<MedicalAppointmentResponse[]>(
        `/medical-appointments/consultations/child/${childId}`
      );

      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error("Error fetching child consultation history:", error);

      return [];
    }
  }

  // Все записи пациента с фильтрами
  static async getAllAppointments(
    patientId: number,
    filters?: {
      year?: number;
      status?: string;
      sortBy?: string;
      search?: string;
    }
  ): Promise<MedicalAppointmentResponse[]> {
    try {
      const params: any = {
        sortBy: filters?.sortBy || "date_desc",
      };

      if (filters?.year) params.year = filters.year;

      if (filters?.status) params.status = filters.status;

      if (filters?.search) params.search = filters.search;

      const response = await $api.get<MedicalAppointmentResponse[]>(
        `/medical-appointments/patient/${patientId}`,
        { params }
      );

      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error("Error fetching appointments:", error);

      return [];
    }
  }

  // Отмена записи
  static async cancelAppointment(id: number): Promise<MedicalAppointmentResponse> {
    try {
      const response = await $api.patch<MedicalAppointmentResponse>(
        `/medical-appointments/${id}/cancel`
      );

      return response.data;
    } catch (error) {
      console.error(`Error cancelling appointment ${id}:`, error);
      throw new Error("Failed to cancel appointment");
    }
  }

  // Перенос записи
  static async rescheduleAppointment(
    id: number,
    newDate: string,
    newTime?: string
  ): Promise<MedicalAppointmentResponse> {
    try {
      const params: any = { newDate };

      if (newTime) params.newTime = newTime;

      const response = await $api.patch<MedicalAppointmentResponse>(
        `/medical-appointments/${id}/reschedule`,
        null,
        { params }
      );

      return response.data;
    } catch (error) {
      console.error(`Error rescheduling appointment ${id}:`, error);
      throw new Error("Failed to reschedule appointment");
    }
  }

  // Записи врача на сегодня
  static async getDoctorTodayAppointments(): Promise<MedicalAppointmentResponse[]> {
    try {
      const response = await $api.get<MedicalAppointmentResponse[]>('/doctors/appointments/today');

      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error('Error fetching doctor today appointments:', error);

      return [];
    }
  }

  // Все записи врача
  static async getDoctorAllAppointments(): Promise<MedicalAppointmentResponse[]> {
    try {
      const response = await $api.get<MedicalAppointmentResponse[]>('/doctors/appointments');

      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error('Error fetching doctor appointments:', error);

      return [];
    }
  }
}

export default MedicalAppointmentService;
