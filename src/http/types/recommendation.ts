export interface Recommendation {
  id: number;
  category: string;
  title: string;
  date: string;
  fullDescription: string;
  imagePath: string;
  createdAt: string;
}

export interface RecommendationResponse {
  id: number;
  category: string;
  title: string;
  date: string;
  fullDescription: string;
  imagePath: string;
  createdAt: string;
}

export interface RecommendationRequest {
  category: string;
  title: string;
  date: string;
  fullDescription: string;
  imagePath: string;
}
