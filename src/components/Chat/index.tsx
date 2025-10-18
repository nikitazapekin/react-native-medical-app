import {   View } from "react-native";

import MessageItem from "../shared/MessageItem";

import { styles } from "./styled";
import type { MessagesTypes } from "./types";

const Chat = ({ messages }: MessagesTypes) => {
  return (
    <View style={styles.wrapper}>

      {messages.map((item) => (
        <MessageItem item={item} />
      ))}
    </View>
  );
};

export default Chat;
