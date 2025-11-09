import type { ImageSourcePropType } from "react-native";

export interface MessagesTypes {
  messages: {
    id: number;
    from: number;
    to: number;
    text: string;
    time: string;

    avatar: ImageSourcePropType;
  }[];
  currentUserId?: string | null;
}
