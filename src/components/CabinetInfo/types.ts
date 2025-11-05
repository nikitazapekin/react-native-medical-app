import type { Dispatch, SetStateAction } from "react";

export interface Patient {
  id: number;
  firstName: string;
  lastName: string;
  registrationDate?: string;
  phoneNumber?: string;
  region?: string;
  avatar?: string;
  citate?: string;
  createdAt?: string;
  email: string;
  role: string;
}

export   interface CabinetInfoProps {
  patient: Patient | undefined;
  setPatient: Dispatch<SetStateAction<Patient | undefined>>;
}
