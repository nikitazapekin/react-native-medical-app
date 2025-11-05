import type { ImageSourcePropType } from "react-native";

export interface DoctorCardProps {
  name: string;
  spec: string;
  availability: string;
  avatar: ImageSourcePropType;
}
