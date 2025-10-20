import type { ImageSourcePropType } from "react-native";

export interface ListItemProps {
  item: {

    text: string,
    icon: ImageSourcePropType,
    alt: string,
    id: number

  }
}
