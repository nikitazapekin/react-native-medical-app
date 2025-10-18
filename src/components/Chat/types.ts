import type { ImageSourcePropType } from "react-native";

export interface MessagesTypes {
  messages: { id: number; from: string; to: string; text: string; time: string ,

    avatar: ImageSourcePropType,
  }[];
}
