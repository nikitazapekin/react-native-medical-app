import type {  ImageURISource } from "react-native";

export interface DialogItemType {
  item: {

    id: number;
    name: string;
  text: string;
  time: string;
  status: string;
  avatar: string | number | ImageURISource | { uri: string };
}
}
