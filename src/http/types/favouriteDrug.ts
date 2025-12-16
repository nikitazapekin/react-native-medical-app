export interface FavouriteDrug {
  id: number;
  title: string;
  description: string;
  price: number;
  type: string;
  dosage: string;
  patientId: number;
  createdAt: string;
}

export interface FavouriteDrugRequest {
  title: string;
  description: string;
  price: number;
  type: string;
  dosage: string;
}


