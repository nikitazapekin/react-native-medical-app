import { ImageSourcePropType } from "react-native";
import ClinicImage from "@assets/mockPhotos/Clinic.png";

export interface ClinicItem {
  id: string;
  name: string;
  childId: number;
  imagePath: ImageSourcePropType;
  address: string;
  registrationDate: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

const defaultClinicImage = ClinicImage;

export const clinicList: ClinicItem[] = [
  {
    id: "clinic1",
    name: "Городская поликлиника номер 15",
    childId: 1,
    imagePath: defaultClinicImage,
    address: "пр. Независимости, д. 45, Минск, 220030, Беларусь",
    registrationDate: "15.01.2025",
    coordinates: {
      latitude: 53.9045,
      longitude: 27.5615,
    },
  },
  {
    id: "clinic2",
    name: "Детская поликлиника №3",
    childId: 2,
    imagePath: defaultClinicImage,
    address: "ул. Орловская, д. 12, Минск, 220076, Беларусь",
    registrationDate: "20.02.2025",
    coordinates: {
      latitude: 53.8930,
      longitude: 27.5674,
    },
  },
  {
    id: "clinic3",
    name: "Центральная поликлиника",
    childId: 3,
    imagePath: defaultClinicImage,
    address: "ул. Карла Маркса, д. 32, Минск, 220030, Беларусь",
    registrationDate: "10.03.2025",
    coordinates: {
      latitude: 53.9025,
      longitude: 27.5618,
    },
  },
  {
    id: "clinic4",
    name: "Городская детская поликлиника №1",
    childId: 1,
    imagePath: defaultClinicImage,
    address: "ул. Ленина, д. 8, Минск, 220030, Беларусь",
    registrationDate: "05.01.2025",
    coordinates: {
      latitude: 53.9000,
      longitude: 27.5600,
    },
  },
];

