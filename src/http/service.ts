import type { ServiceResponse } from "./types/doctor";
import $api from "./api";

class ServiceService {
  static async getAllServices(): Promise<ServiceResponse[]> {
    try {
      const response = await $api.get<ServiceResponse[]>("/services");
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error("Error fetching services:", error);
      return [];
    }
  }

  static async getServiceById(id: number): Promise<ServiceResponse> {
    try {
      const response = await $api.get<ServiceResponse>(`/services/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching service ${id}:`, error);
      throw new Error("Failed to get service information");
    }
  }
}

export default ServiceService;

