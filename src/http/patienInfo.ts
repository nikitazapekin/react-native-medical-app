
import type {Patient } from './types/personInfo';
import $api from './api';

class PersonInfoService {

  static async getCurrentPatient(): Promise<Patient> {
    try {
      const response = await $api.get<Patient>('/patients/me');

      return response.data;
    } catch  {

      throw new Error(   'Failed to get patient information');
    }
  }

  static async updatePatientAvatar(avatarUrl: string): Promise<Patient> {
    try {
      const response = await $api.put<Patient>('/patients/updateAvatar', {
        avatar: avatarUrl
      });

      return response.data;
    } catch (error) {
      console.error('Error updating avatar:', error);
      throw new Error('Failed to update avatar');
    }
  }

  static async getPatientById(id: number): Promise<Patient> {
    try {
      const response = await $api.get<Patient>(`/patients/${id}`);

      return response.data;
    } catch   {

      throw new Error(  'Failed to get patient information');
    }
  }

  static async updatePatient(patientData: Partial<Patient>): Promise<Patient> {
    try {
      console.log('Updating patient with data:', patientData);
      const response = await $api.put<Patient>('/patients/me', patientData);

      console.log('Patient update successful');

      return response.data;
    } catch  {

      throw new Error('Failed to update patient information');
    }
  }

  static async getAllPatients(): Promise<Patient[]> {
    try {
      const response = await $api.get<Patient[]>('/patients');

      return response.data;
    } catch   {

      throw new Error(  'Failed to get patients list');
    }
  }
}

export default PersonInfoService;
