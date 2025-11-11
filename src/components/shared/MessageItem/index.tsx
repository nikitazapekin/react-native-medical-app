import { useEffect, useState } from "react";
import type { ImageSourcePropType } from "react-native";
import { Alert, Image, Text, View } from "react-native";
import Logo from "@assets/Logo.png";

import { styles } from "./styled";
import type { MessageTypes } from "./types";

import type { UserProfile } from "@/http/types/user";
import UserService from "@/http/user";

const MessageItem = ({ item, currentUserId }: MessageTypes) => {
  const isMyMessage = String(item.from) === currentUserId;
  const [user, setUser] = useState<UserProfile>();

  useEffect(() => {
    const handleGet = async () => {
      const resp = await UserService.getUserById(item.from);

      console.log("ID", item.id, "rr");
      console.log(resp.avatar);
      setUser(resp);
    };

    handleGet().catch(()=>Alert.alert("err"));
  }, [item.from]);

  const getAvatarSource = (): ImageSourcePropType => {
    const avatar = user?.avatar || item.avatar;

    if (typeof avatar === 'number') {
      return avatar;
    }

    if (typeof avatar === 'string') {

      return { uri: avatar };

    }

    return Logo;

  };

  return (
    <View style={[styles.wrapper, isMyMessage && styles.myWrapper]}>
      <View style={[styles.card, isMyMessage && styles.myCard]}>
        <View style={styles.main}>
          <Image
            resizeMode="contain"
            style={styles.logo}
            source={getAvatarSource()}
            alt="icon"
          />

          <View style={styles.content}>
            <Text style={styles.author}>
              {user?.firstName}
            </Text>
            <Text style={styles.text}>{item.text}</Text>
          </View>

          <Text style={styles.time}>{item.time}</Text>
        </View>
      </View>
    </View>
  );
};

export default MessageItem;
