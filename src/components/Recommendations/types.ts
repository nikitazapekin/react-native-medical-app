export interface Recommendation {
  id: number;
  title: string;
  recommendations: string[];
}
export interface RecommendationsProps {
  title: string;
  description: string;
  recommedations: Recommendation[];
}
