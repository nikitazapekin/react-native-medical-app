import type { Drug, DrugRequest, DrugSearchParams } from './types/drug';
import $api from './api';

class DrugService {
  static async getAllDrugs(params?: DrugSearchParams): Promise<Drug[]> {
    try {
      const queryParams = new URLSearchParams();
      
      if (params?.search) {
        queryParams.append('search', params.search);
      }
      
      if (params?.sortBy) {
        queryParams.append('sortBy', params.sortBy);
      }

      const queryString = queryParams.toString();
      const url = `/drugs${queryString ? `?${queryString}` : ''}`;

      const response = await $api.get<Drug[]>(url);
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error('Error fetching drugs:', error);
      return [];
    }
  }

  static async getDrugById(id: number): Promise<Drug> {
    try {
      const response = await $api.get<Drug>(`/drugs/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching drug ${id}:`, error);
      throw new Error('Failed to get drug');
    }
  }

  static async createDrug(request: DrugRequest): Promise<Drug> {
    try {
      const response = await $api.post<Drug>('/drugs', request);
      return response.data;
    } catch (error) {
      console.error('Error creating drug:', error);
      throw new Error('Failed to create drug');
    }
  }

  static async updateDrug(id: number, request: DrugRequest): Promise<Drug> {
    try {
      const response = await $api.put<Drug>(`/drugs/${id}`, request);
      return response.data;
    } catch (error) {
      console.error('Error updating drug:', error);
      throw new Error('Failed to update drug');
    }
  }

  static async deleteDrug(id: number): Promise<void> {
    try {
      await $api.delete(`/drugs/${id}`);
    } catch (error) {
      console.error('Error deleting drug:', error);
      throw new Error('Failed to delete drug');
    }
  }
}

export default DrugService;

