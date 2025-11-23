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
}

export default MedicalAppointmentService;
