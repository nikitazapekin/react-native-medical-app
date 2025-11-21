import type { ImageSourcePropType } from "react-native";
import RecomendationImage from "@assets/mockPhotos/recommendation2.jpg";
import SleepRecommendationImage from "@assets/mockPhotos/recommendation4.jpg"

export const recommendationImageMap: Record<string, ImageSourcePropType> = {
  "recommendation2.jpg": RecomendationImage,
  "recommendation4.jpg": SleepRecommendationImage,
  "default": RecomendationImage, 
};

export function getRecommendationImage(imagePath: string | null | undefined): ImageSourcePropType {
  if (!imagePath) {
    return recommendationImageMap["default"];
  }

  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return { uri: imagePath };
  }

  return recommendationImageMap[imagePath] || recommendationImageMap["default"];
}

