export interface ClinicResponse {
  id: number;
  name: string;
  imagePath: string;
  address: string;
  latitude: number;
  longitude: number;
  registrationDate?: string;
}
