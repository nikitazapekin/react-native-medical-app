import type { ImageSourcePropType } from "react-native";

export interface ListItemProps {
  item: {
    text: string;
    icon: ImageSourcePropType;
    alt: string;
    id: number;
  };
  id: number | undefined
}

export interface CabinetProps {
  id: number | undefined
}
