import $api from './api';

export interface ChatDTO {
  id: number;
  chatName: string;
  lastMessage?: string;
  lastMessageTime?: string;
  avatar?: string;
  participantId: number;
  participantName?: string;
  patientId: number;
  doctorId: number;
  authorId: number;
  createdAt: string;
}

export interface MessageDTO {
  id: number;
  message: string;
  from?: string;
  senderId: number;
  receiverId: number;
  time: string;
  isRead: boolean;
  chatId: number;
  type?: string;
}

class ChatService {
  static async startChat(patientId: number, doctorId: number, authorId: number): Promise<number> {
    try {
      console.log('Starting chat with patientId:', patientId, 'doctorId:', doctorId, 'authorId:', authorId);
      const response = await $api.post<number>(
        `/chat/start?patientId=${patientId}&doctorId=${doctorId}&authorId=${authorId}`
      );

      console.log('Chat started successfully, chatId:', response.data);

      return response.data;
    } catch (error: any) {
      console.error('Error starting chat:', error);
      throw new Error(error.response?.data?.message || 'Failed to start chat');
    }
  }

  static async getChatHistory(chatId: number): Promise<MessageDTO[]> {
    try {
      console.log('Getting chat history for chatId:', chatId);
      const response = await $api.get<MessageDTO[]>(`/chat/${chatId}/messages`);

      console.log('Chat history retrieved successfully, count:', response.data.length);

      const messages = response.data.map(msg => ({
        ...msg,
        time: new Date(msg.time).toISOString()
      }));

      return messages;
    } catch (error: any) {
      console.error('Error getting chat history:', error);
      throw new Error(error.response?.data?.message || 'Failed to get chat history');
    }
  }

  static async getUserChats(userId: number): Promise<ChatDTO[]> {
    try {
      console.log('Getting user chats for userId:', userId);
      const response = await $api.get<ChatDTO[]>(`/chat/user/${userId}`);

      const chats = response.data.map(chat => ({
        ...chat,
        lastMessageTime: chat.lastMessageTime ? new Date(chat.lastMessageTime).toISOString() : undefined,
        createdAt: new Date(chat.createdAt).toISOString()
      }));

      return chats;
    } catch (error: any) {
      console.error('Error getting user chats:', error);
      throw new Error(error.response?.data?.message || 'Failed to get user chats');
    }
  }

  static async getDoctorChats(doctorId: number): Promise<ChatDTO[]> {
    try {
      console.log('Getting doctor chats for doctorId:', doctorId);
      const response = await $api.get<ChatDTO[]>(`/chat/doctor/${doctorId}`);

      const chats = response.data.map(chat => ({
        ...chat,
        lastMessageTime: chat.lastMessageTime ? new Date(chat.lastMessageTime).toISOString() : undefined,
        createdAt: new Date(chat.createdAt).toISOString()
      }));

      return chats;
    } catch (error: any) {
      console.error('Error getting doctor chats:', error);
      throw new Error(error.response?.data?.message || 'Failed to get doctor chats');
    }
  }

  static async getMyChats(userId: number, userRole: string): Promise<ChatDTO[]> {
    try {
      console.log('Getting chats for userId:', userId, 'role:', userRole);

      if (userRole === 'DOCTOR') {
        return this.getDoctorChats(userId);
      } else {
        return this.getUserChats(userId);
      }
    } catch (error: any) {
      console.error('Error getting chats:', error);
      throw new Error('Failed to get chats');
    }
  }
}

export default ChatService;
