import type { ImageSourcePropType } from "react-native";

export interface MessageTypes {
  item: {
    id: number;
    from: number;
    to: number;
    text: string;
    time: string;

    avatar: ImageSourcePropType;
  };
  currentUserId?: string | null;
}
