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

  static async getTop3Services(): Promise<ServiceResponse[]> {
    try {
      const response = await $api.get<ServiceResponse[]>("/services/top3");

      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error("Error fetching top 3 services:", error);

      return [];
    }
  }

  static async getSortedServices(sortBy: string = "title"): Promise<ServiceResponse[]> {
    try {
      const response = await $api.get<ServiceResponse[]>("/services/sorted", {
        params: { sortBy }
      });

      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error("Error fetching sorted services:", error);

      return [];
    }
  }
}

export default ServiceService;
