import type { ClinicResponse } from "./types/clinic";
import $api from "./api";

class ClinicService {
  static async getAllClinics(): Promise<ClinicResponse[]> {
    try {
      const response = await $api.get<ClinicResponse[]>("/clinics");

      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error("Error fetching clinics:", error);

      return [];
    }
  }

  static async getClinicById(id: number): Promise<ClinicResponse> {
    try {
      const response = await $api.get<ClinicResponse>(`/clinics/${id}`);

      return response.data;
    } catch (error) {
      console.error(`Error fetching clinic ${id}:`, error);
      throw new Error("Failed to get clinic information");
    }
  }

  static async getClinicByChildId(childId: number): Promise<ClinicResponse> {
    try {
      const response = await $api.get<ClinicResponse>(`/clinics/by-child/${childId}`);

      return response.data;
    } catch (error) {
      console.error(`Error fetching clinic by child ${childId}:`, error);
      throw new Error("Failed to get clinic for this child");
    }
  }

  static async searchClinics(name: string): Promise<ClinicResponse[]> {
    try {
      const response = await $api.get<ClinicResponse[]>("/clinics/search", {
        params: { name },
      });

      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error("Error searching clinics:", error);

      return [];
    }
  }
}

export default ClinicService;
