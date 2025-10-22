import Home from "@assets/tabBar/home.png";
import Chat from "@assets/tabBar/chat.png";
import Category from "@assets/tabBar/category.png";
import Tube from "@assets/tabBar/tube.png";
import Med from "@assets/tabBar/med.png";
import DoctorAppointments from "@assets/tabBar/booking.png";

export const tabIcons = [
  { id: 1, icon: Home, type: "home", stack: "HOMEPAGE" as const },
  { id: 2, icon: Chat, type: "chats", stack: "CHATS" },
  { id: 3, icon: Category, type: "category", stack: "CATALOG" as const },
  { id: 4, icon: Tube, type: "tube", stack: "MED" as const },
  { id: 5, icon: Med, type: "med", stack: "TUBE" as const },
];
export const DoctortabIcons = [
  { id: 1, icon: Home, type: "home", stack: "DOCTOR" as const },
  { id: 2, icon: Chat, type: "chats", stack: "DOCTOR_CHAT" },
  {
    id: 3,
    icon: DoctorAppointments,
    type: "doctorAppointments",
    stack: "DOCTOR_APPOINTMENTS" as const,
  },
];
