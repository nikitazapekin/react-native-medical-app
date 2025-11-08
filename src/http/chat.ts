
import $api from './api';

class ChatService {
  static async startChat(patientId: number, doctorId: number): Promise<number> {
    try {
      console.log('Starting chat with patientId:', patientId, 'doctorId:', doctorId);

      const response = await $api.post<number>(
        `/chat/start?patientId=${patientId}&doctorId=${doctorId}`
      );

      console.log('Chat started successfully, chatId:', response.data);

      return response.data;
    } catch (error: any) {
      console.error('Error starting chat:', error);

      if (error.name === 'SESSION_EXPIRED') {
        throw new Error('SESSION_EXPIRED');
      } else if (error.response?.status === 401) {
        throw new Error('Authentication failed. Please login again.');
      } else if (error.response?.status === 404) {
        throw new Error('User not found');
      } else {
        throw new Error('Failed to start chat');
      }
    }
  }

  static async getUserChats(patientId: number) {
    try {
      const response = await $api.get(`/chat/user/${patientId}`);

      return response.data;
    } catch (error: any) {
      console.error('Error getting user chats:', error);

      if (error.name === 'SESSION_EXPIRED') {
        throw new Error('SESSION_EXPIRED');
      }

      throw new Error('Failed to get user chats');
    }
  }

  static async getDoctorChats(doctorId: number) {
    try {
      const response = await $api.get(`/chat/doctor/${doctorId}`);

      return response.data;
    } catch (error: any) {
      console.error('Error getting doctor chats:', error);

      if (error.name === 'SESSION_EXPIRED') {
        throw new Error('SESSION_EXPIRED');
      }

      throw new Error('Failed to get doctor chats');
    }
  }

  static async getUserChatMessages(chatId: number) {
    try {
      const response = await $api.get(`/chat/user/${chatId}/messages`);

      return response.data;
    } catch (error: any) {
      console.error('Error getting user chat messages:', error);

      if (error.name === 'SESSION_EXPIRED') {
        throw new Error('SESSION_EXPIRED');
      }

      throw new Error('Failed to get chat messages');
    }
  }

  static async getDoctorChatMessages(chatId: number) {
    try {
      const response = await $api.get(`/chat/doctor/${chatId}/messages`);

      return response.data;
    } catch (error: any) {
      console.error('Error getting doctor chat messages:', error);

      if (error.name === 'SESSION_EXPIRED') {
        throw new Error('SESSION_EXPIRED');
      }

      throw new Error('Failed to get chat messages');
    }
  }
}

export default ChatService;
