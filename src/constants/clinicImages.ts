import type { ImageSourcePropType } from "react-native";
import DefaultClinicImage from "@assets/mockPhotos/Clinic.png";

export const clinicImageMap: Record<string, ImageSourcePropType> = {
  "Clinic.png": DefaultClinicImage,
  "default": DefaultClinicImage,
};

export function getClinicImage(imagePath: string | null | undefined): ImageSourcePropType {
  if (!imagePath) {
    return clinicImageMap["default"];
  }

  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return { uri: imagePath };
  }

  return clinicImageMap[imagePath] || clinicImageMap["default"];
}

