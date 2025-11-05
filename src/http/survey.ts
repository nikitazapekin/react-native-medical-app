import type {   SurveyRequest,SurveyResponse } from './types/survey';
import $api from './api';

class SurveyService {
  static async getAllSurveys(): Promise<SurveyResponse[]> {
    try {
      const response = await $api.get<SurveyResponse[]>('/surveys');

      return response.data;
    } catch (error) {
      console.error('Error fetching surveys:', error);
      throw new Error('Failed to get surveys list');
    }
  }

  static async getSurveyById(id: number): Promise<SurveyResponse> {
    try {
      const response = await $api.get<SurveyResponse>(`/surveys/${id}`);

      return response.data;
    } catch (error) {
      console.error(`Error fetching survey ${id}:`, error);
      throw new Error('Failed to get survey information');
    }
  }

  static async getSurveysByCategory(category: string): Promise<SurveyResponse[]> {
    try {
      const response = await $api.get<SurveyResponse[]>(`/surveys/category/${category}`);

      return response.data;
    } catch (error) {
      console.error(`Error fetching surveys by category ${category}:`, error);
      throw new Error('Failed to get surveys by category');
    }
  }

  static async createSurvey(surveyData: SurveyRequest): Promise<SurveyResponse> {
    try {
      console.log('Creating survey with data:', surveyData);
      const response = await $api.post<SurveyResponse>('/surveys', surveyData);

      console.log('Survey creation successful');

      return response.data;
    } catch (error) {
      console.error('Error creating survey:', error);
      throw new Error('Failed to create survey');
    }
  }

  static async updateSurvey(id: number, surveyData: Partial<SurveyRequest>): Promise<SurveyResponse> {
    try {
      console.log(`Updating survey ${id} with data:`, surveyData);
      const response = await $api.put<SurveyResponse>(`/surveys/${id}`, surveyData);

      console.log('Survey update successful');

      return response.data;
    } catch (error) {
      console.error(`Error updating survey ${id}:`, error);
      throw new Error('Failed to update survey');
    }
  }

  static async deleteSurvey(id: number): Promise<void> {
    try {
      console.log(`Deleting survey ${id}`);
      await $api.delete(`/surveys/${id}`);
      console.log('Survey deletion successful');
    } catch (error) {
      console.error(`Error deleting survey ${id}:`, error);
      throw new Error('Failed to delete survey');
    }
  }
}

export default SurveyService;
