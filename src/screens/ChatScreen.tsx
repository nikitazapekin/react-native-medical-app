import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Alert, ScrollView, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { type RouteProp } from "@react-navigation/native";
import { Client } from '@stomp/stompjs';
import { StatusBar } from "expo-status-bar";
import SockJS from 'sockjs-client';

import Avatar from "../assets/mockPhotos/Avatar.png";
import ChatService, { type MessageDTO } from "../http/chat";

import { styles } from "./styles";

import Chat from "@/components/Chat";
import ChatKeypad from "@/components/ChatKeypad";
import Header from "@/components/shared/Header";
import type { RootStackParamList } from "@/navigation/types";

interface UserData {
  email: string | null;
  id: string | null;
  role: string | null;
}

interface Message {
  id: number;
  from: number;
  to: number;
  text: string;
  time: string;
  avatar: any;
  sender?: string;
  isServerMessage?: boolean;
}

interface UserEditChildrenProps {
  route: RouteProp<RootStackParamList, 'Chat'>;
}

interface WebSocketMessage {
  type: string;
  chatId?: number;
  message?: string;
  senderId?: number;
  receiverId?: number;
  patientId?: number;
  doctorId?: number;
  authorId?: number;
}

export default function ChatScreen({ route }: UserEditChildrenProps) {
  const { id: recipientId, chatId } = route.params || {};

  console.log("ChatScreen initialized with recipientId:", recipientId, "chatId:", chatId);

  const [userData, setUserData] = useState<UserData | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const [tempMessageIds, setTempMessageIds] = useState<Set<number>>(new Set());
  const scrollViewRef = useRef<ScrollView>(null);

  const getStoredUserData = async (): Promise<UserData> => {
    try {
      const email = await AsyncStorage.getItem('userEmail');
      const id = await AsyncStorage.getItem('userId');
      const role = await AsyncStorage.getItem('userRole');

      console.log('User data from storage:', { email, id, role });

      return { email, id, role };
    } catch (error) {
      console.error('Error getting user data:', error);

      return { email: null, id: null, role: null };
    }
  };

  const loadChatHistory = async () => {
    if (!chatId) {
      console.log('Cannot load history: missing chatId');

      return;
    }

    try {
      setIsLoadingHistory(true);
      console.log('Loading chat history for chatId:', chatId);

      const history: MessageDTO[] = await ChatService.getChatHistory(chatId);

      console.log('Raw history from API:', history);

      const transformedMessages: Message[] = history.map(msg => ({
        id: msg.id,
        from: msg.senderId,
        to: msg.receiverId,
        text: msg.message,
        time: new Date(msg.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        avatar: Avatar,
        isServerMessage: true
      }));

      console.log('Transformed messages:', transformedMessages);
      setMessages(transformedMessages);
    } catch (error: any) {
      console.error('Error loading chat history:', error);
      Alert.alert("Ошибка", "Не удалось загрузить историю сообщений: " + error.message);
    } finally {
      setIsLoadingHistory(false);
    }
  };

  const initializeWebSocket = () => {
    console.log('Initializing WebSocket connection with chatId:', chatId);

    const client = new Client({
      webSocketFactory: () => new SockJS('http://192.168.1.14:7082/ws-chat'),
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,

      onConnect: () => {
        console.log('WebSocket connected successfully');
        setIsConnected(true);

        client.subscribe('/user/queue/errors', (message: any) => {
          console.log('Received error message:', message.body);
          const error = JSON.parse(message.body);

          Alert.alert('Error', error.message);
        });

        if (chatId) {
          const messageDestination = `/topic/chat/${chatId}`;

          console.log('Subscribing to messages:', messageDestination);

          client.subscribe(messageDestination, (msg: any) => {
            console.log('Received new message in chat:', msg.body);
            const newMessage = JSON.parse(msg.body);

            handleIncomingMessage(newMessage);
          });
        }
      },

      onDisconnect: () => {
        console.log('WebSocket disconnected');
        setIsConnected(false);
      },

      onStompError: (frame: any) => {
        console.error('WebSocket STOMP error:', frame);
      }
    });

    client.activate();
    setStompClient(client);
    console.log('WebSocket client activated');
  };

  const handleIncomingMessage = (messageData: any) => {
    console.log('Processing incoming message:', messageData);

    const isDuplicate = messages.some(msg =>
      msg.id === messageData.id ||
      (msg.text === messageData.message &&
       Math.abs(new Date(msg.time).getTime() - new Date(messageData.time).getTime()) < 1000)
    );

    if (isDuplicate) {
      console.log('Duplicate message detected, skipping:', messageData);

      return;
    }

    const newMessage: Message = {
      id: messageData.id || Date.now(),
      from: messageData.senderId,
      to: messageData.receiverId,
      text: messageData.message,
      time: new Date(messageData.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      avatar: Avatar,
      isServerMessage: true
    };

    console.log('Adding incoming message to state:', newMessage);
    setMessages(prev => {
      const filteredMessages = prev.filter(msg => !tempMessageIds.has(msg.id));

      return [...filteredMessages, newMessage];
    });

    if (tempMessageIds.size > 0) {
      setTempMessageIds(new Set());
    }

    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const handleSendMessage = (text: string) => {
    console.log('Sending message:', text);

    if (!text.trim()) {
      Alert.alert('Error', 'Message cannot be empty');

      return;
    }

    if (!userData?.id) {
      Alert.alert('Error', 'User not identified');

      return;
    }

    if (!stompClient || !isConnected) {
      Alert.alert('Error', 'WebSocket not connected');

      return;
    }

    if (!chatId) {
      Alert.alert('Error', 'Chat ID not found');

      return;
    }

    const currentUserId = Number(userData.id);
    const recipientUserId = Number(recipientId);

    const message: WebSocketMessage = {
      type: 'chat_message',
      chatId: chatId,
      message: text.trim(),
      senderId: currentUserId,
      receiverId: recipientUserId
    };

    console.log('Publishing message to WebSocket:', message);

    const tempMessageId = Date.now();
    const tempMessage: Message = {
      id: tempMessageId,
      from: currentUserId,
      to: recipientUserId,
      text: text.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      avatar: Avatar,
      isServerMessage: false
    };

    console.log('Adding temporary message to state:', tempMessage);
    setMessages(prev => [...prev, tempMessage]);
    setTempMessageIds(prev => new Set(prev).add(tempMessageId));

    stompClient.publish({
      destination: '/app/chat.sendMessage',
      body: JSON.stringify(message)
    });

    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const data = await getStoredUserData();

        setUserData(data);
        console.log('User data set:', data);
      } catch (error) {
        console.error("Failed to load user data:", error);
      }
    };

    loadUserData().catch(()=> Alert.alert("Error"));
  }, []);

  useEffect(() => {
    if (userData?.id && chatId) {
      console.log('User data and chatId available, loading history and initializing WebSocket');
      loadChatHistory().then(() => {
        console.log('History loaded, initializing WebSocket');
        initializeWebSocket();
      }).catch(error => {
        console.error('Error in initialization sequence:', error);
      });
    } else {
      console.log('Waiting for user data and chatId:', {
        hasUserData: !!userData?.id,
        hasChatId: !!chatId
      });
    }

    return () => {
      if (stompClient) {
        console.log('Cleaning up WebSocket connection');
        stompClient.deactivate().catch(()=> Alert.alert("Error"));
      }
    };
  }, [userData, chatId]);

  return (
    <View style={styles.container}>
      <Header title="Chat" isAuthenticated={true} />

      <View style={{ padding: 10, backgroundColor: '#f5f5f5' }}>
        <Text style={{ color: isConnected ? 'green' : 'red', fontSize: 12 }}>
          Status: {isConnected ? 'CONNECTED' : 'DISCONNECTED'}
          {chatId ? ` | Chat ID: ${chatId}` : ' | No chat ID'}
        </Text>
        <Text style={{ fontSize: 10, color: 'blue' }}>
          User ID: {userData?.id} | Role: {userData?.role} | Recipient: {recipientId}
        </Text>
        <Text style={{ fontSize: 10, color: 'purple' }}>
          Messages count: {messages.length} | Loading: {isLoadingHistory ? 'YES' : 'NO'}
        </Text>
      </View>

      <ScrollView
        ref={scrollViewRef}
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        onContentSizeChange={() => {
          scrollViewRef.current?.scrollToEnd({ animated: true });
        }}
      >
        {isLoadingHistory ? (
          <View style={{ padding: 20, alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text>Loading messages...</Text>
          </View>
        ) : (
          <Chat
            messages={messages}
            currentUserId={userData?.id ? String(Number(userData.id)) : undefined}
          />
        )}
      </ScrollView>

      <ChatKeypad
        onSendMessage={handleSendMessage}
        disabled={!isConnected || !chatId || isLoadingHistory}
      />

      <StatusBar style="auto" />
    </View>
  );
}
