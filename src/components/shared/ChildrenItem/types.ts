import type { ImageSourcePropType } from "react-native";

export interface ChildrenItemProps {
  item: {
    id: string;
    img: ImageSourcePropType | string;
    alt: string;
    name: string;
    age: string;
    gender: string;
  };
  openModal?: ()=> void

}
