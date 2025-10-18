import type { ImageSourcePropType } from "react-native";

export interface MessageTypes {
  item: { id: number; from: string; to: string; text: string; time: string ,

    avatar: ImageSourcePropType,
  };
}
