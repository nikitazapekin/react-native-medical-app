import type { ImageSourcePropType } from "react-native";

export interface Doctor {
  id: number;
  name: string;
  spec: string;
  availability: string;
  avatar: ImageSourcePropType;
  experience: string;
  education: string;
  specialization: string;
  achievements: string[];
  qualificationImprovement: string[];
  rating: number;
}

export interface UserCatalogDoctorsProps {
  serviceName?: string;
  childId?: number;
}
