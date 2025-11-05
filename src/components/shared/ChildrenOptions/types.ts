import type { ImageSourcePropType } from "react-native";

import type { ChildFull } from "@/http/types/childFull";

export interface ListItemProps {
  item: {
    text: string;
    icon: ImageSourcePropType;
    alt: string;
    id: number;
  };
  id: string
}

export interface ChildrenOptionsProps {
  children: ChildFull
}
