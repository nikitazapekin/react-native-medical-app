import { View } from "react-native";

import MessageItem from "../shared/MessageItem";

import { styles } from "./styled";
import type { MessagesTypes } from "./types";

const Chat = ({ messages , currentUserId }: MessagesTypes) => {

  console.log("MESSAGES" , messages);

  return (
    <View style={styles.wrapper}>
      {messages.map((item) => (
        <MessageItem item={item} currentUserId={currentUserId} />
      ))}
    </View>
  );
};

export default Chat;
