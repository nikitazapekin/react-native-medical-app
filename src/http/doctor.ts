import type { DoctorResponse } from "./types/doctor";
import $api from "./api";

class DoctorService {
  static async getAllDoctors(): Promise<DoctorResponse[]> {
    try {
      const response = await $api.get<DoctorResponse[]>("/doctors");

      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error("Error fetching doctors:", error);

      return [];
    }
  }

  static async getDoctorById(id: number): Promise<DoctorResponse> {
    try {
      const response = await $api.get<DoctorResponse>(`/doctors/${id}`);

      return response.data;
    } catch (error) {
      console.error(`Error fetching doctor ${id}:`, error);
      throw new Error("Failed to get doctor information");
    }
  }

  static async searchDoctors(params: {
    name?: string;
    firstName?: string;
    lastName?: string;
    middleName?: string;
    specialization?: string;
  }): Promise<DoctorResponse[]> {
    try {
      const response = await $api.get<DoctorResponse[]>("/doctors/search", { params });

      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error("Error searching doctors:", error);

      return [];
    }
  }
}

export default DoctorService;
