import type { ImageSourcePropType } from "react-native";

export interface DialogTypes {
  item: {
    id: number;
    name: string;

    text: string;
    time: string;
    status: string;
    avatar: ImageSourcePropType;
  };
}
