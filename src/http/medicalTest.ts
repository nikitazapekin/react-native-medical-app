import type { MedicalTest, MedicalTestRequest } from './types/medical';
import $api from './api';

class MedicalTestService {
  static async createMedicalTest(
    medicalCardId: number,
    request: MedicalTestRequest
  ): Promise<MedicalTest> {
    try {
      const response = await $api.post<MedicalTest>(
        `/medical-cards/${medicalCardId}/medical-tests`,
        request
      );

      return response.data;
    } catch (error) {
      console.error('Error creating medical test:', error);
      throw new Error('Failed to create medical test');
    }
  }

  static async getMedicalTests(medicalCardId: number): Promise<MedicalTest[]> {
    try {
      const response = await $api.get<MedicalTest[]>(
        `/medical-cards/${medicalCardId}/medical-tests`
      );

      return response.data;
    } catch (error) {
      console.error('Error fetching medical tests:', error);
      throw new Error('Failed to get medical tests');
    }
  }

  static async getMedicalTestById(id: number): Promise<MedicalTest> {
    try {
      const response = await $api.get<MedicalTest>(`/medical-tests/${id}`);

      return response.data;
    } catch (error) {
      console.error('Error fetching medical test:', error);
      throw new Error('Failed to get medical test');
    }
  }

  static async updateMedicalTest(
    id: number,
    request: MedicalTestRequest
  ): Promise<MedicalTest> {
    try {
      const response = await $api.put<MedicalTest>(`/medical-tests/${id}`, request);

      return response.data;
    } catch (error) {
      console.error('Error updating medical test:', error);
      throw new Error('Failed to update medical test');
    }
  }

  static async deleteMedicalTest(id: number): Promise<void> {
    try {
      await $api.delete(`/medical-tests/${id}`);
    } catch (error) {
      console.error('Error deleting medical test:', error);
      throw new Error('Failed to delete medical test');
    }
  }

  static async getMedicalTestsByDate(
    medicalCardId: number,
    date: string
  ): Promise<MedicalTest[]> {
    try {
      const response = await $api.get<MedicalTest[]>(
        `/medical-cards/${medicalCardId}/medical-tests/by-date?date=${date}`
      );

      return response.data;
    } catch (error) {
      console.error('Error fetching medical tests by date:', error);
      throw new Error('Failed to get medical tests by date');
    }
  }

  static async getMedicalTestsByPeriod(
    medicalCardId: number,
    startDate: string,
    endDate: string
  ): Promise<MedicalTest[]> {
    try {
      const response = await $api.get<MedicalTest[]>(
        `/medical-cards/${medicalCardId}/medical-tests/by-period?startDate=${startDate}&endDate=${endDate}`
      );

      return response.data;
    } catch (error) {
      console.error('Error fetching medical tests by period:', error);
      throw new Error('Failed to get medical tests by period');
    }
  }
}

export default MedicalTestService;
