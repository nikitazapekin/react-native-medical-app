
export interface Survey {
  id: number;
  image: string;
  title: string;
  category: string;
  createdAt: string;
  questions?: Question[];
}

export interface Question {
  id: number;
  surveyId: number;
  title: string;
  questions: string[];
  image: string;
  createdAt: string;
}

export interface Advice {
  id: number;
  type: string;
  items: string;
  recommendations: string[];
  createdAt: string;
}

export interface SurveyResponse {
  id: number;
  image: string;
  title: string;
  category: string;
  createdAt: string;
  questions?: QuestionResponse[];
}

export interface QuestionResponse {
  id: number;
  surveyId: number;
  title: string;
  questions: string[];
  image: string;
  createdAt: string;
}

export interface AdviceResponse {
  id: number;
  type: string;
  items: string;
  recommendations: string[];
  createdAt: string;
}

export interface SurveyRequest {
  image: string;
  title: string;
  category: string;
}

export interface QuestionRequest {
  surveyId: number;
  title: string;
  questions: string[];
  image: string;
}

export interface AdviceRequest {
  type: string;
  items: string;
  recommendations: string[];
}
