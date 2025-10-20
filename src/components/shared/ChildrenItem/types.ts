import type { ImageSourcePropType } from "react-native";

export interface ChildrenItemProps {
  item: {
    id: string;
    img: ImageSourcePropType;
    alt: string;
    name: string;
    age: string;
    gender: string;
  };
}
// { id: "1", img: Children, alt: "Children", name: "Ваня", age: "11", gender: "Мужской" },
