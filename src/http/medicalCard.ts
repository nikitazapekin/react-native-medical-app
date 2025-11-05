import type { MedicalCard } from './types/medical';
import $api from './api';

class MedicalCardService {
  static async createMedicalCardForChild(childId: number): Promise<MedicalCard> {
    try {
      const response = await $api.post<MedicalCard>(`/medical-cards/child/${childId}`);

      return response.data;
    } catch (error) {
      console.error('Error creating medical card:', error);
      throw new Error('Failed to create medical card');
    }
  }

  static async getMedicalCardByChildId(childId: number): Promise<MedicalCard> {
    try {
      const response = await $api.get<MedicalCard>(`/medical-cards/child/${childId}`);

      return response.data;
    } catch (error) {
      console.error('Error fetching medical card:', error);
      throw new Error('Failed to get medical card');
    }
  }

  static async getMedicalCardById(id: number): Promise<MedicalCard> {
    try {
      const response = await $api.get<MedicalCard>(`/medical-cards/${id}`);

      return response.data;
    } catch (error) {
      console.error('Error fetching medical card:', error);
      throw new Error('Failed to get medical card');
    }
  }

  static async deleteMedicalCard(id: number): Promise<void> {
    try {
      await $api.delete(`/medical-cards/${id}`);
    } catch (error) {
      console.error('Error deleting medical card:', error);
      throw new Error('Failed to delete medical card');
    }
  }
}

export default MedicalCardService;
