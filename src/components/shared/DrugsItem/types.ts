export interface DrugsItem {
  item: {
    id: number;
    title: string;
    shortDescription?: string;
    description: string;
    price: number;
    type : string;
    dosage: string;
  };
}
