import type { DoctorSpecificUpdate, PatientSpecificUpdate,UserProfile, UserUpdateRequest } from './types/user';
import $api from './api';

class UserService {

  static async getCurrentUser(): Promise<UserProfile> {
    try {
      const response = await $api.get<UserProfile>('/users/me');

      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Failed to get user information'
      );
    }
  }

  static async getUserById(id: number): Promise<UserProfile> {
    try {
      const response = await $api.get<UserProfile>(`/users/${id}`);

      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Failed to get user information'
      );
    }
  }

  static async getUserByEmail(email: string): Promise<UserProfile> {
    try {
      const response = await $api.get<UserProfile>(`/users/email/${email}`);

      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Failed to get user information'
      );
    }
  }

  static async updateUser(userData: UserUpdateRequest): Promise<UserProfile> {
    try {
      const response = await $api.put<UserProfile>('/users/me', userData);

      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Failed to update user information'
      );
    }
  }

  static async updateUserAvatar(avatarUrl: string): Promise<UserProfile> {
    try {
      const response = await $api.patch<UserProfile>('/users/me/avatar', {
        avatar: avatarUrl
      });

      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Failed to update avatar'
      );
    }
  }

  static async updateDoctorInfo(doctorData: DoctorSpecificUpdate): Promise<UserProfile> {
    try {
      const response = await $api.patch<UserProfile>('/users/me/doctor-info', doctorData);

      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Failed to update doctor information'
      );
    }
  }

  static async updatePatientInfo(patientData: PatientSpecificUpdate): Promise<UserProfile> {
    try {
      const response = await $api.patch<UserProfile>('/users/me/patient-info', patientData);

      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Failed to update patient information'
      );
    }
  }

  static async updateSpecialization(specialization: string): Promise<UserProfile> {
    try {
      const response = await $api.patch<UserProfile>('/users/me/specialization', {
        specialization
      });

      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Failed to update specialization'
      );
    }
  }

  static async updateExperience(experience: number): Promise<UserProfile> {
    try {
      const response = await $api.patch<UserProfile>('/users/me/experience', {
        experience
      });

      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Failed to update experience'
      );
    }
  }

  static async updateEducation(education: string[]): Promise<UserProfile> {
    try {
      const response = await $api.patch<UserProfile>('/users/me/education', {
        education
      });

      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Failed to update education'
      );
    }
  }

  static async searchUsers(query: string, role?: string): Promise<UserProfile[]> {
    try {
      const params = new URLSearchParams();

      params.append('query', query);

      if (role) {
        params.append('role', role);
      }

      const response = await $api.get<UserProfile[]>(`/users/search?${params.toString()}`);

      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Failed to search users'
      );
    }
  }

  static async getUsersByRole(role: 'PATIENT' | 'DOCTOR'): Promise<UserProfile[]> {
    try {
      const response = await $api.get<UserProfile[]>(`/users/role/${role}`);

      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || `Failed to get ${role.toLowerCase()}s list`
      );
    }
  }

  static async getAllDoctors(): Promise<UserProfile[]> {
    return this.getUsersByRole('DOCTOR');
  }

  static async getAllPatients(): Promise<UserProfile[]> {
    return this.getUsersByRole('PATIENT');
  }

  static async getTopDoctors(limit: number = 10): Promise<UserProfile[]> {
    try {
      const response = await $api.get<UserProfile[]>(`/users/top-doctors?limit=${limit}`);

      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Failed to get top doctors'
      );
    }
  }

  static async searchDoctorsBySpecialization(specialization: string): Promise<UserProfile[]> {
    try {
      const response = await $api.get<UserProfile[]>(
        `/users/doctors/search?specialization=${encodeURIComponent(specialization)}`
      );

      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Failed to search doctors by specialization'
      );
    }
  }

  static isDoctor(user: UserProfile): boolean {
    return user.role === 'DOCTOR';
  }

  static isPatient(user: UserProfile): boolean {
    return user.role === 'PATIENT';
  }

  static getFullName(user: UserProfile): string {
    return `${user.firstName} ${user.lastName}`;
  }

  static getSpecialization(user: UserProfile): string {
    return user.specialization || 'Не указана';
  }

  static getRate(user: UserProfile): number {
    return user.rate || 0;
  }
}

export default UserService;
