import type { RecommendationRequest, RecommendationResponse } from "./types/recommendation";
import $api from "./api";

class RecommendationService {
  static async getAllRecommendations(): Promise<RecommendationResponse[]> {
    try {
      const response = await $api.get<RecommendationResponse[]>("/recommendations");

      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error("Error fetching recommendations:", error);

      return [];
    }
  }

  static async getTop3Recommendations(): Promise<RecommendationResponse[]> {
    try {
      const response = await $api.get<RecommendationResponse[]>("/recommendations/top3");

      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error("Error fetching top 3 recommendations:", error);

      return [];
    }
  }

  static async getRecommendationById(id: number): Promise<RecommendationResponse> {
    try {
      const response = await $api.get<RecommendationResponse>(`/recommendations/${id}`);

      return response.data;
    } catch (error) {
      console.error(`Error fetching recommendation ${id}:`, error);
      throw new Error("Failed to get recommendation information");
    }
  }

  static async getRecommendationsByCategory(category: string): Promise<RecommendationResponse[]> {
    try {
      const response = await $api.get<RecommendationResponse[]>(`/recommendations/category/${category}`);

      return response.data;
    } catch (error) {
      console.error(`Error fetching recommendations by category ${category}:`, error);
      throw new Error("Failed to get recommendations by category");
    }
  }

  static async createRecommendation(recommendationData: RecommendationRequest): Promise<RecommendationResponse> {
    try {
      console.log("Creating recommendation with data:", recommendationData);
      const response = await $api.post<RecommendationResponse>("/recommendations", recommendationData);

      console.log("Recommendation creation successful");

      return response.data;
    } catch (error) {
      console.error("Error creating recommendation:", error);
      throw new Error("Failed to create recommendation");
    }
  }

  static async updateRecommendation(
    id: number,
    recommendationData: Partial<RecommendationRequest>
  ): Promise<RecommendationResponse> {
    try {
      console.log(`Updating recommendation ${id} with data:`, recommendationData);
      const response = await $api.put<RecommendationResponse>(`/recommendations/${id}`, recommendationData);

      console.log("Recommendation update successful");

      return response.data;
    } catch (error) {
      console.error(`Error updating recommendation ${id}:`, error);
      throw new Error("Failed to update recommendation");
    }
  }

  static async deleteRecommendation(id: number): Promise<void> {
    try {
      console.log(`Deleting recommendation ${id}`);
      await $api.delete(`/recommendations/${id}`);
      console.log("Recommendation deletion successful");
    } catch (error) {
      console.error(`Error deleting recommendation ${id}:`, error);
      throw new Error("Failed to delete recommendation");
    }
  }
}

export default RecommendationService;
