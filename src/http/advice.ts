import type { AdviceRequest, AdviceResponse } from "./types/survey";
import $api from "./api";

class AdviceService {
  static async getAllAdvice(): Promise<AdviceResponse[]> {
    try {
      const response = await $api.get<AdviceResponse[]>("/advice");

      return response.data;
    } catch (error) {
      console.error("Error fetching advice:", error);
      throw new Error("Failed to get advice list");
    }
  }

  static async getAdviceById(id: number): Promise<AdviceResponse> {
    try {
      const response = await $api.get<AdviceResponse>(`/advice/${id}`);

      return response.data;
    } catch (error) {
      console.error(`Error fetching advice ${id}:`, error);
      throw new Error("Failed to get advice information");
    }
  }

  static async getAdviceByType(type: string): Promise<AdviceResponse[]> {
    try {
      const response = await $api.get<AdviceResponse[]>(`/advice/type/${type}`);

      return response.data;
    } catch (error) {
      console.error(`Error fetching advice by type ${type}:`, error);
      throw new Error("Failed to get advice by type");
    }
  }

  static async createAdvice(adviceData: AdviceRequest): Promise<AdviceResponse> {
    try {
      console.log("Creating advice with data:", adviceData);
      const response = await $api.post<AdviceResponse>("/advice", adviceData);

      console.log("Advice creation successful");

      return response.data;
    } catch (error) {
      console.error("Error creating advice:", error);
      throw new Error("Failed to create advice");
    }
  }

  static async updateAdvice(
    id: number,
    adviceData: Partial<AdviceRequest>
  ): Promise<AdviceResponse> {
    try {
      console.log(`Updating advice ${id} with data:`, adviceData);
      const response = await $api.put<AdviceResponse>(`/advice/${id}`, adviceData);

      console.log("Advice update successful");

      return response.data;
    } catch (error) {
      console.error(`Error updating advice ${id}:`, error);
      throw new Error("Failed to update advice");
    }
  }

  static async deleteAdvice(id: number): Promise<void> {
    try {
      console.log(`Deleting advice ${id}`);
      await $api.delete(`/advice/${id}`);
      console.log("Advice deletion successful");
    } catch (error) {
      console.error(`Error deleting advice ${id}:`, error);
      throw new Error("Failed to delete advice");
    }
  }

  static parseAdviceItems(
    itemsJson: string
  ): Array<{ title: string; description: string; example: string }> {
    try {
      return JSON.parse(itemsJson);
    } catch (error) {
      console.error("Error parsing advice items JSON:", error);

      return [];
    }
  }

  static stringifyAdviceItems(
    items: Array<{ title: string; description: string; example: string }>
  ): string {
    try {
      return JSON.stringify(items);
    } catch (error) {
      console.error("Error stringifying advice items:", error);

      return "[]";
    }
  }

  static async getRandomAdvice(): Promise<AdviceResponse> {
    try {
      const response = await $api.get<AdviceResponse>("/advice/random");

      return response.data;
    } catch (error) {
      console.error("Error fetching random advice:", error);
      throw new Error("Failed to get random advice");
    }
  }

  static async getRandomAdviceByType(type: string): Promise<AdviceResponse> {
    try {
      const response = await $api.get<AdviceResponse>(`/advice/random/${type}`);

      return response.data;
    } catch (error) {
      console.error(`Error fetching random advice for type ${type}:`, error);
      throw new Error("Failed to get random advice by type");
    }
  }
}

export default AdviceService;
