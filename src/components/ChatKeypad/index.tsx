import { Image,TextInput, View } from "react-native";

import { styles } from "./styled";

import { chatIcons } from "@/constants";

const ChatKeypad = () => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Введите сообщение..."
          placeholderTextColor="#999"
        />
        <View style={styles.smileyWrapper}>
          {chatIcons.map((item) => (
            <Image
              key={item.id}
              source={item.icon} alt={item.alt} />
          ))}
        </View>
      </View>
    </View>
  );
};

export default ChatKeypad;
