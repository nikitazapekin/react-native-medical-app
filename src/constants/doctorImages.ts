import type { ImageSourcePropType } from "react-native";
import DefaultDoctorAvatar from "@assets/mockPhotos/doctorDefault.png";

export const doctorImageMap: Record<string, ImageSourcePropType> = {
  "doctorDefault.png": DefaultDoctorAvatar,
  "default": DefaultDoctorAvatar,
};

export function getDoctorAvatar(avatarPath: string | null | undefined): ImageSourcePropType {
  if (!avatarPath) {
    return doctorImageMap["default"];
  }

  if (avatarPath.startsWith("http://") || avatarPath.startsWith("https://")) {
    return { uri: avatarPath };
  }

  return doctorImageMap[avatarPath] || doctorImageMap["default"];
}

