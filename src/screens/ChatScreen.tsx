
import React, { useEffect, useRef,useState } from "react";
import { Alert,ScrollView, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {   type RouteProp } from "@react-navigation/native";
import { Client } from '@stomp/stompjs';
import { StatusBar } from "expo-status-bar";
import SockJS from 'sockjs-client';

import Avatar from "../assets/mockPhotos/Avatar.png";

import { styles } from "./styles";

import Chat from "@/components/Chat";
import ChatKeypad from "@/components/ChatKeypad";
import Header from "@/components/shared/Header";
import type {   RootStackParamList } from "@/navigation/types";

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
}

interface UserEditChildrenProps {
  route: RouteProp<RootStackParamList, 'Chat'>;
}

interface WebSocketMessage {
  type: string;
  chatId?: number;
  chatType?: string;
  message?: string;
  from?: string;
  senderId?: number;
  receiverId?: number;
  patientId?: number;
  doctorId?: number;
}

export default function ChatScreen({ route }: UserEditChildrenProps) {
  const { id: recipientId, chatId } = route.params || {};

  const [userData, setUserData] = useState<UserData | null>(null);

  const [messages, setMessages] = useState<Message[]>([]);
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  console.log("ChatScreen initialized with recipientId:", recipientId, "chatId:", chatId);

  const getStoredUserData = async (): Promise<UserData> => {
    try {
      const email = await AsyncStorage.getItem('userEmail');
      const id = await AsyncStorage.getItem('userId');
      const role = await AsyncStorage.getItem('userRole');

      return { email, id, role };
    } catch  {

      return { email: null, id: null, role: null };
    }
  };

  const initializeWebSocket = (userData: UserData) => {
    console.log('Initializing WebSocket connection with chatId:', chatId);

    const client = new Client({
      webSocketFactory: () => new SockJS('http://192.168.1.14:7081/ws-chat'),
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

        client.subscribe('/user/queue/messages', (msg: any) => {
          console.log('Received private message:', msg.body);
          const newMessage = JSON.parse(msg.body);

          handleIncomingMessage(newMessage);
        });

        if (chatId && userData.role) {
          const chatType = userData.role === 'DOCTOR' ? 'doctor' : 'user';
          const messageDestination = `/topic/chat/${chatId}/${chatType}`;

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

    const newMessage: Message = {
      id: messageData.id || Date.now(),
      from: messageData.senderId,
      to: Number(userData?.id),
      text: messageData.message,
      time: new Date(messageData.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      avatar: Avatar,
      sender: messageData.from
    };

    console.log('Adding message to state:', newMessage);
    setMessages(prev => [...prev, newMessage]);

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
    const isDoctor = userData.role === 'DOCTOR';

    const patientId = isDoctor ? recipientUserId : currentUserId;
    const doctorId = isDoctor ? currentUserId : recipientUserId;
    const chatType = isDoctor ? 'doctor' : 'user';
    const senderType = isDoctor ? 'doctor' : 'patient';

    const message: WebSocketMessage = {
      type: 'chat_message',
      chatId: chatId,
      chatType: chatType,
      message: text.trim(),
      from: senderType,
      senderId: currentUserId,
      receiverId: recipientUserId,
      patientId: patientId,
      doctorId: doctorId
    };

    console.log('Publishing message to WebSocket:', message);

    stompClient.publish({
      destination: '/app/chat.sendMessage',
      body: JSON.stringify(message)
    });

    const tempMessage: Message = {
      id: Date.now(),
      from: currentUserId,
      to: recipientUserId,
      text: text.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      avatar: Avatar,
      sender: senderType
    };

    console.log('Adding temporary message to state:', tempMessage);
    setMessages(prev => [...prev, tempMessage]);

    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  useEffect(() => {
    const loadUserData = async () => {
      try {

        const data = await getStoredUserData();

        setUserData(data);

      } catch (error) {
        console.error("Failed to load user data:", error);
      }
    };

    loadUserData().catch(()=> Alert.alert("Error"));
  }, []);

  useEffect(() => {
    if (userData?.id && chatId) {
      console.log('User data and chatId available, initializing WebSocket');
      initializeWebSocket(userData);
    } else {
      console.log('Waiting for user data and chatId:', {
        hasUserData: !!userData?.id,
        hasChatId: !!chatId
      });
    }

    return () => {
      if (stompClient) {

        stompClient.deactivate().catch(()=> Alert.alert("error"));
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
      </View>

      <ScrollView
        ref={scrollViewRef}
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
      >
        <Chat
          messages={messages}
          currentUserId={userData?.id}
        />
      </ScrollView>

      <ChatKeypad
        onSendMessage={handleSendMessage}
        disabled={!isConnected || !chatId}
      />

      <StatusBar style="auto" />
    </View>
  );
}
