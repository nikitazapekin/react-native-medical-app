
import $api from './api';

export interface ChatDTO {
  id: number;
  chatName: string;
  lastMessage?: string;
  lastMessageTime?: string;
  avatar?: string;
  participantId: number;
  participantName?: string;
}

 export interface MessageDTO {
  id: number;
  message: string;
  from: string;
  senderId: number;
  time: string;
  isRead: boolean;
  chatId: number;
  type: string;
}


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

  static async getMyChats(userId: number, userRole: string): Promise<ChatDTO[]> {
    try {
      console.log('Getting chats for userId:', userId, 'role:', userRole);

      const response = await $api.get<ChatDTO[]>(
        `/chat/my-chats?userId=${userId}&userRole=${userRole}`
      );

      console.log('Chats retrieved successfully, count:', response.data.length);

      return response.data;
    } catch (error: any) {
      console.error('Error getting chats:', error);

      if (error.name === 'SESSION_EXPIRED') {
        throw new Error('SESSION_EXPIRED');
      } else if (error.response?.status === 401) {
        throw new Error('Authentication failed. Please login again.');
      } else {
        throw new Error('Failed to get chats');
      }
    }
  }


    static async getChatHistory(chatId: number, userRole: string): Promise<MessageDTO[]> {
    try {
      console.log('Getting chat history for chatId:', chatId, 'role:', userRole);

      let response;
      if (userRole === 'DOCTOR') {
        response = await $api.get<MessageDTO[]>(`/chat/doctor/${chatId}/messages`);
      } else {
        response = await $api.get<MessageDTO[]>(`/chat/user/${chatId}/messages`);
      }
      
      console.log('Chat history retrieved successfully, count:', response.data.length);
      return response.data;
    } catch (error: any) {
      console.error('Error getting chat history:', error);
      
      if (error.name === 'SESSION_EXPIRED') {
        throw new Error('SESSION_EXPIRED');
      } else if (error.response?.status === 401) {
        throw new Error('Authentication failed. Please login again.');
      } else {
        throw new Error('Failed to get chat history');
      }
    }
  }



}

export default ChatService;
