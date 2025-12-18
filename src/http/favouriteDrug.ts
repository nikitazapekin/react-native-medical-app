import type { FavouriteDrug, FavouriteDrugRequest } from './types/favouriteDrug';
import $api from './api';

class FavouriteDrugService {
  static async getMyFavouriteDrugs(): Promise<FavouriteDrug[]> {
    try {
      const response = await $api.get<FavouriteDrug[]>('/favourite-drugs/me');

      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error('Error fetching favourite drugs:', error);

      return [];
    }
  }

  static async getFavouriteDrugsByPatientId(patientId: number): Promise<FavouriteDrug[]> {
    try {
      const response = await $api.get<FavouriteDrug[]>(`/favourite-drugs/patient/${patientId}`);

      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error('Error fetching favourite drugs:', error);

      return [];
    }
  }

  static async getFavouriteDrugById(id: number): Promise<FavouriteDrug> {
    try {
      const response = await $api.get<FavouriteDrug>(`/favourite-drugs/${id}`);

      return response.data;
    } catch (error) {
      console.error(`Error fetching favourite drug ${id}:`, error);
      throw new Error('Failed to get favourite drug');
    }
  }

  static async createFavouriteDrug(request: FavouriteDrugRequest): Promise<FavouriteDrug> {
    try {
      const response = await $api.post<FavouriteDrug>('/favourite-drugs', request);

      return response.data;
    } catch (error) {
      console.error('Error creating favourite drug:', error);
      throw new Error('Failed to create favourite drug');
    }
  }

  static async deleteFavouriteDrug(id: number): Promise<void> {
    try {
      await $api.delete(`/favourite-drugs/${id}`);
    } catch (error) {
      console.error('Error deleting favourite drug:', error);
      throw new Error('Failed to delete favourite drug');
    }
  }
}

export default FavouriteDrugService;
