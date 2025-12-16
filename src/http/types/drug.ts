export interface Drug {
  id: number;
  title: string;
  shortDescription?: string;
  description: string;
  price: number;
  type: string;
  dosage: string;
  imagePath?: string;
  createdAt: string;
}

export interface DrugRequest {
  title: string;
  shortDescription?: string;
  description: string;
  price: number;
  type: string;
  dosage: string;
  imagePath?: string;
}

export interface DrugSearchParams {
  search?: string;
  sortBy?: 'name' | 'cost' | 'type';
}

