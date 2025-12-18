export interface FavouriteDrug {
  id: number;
  drugId: number;
  title: string;
  shortDescription?: string;
  description: string;
  price: number;
  type: string;
  dosage: string;
  imagePath?: string;
  patientId: number;
  createdAt: string;
}

export interface FavouriteDrugRequest {
  drugId: number;
}
