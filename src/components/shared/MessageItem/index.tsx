import { Image, Text, View } from "react-native";

import { styles } from "./styled";
import type { MessageTypes } from "./types";

const MessageItem = ({ item , currentUserId}: MessageTypes) => {
  const isMyMessage = String(item.from) === currentUserId;

  return (
    <View style={[styles.wrapper, isMyMessage && styles.myWrapper]}>
      <View style={[styles.card, isMyMessage && styles.myCard]}>
        <View style={styles.main}>
          <Image resizeMode="contain" style={styles.logo} source={item.avatar} alt="icon" />

          <View style={styles.content}>
            <Text style={styles.author}>{item.from}</Text>
            <Text style={styles.text}>{item.text}</Text>
          </View>

          <Text style={styles.time}>{item.time}</Text>
        </View>
      </View>
    </View>
  );
};

export default MessageItem;

/* import { View, Image, Text } from "react-native";
import { MessageTypes } from "./types";
import { styles } from "./styled";

const MessageItem = ({ item }: MessageTypes) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.card}>

      <View style={styles.main}>
        <Image
         resizeMode="contain"
        style={styles.logo}
        source={item.avatar} alt="icon" />

        <View style={styles.content}>
          <Text style={styles.author}>{item.from}</Text>
          <Text style={styles.text}>{item.text}</Text>
        </View>

        <Text style={styles.time}>
          {item.time}
        </Text>
      </View>
      </View>
    </View>
  );
};

export default MessageItem;
 */
