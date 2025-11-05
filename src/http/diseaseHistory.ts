import type { DiseaseHistory, DiseaseHistoryRequest } from './types/medical';
import $api from './api';

class DiseaseHistoryService {
  static async createDiseaseHistory(
    medicalCardId: number,
    request: DiseaseHistoryRequest
  ): Promise<DiseaseHistory> {
    try {
      const response = await $api.post<DiseaseHistory>(
        `/medical-cards/${medicalCardId}/disease-history`,
        request
      );

      return response.data;
    } catch (error) {
      console.error('Error creating disease history:', error);
      throw new Error('Failed to create disease history');
    }
  }

  static async getDiseaseHistories(medicalCardId: number): Promise<DiseaseHistory[]> {
    try {
      const response = await $api.get<DiseaseHistory[]>(
        `/medical-cards/${medicalCardId}/disease-history`
      );

      return response.data;
    } catch (error) {
      console.error('Error fetching disease histories:', error);
      throw new Error('Failed to get disease histories');
    }
  }

  static async getDiseaseHistoryById(id: number): Promise<DiseaseHistory> {
    try {
      const response = await $api.get<DiseaseHistory>(`/disease-history/${id}`);

      return response.data;
    } catch (error) {
      console.error('Error fetching disease history:', error);
      throw new Error('Failed to get disease history');
    }
  }

  static async updateDiseaseHistory(
    id: number,
    request: DiseaseHistoryRequest
  ): Promise<DiseaseHistory> {
    try {
      const response = await $api.put<DiseaseHistory>(`/disease-history/${id}`, request);

      return response.data;
    } catch (error) {
      console.error('Error updating disease history:', error);
      throw new Error('Failed to update disease history');
    }
  }

  static async deleteDiseaseHistory(id: number): Promise<void> {
    try {
      await $api.delete(`/disease-history/${id}`);
    } catch (error) {
      console.error('Error deleting disease history:', error);
      throw new Error('Failed to delete disease history');
    }
  }

  static async getDiseaseHistoriesByDate(
    medicalCardId: number,
    date: string
  ): Promise<DiseaseHistory[]> {
    try {
      const response = await $api.get<DiseaseHistory[]>(
        `/medical-cards/${medicalCardId}/disease-history/by-date?date=${date}`
      );

      return response.data;
    } catch (error) {
      console.error('Error fetching disease histories by date:', error);
      throw new Error('Failed to get disease histories by date');
    }
  }

  static async getDiseaseHistoriesByPeriod(
    medicalCardId: number,
    startDate: string,
    endDate: string
  ): Promise<DiseaseHistory[]> {
    try {
      const response = await $api.get<DiseaseHistory[]>(
        `/medical-cards/${medicalCardId}/disease-history/by-period?startDate=${startDate}&endDate=${endDate}`
      );

      return response.data;
    } catch (error) {
      console.error('Error fetching disease histories by period:', error);
      throw new Error('Failed to get disease histories by period');
    }
  }
}

export default DiseaseHistoryService;
