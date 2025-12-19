import React, { useState } from "react";
import { Image,TextInput, TouchableOpacity,View } from "react-native";
import Send from "@assets/chat/Send.png";

import { styles } from "./styled";

interface ChatKeypadProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

const ChatKeypad = ({ onSendMessage }: ChatKeypadProps) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) {
      return;
    }

    onSendMessage(message);
    setMessage("");
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.inputWrapper}>
        <TextInput
          style={[styles.input]}
          placeholder="Введите сообщение..."
          placeholderTextColor="#999"
          value={message}
          onChangeText={setMessage}
          multiline
          maxLength={1000}
        />

        <TouchableOpacity
          style={[styles.sendButton]}
          onPress={handleSend}
          disabled={!message.trim()}
        >

          <Image source={Send} style={styles.sendIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatKeypad;
