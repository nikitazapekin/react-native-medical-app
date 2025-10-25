
import type {Doctor } from './types/personInfo';
import $api from './api';

class DoctorInfoService {

  static async getCurrentDoctor(): Promise<Doctor> {
    try {
      const response = await $api.get<Doctor>('/doctors/me');

      return response.data;
    } catch {

      throw new Error(  'Failed to get doctor information');
    }
  }

  static async getDoctorById(id: number): Promise<Doctor> {
    try {
      const response = await $api.get<Doctor>(`/doctors/${id}`);

      return response.data;
    } catch  {

      throw new Error( 'Failed to get doctor information');
    }
  }

  static async getAllDoctors(): Promise<Doctor[]> {
    try {
      const response = await $api.get<Doctor[]>('/doctors');

      return response.data;
    } catch  {

      throw new Error(  'Failed to get doctors list');
    }
  }

  static async updateDoctor(doctorData: Partial<Doctor>): Promise<Doctor> {
    try {
      const response = await $api.put<Doctor>('/doctors/me', doctorData);

      return response.data;
    } catch  {

      throw new Error(  'Failed to update doctor information');
    }
  }

  static async updateDoctorAvatar(avatarUrl: string): Promise<Doctor> {
    try {
      const response = await $api.patch<Doctor>('/doctors/me/avatar', { avatar: avatarUrl });

      return response.data;
    } catch  {

      throw new Error(  'Failed to update avatar');
    }
  }

  static async updateSpecialization(specialization: string): Promise<Doctor> {
    try {
      const response = await $api.patch<Doctor>('/doctors/me/specialization', { specialization });

      return response.data;
    } catch {

      throw new Error(  'Failed to update specialization');
    }
  }

  static async updateExperience(experience: number): Promise<Doctor> {
    try {
      const response = await $api.patch<Doctor>('/doctors/me/experience', { experience });

      return response.data;
    } catch  {

      throw new Error(  'Failed to update experience');
    }
  }

  static async updateEducation(education: string[]): Promise<Doctor> {
    try {
      const response = await $api.patch<Doctor>('/doctors/me/education', { education });

      return response.data;
    } catch  {

      throw new Error(  'Failed to update education');
    }
  }

  static async searchDoctorsBySpecialization(specialization: string): Promise<Doctor[]> {
    try {
      const response = await $api.get<Doctor[]>(`/doctors/search?specialization=${encodeURIComponent(specialization)}`);

      return response.data;
    } catch   {

      throw new Error( 'Failed to search doctors');
    }
  }

  static async getTopRatedDoctors(limit: number = 10): Promise<Doctor[]> {
    try {
      const response = await $api.get<Doctor[]>(`/doctors/top?limit=${limit}`);

      return response.data;
    } catch  {

      throw new Error( 'Failed to get top doctors');
    }
  }
}

export default DoctorInfoService;
