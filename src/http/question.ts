import type {  QuestionRequest,QuestionResponse } from './types/survey';
import $api from './api';

class QuestionService {
  static async getAllQuestions(): Promise<QuestionResponse[]> {
    try {
      const response = await $api.get<QuestionResponse[]>('/questions');

      return response.data;
    } catch (error) {
      console.error('Error fetching questions:', error);
      throw new Error('Failed to get questions list');
    }
  }

  static async getQuestionById(id: number): Promise<QuestionResponse> {
    try {
      const response = await $api.get<QuestionResponse>(`/questions/${id}`);

      return response.data;
    } catch (error) {
      console.error(`Error fetching question ${id}:`, error);
      throw new Error('Failed to get question information');
    }
  }

  static async getQuestionsBySurveyId(surveyId: number): Promise<QuestionResponse[]> {
    try {
      const response = await $api.get<QuestionResponse[]>(`/questions/survey/${surveyId}`);

      return response.data;
    } catch (error) {
      console.error(`Error fetching questions for survey ${surveyId}:`, error);
      throw new Error('Failed to get questions for survey');
    }
  }

  static async createQuestion(questionData: QuestionRequest): Promise<QuestionResponse> {
    try {
      console.log('Creating question with data:', questionData);
      const response = await $api.post<QuestionResponse>('/questions', questionData);

      console.log('Question creation successful');

      return response.data;
    } catch (error) {
      console.error('Error creating question:', error);
      throw new Error('Failed to create question');
    }
  }

  static async createQuestionForSurvey(surveyId: number, questionData: Omit<QuestionRequest, 'surveyId'>): Promise<QuestionResponse> {
    try {
      console.log(`Creating question for survey ${surveyId} with data:`, questionData);
      const response = await $api.post<QuestionResponse>(`/questions/survey/${surveyId}`, questionData);

      console.log('Question creation for survey successful');

      return response.data;
    } catch (error) {
      console.error(`Error creating question for survey ${surveyId}:`, error);
      throw new Error('Failed to create question for survey');
    }
  }

  static async updateQuestion(id: number, questionData: Partial<QuestionRequest>): Promise<QuestionResponse> {
    try {
      console.log(`Updating question ${id} with data:`, questionData);
      const response = await $api.put<QuestionResponse>(`/questions/${id}`, questionData);

      console.log('Question update successful');

      return response.data;
    } catch (error) {
      console.error(`Error updating question ${id}:`, error);
      throw new Error('Failed to update question');
    }
  }

  static async deleteQuestion(id: number): Promise<void> {
    try {
      console.log(`Deleting question ${id}`);
      await $api.delete(`/questions/${id}`);
      console.log('Question deletion successful');
    } catch (error) {
      console.error(`Error deleting question ${id}:`, error);
      throw new Error('Failed to delete question');
    }
  }
}

export default QuestionService;
