import type { Doctor, Patient } from './types/personInfo';
import $api from './api';

export interface SearchParams {
  name?: string;
  firstName?: string;
  lastName?: string;
  specialization?: string;
}

export interface SearchResult<T> {
  data: T[];
  message?: string;
  total?: number;
}

class SearchService {

  static async searchDoctors(params: SearchParams): Promise<SearchResult<Doctor>> {
    try {
      const queryParams = new URLSearchParams();

      if (params.name) queryParams.append('name', params.name);

      if (params.firstName) queryParams.append('firstName', params.firstName);

      if (params.lastName) queryParams.append('lastName', params.lastName);

      if (params.specialization) queryParams.append('specialization', params.specialization);

      const queryString = queryParams.toString();
      const url = `/doctors/search${queryString ? `?${queryString}` : ''}`;

      const response = await $api.get<Doctor[]>(url);

      return {
        data: response.data,
        total: response.data.length
      };
    } catch (error: any) {
      console.error('Error searching doctors:', error);

      if (error.response?.status === 404) {
        return {
          data: [],
          message: 'Докторы по вашему запросу не найдены'
        };
      }

      throw new Error('Ошибка при поиске докторов');
    }
  }

  static async searchPatients(params: Omit<SearchParams, 'specialization'>): Promise<SearchResult<Patient>> {
    try {
      const queryParams = new URLSearchParams();

      if (params.name) queryParams.append('name', params.name);

      if (params.firstName) queryParams.append('firstName', params.firstName);

      if (params.lastName) queryParams.append('lastName', params.lastName);

      const queryString = queryParams.toString();
      const url = `/patients/search${queryString ? `?${queryString}` : ''}`;

      const response = await $api.get<Patient[]>(url);

      return {
        data: response.data,
        total: response.data.length
      };
    } catch (error: any) {
      console.error('Error searching patients:', error);

      if (error.response?.status === 404) {
        return {
          data: [],
          message: 'Пациенты по вашему запросу не найдены'
        };
      }

      throw new Error('Ошибка при поиске пациентов');
    }
  }

  static async getAllDoctors(): Promise<SearchResult<Doctor>> {
    try {
      const response = await $api.get<Doctor[]>('/doctors');

      return {
        data: response.data,
        total: response.data.length
      };
    } catch (error: any) {
      console.error('Error getting all doctors:', error);
      throw new Error('Ошибка при получении списка докторов');
    }
  }

  static async getAllPatients(): Promise<SearchResult<Patient>> {
    try {
      const response = await $api.get<Patient[]>('/patients');

      return {
        data: response.data,
        total: response.data.length
      };
    } catch (error: any) {
      console.error('Error getting all patients:', error);
      throw new Error('Ошибка при получении списка пациентов');
    }
  }

  static async searchDoctorsBySpecialization(specialization: string): Promise<SearchResult<Doctor>> {
    try {
      const response = await $api.get<Doctor[]>(`/doctors/search?specialization=${encodeURIComponent(specialization)}`);

      return {
        data: response.data,
        total: response.data.length
      };
    } catch (error: any) {
      console.error('Error searching doctors by specialization:', error);

      if (error.response?.status === 404) {
        return {
          data: [],
          message: `Докторы со специализацией "${specialization}" не найдены`
        };
      }

      throw new Error('Ошибка при поиске докторов по специализации');
    }
  }

}

export default SearchService;
