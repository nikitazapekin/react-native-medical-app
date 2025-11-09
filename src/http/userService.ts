import AsyncStorage from "@react-native-async-storage/async-storage";

import type { Doctor, Patient } from "./types/personInfo";
import DoctorInfoService from "./doctorInfo";
import PersonInfoService from "./patienInfo";

class UserService {
  static async getCurrentUser(): Promise<Patient | Doctor> {
    console.log("START");
    try {
      const userRole = await AsyncStorage.getItem("userRole");

      console.log("RO:E", userRole);

      if (userRole === "DOCTOR") {
        console.log("GETTING");
        const resp =  await DoctorInfoService.getCurrentDoctor();

        console.log("GER CUR", resp );

        return resp;
      } else {
        console.log("elseee");

        return await PersonInfoService.getCurrentPatient();
      }
    } catch (e)   {
      console.log("GET CUR USER", e);
      throw new Error("Failed to get user information");
    }
  }

  static async getUserType(): Promise<"PATIENT" | "DOCTOR" | null> {
    try {
      const userRole = await AsyncStorage.getItem("userRole");

      return userRole === "DOCTOR" ? "DOCTOR" : "PATIENT";
    } catch (error) {
      console.log("Get user type error:", error);

      return null;
    }
  }

  static async isDoctor(): Promise<boolean> {
    const userType = await this.getUserType();

    return userType === "DOCTOR";
  }

  static async isPatient(): Promise<boolean> {
    const userType = await this.getUserType();

    return userType === "PATIENT";
  }

  static async getUserEmail(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem("userEmail");
    } catch (error) {
      console.log("Get user email error:", error);

      return null;
    }
  }

}

export default UserService;
