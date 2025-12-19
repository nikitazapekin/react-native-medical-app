import { useEffect, useState } from "react";
import type { ImageSourcePropType } from "react-native";
import {  Alert, Image, Text, View } from "react-native";
import Logo from "@assets/Logo.png";

import { styles } from "./styled";
import type { MessageTypes } from "./types";

import type { UserProfile } from "@/http/types/user";
import UserService from "@/http/user";

const MessageItem = ({ item, currentUserId }: MessageTypes) => {
  const isMyMessage = String(item.from) === currentUserId;
  const [user, setUser] = useState<UserProfile>();
  const [avatarError, setAvatarError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleGet = async () => {
      try {
        setLoading(true);
        setAvatarError(false);
        const resp = await UserService.getUserById(item.from);

        setUser(resp);
      } catch (error) {
        console.error("Error loading user:", error);
        setAvatarError(true);
      } finally {
        setLoading(false);
      }
    };

    handleGet().catch(()=> Alert.alert("err"))
  }, [item.from]);

  const getAvatarSource = (): ImageSourcePropType => {

    if (avatarError) {
      return Logo;
    }

    const avatar = user?.avatar || item.avatar;

    if (typeof avatar === 'number') {
      return avatar;
    }

    if (typeof avatar === 'string' && avatar.trim() !== '') {

      if (avatar.startsWith('http://') || avatar.startsWith('https://') || avatar.startsWith('file://')) {
        return { uri: avatar };
      }

      if (avatar.startsWith('data:image')) {
        return { uri: avatar };
      }
    }

    return Logo;
  };

  const handleAvatarError = () => {
    console.log("Avatar failed to load, using default");
    setAvatarError(true);
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
            onError={handleAvatarError}
            defaultSource={Logo as number}
          />

          <View style={styles.content}>
            <Text style={styles.author}>
              {loading ? "Загрузка..." : user?.firstName || "Пользователь"}
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
