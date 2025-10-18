import React from 'react';
import {   ScrollView,  View } from "react-native";
import { StatusBar } from "expo-status-bar";

import Avatar from "../assets/mockPhotos/Avatar.png";

import { styles } from "./styles";

import Chat from '@/components/Chat';
import ChatKeypad from '@/components/ChatKeypad';
import Header from '@/components/shared/Header';

const mockMessages = [
  {id:1, from: "me",  to: "user", text: "Как проявляется боль?", time: "12:45", avatar: Avatar },
  {id:2, from: "user",  to: "me", text: "Сильно болит", time: "12:45", avatar:Avatar},

  {id:3, from: "me",  to: "user", text: "Как проявляется боль? Как проявляется боль? Как проявляется боль? Как проявляется боль? Как проявляется боль? Как проявляется боль?", time: "12:45", avatar: Avatar },
  {id:4, from: "user",  to: "me", text: "Сильно болит Сильно болит Сильно болит Сильно болит", time: "12:45", avatar:Avatar},

  {id:5, from: "me",  to: "user", text: "Как проявляется боль?", time: "12:45", avatar: Avatar },
  {id:6, from: "user",  to: "me", text: "Сильно болит", time: "12:45", avatar:Avatar},

  {id:7, from: "me",  to: "user", text: "Как проявляется боль? Как проявляется боль? Как проявляется боль? Как проявляется боль? Как проявляется боль? Как проявляется боль?", time: "12:45", avatar: Avatar },
  {id:8, from: "user",  to: "me", text: "Сильно болит Сильно болит Сильно болит Сильно болит", time: "12:45", avatar:Avatar}

];

export default function ChatScreen( ) {

  return (
    <View style={styles.container}>

      <Header title='Чат' isAuthenticated={true} />
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <Chat
          messages={mockMessages}
        />

      </ScrollView>

      <ChatKeypad />

      <StatusBar style="auto" />
    </View>
  );
}
