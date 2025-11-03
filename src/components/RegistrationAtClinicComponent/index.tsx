import React, { useMemo, useState } from "react";
import { Text, View } from "react-native";

import Calendar from "@/components/shared/Calendar";
import CustomButton from "@/components/shared/Button";
import TimeSlot from "@/components/shared/TimeSlot";
import { timeSlots } from "@/constants/timeSlots";
import { PRIMARY } from "@/constants/colors";
import type { Doctor } from "@/components/UserCatalogDoctorsComponent/types";

import { styles } from "./styled";

type Props = {
  doctor: Doctor;
  onSelectionChange?: (payload: { date: Date | null; time: string | null }) => void;
};

const RegistrationAtClinicComponent: React.FC<Props> = ({ doctor, onSelectionChange }) => {
  const primaryColor = PRIMARY;
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const handleSelectDate = (date: Date) => {
    setSelectedDate(date);
    onSelectionChange?.({ date, time: selectedTime });
  };

  const handleSelectTime = (time: string) => {
    setSelectedTime(time);
    onSelectionChange?.({ date: selectedDate, time });
  };

  const handleSubmit = () => {
    console.log("Confirm registration for:", doctor.name, selectedDate, selectedTime);
  };

  return (
    <View style={styles.container}>
      <Calendar selectedDate={selectedDate ?? undefined} onSelectDate={handleSelectDate} primaryColor={primaryColor} />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Утро</Text>
        <View style={styles.slotsRow}>
          {timeSlots.morning.map((time) => (
            <TimeSlot key={time} text={time} onPress={() => handleSelectTime(time)} selected={selectedTime === time} primaryColor={primaryColor} />
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>День</Text>
        <View style={styles.slotsRow}>
          {timeSlots.afternoon.map((time) => (
            <TimeSlot key={time} text={time} onPress={() => handleSelectTime(time)} selected={selectedTime === time} primaryColor={primaryColor} />
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Вечер</Text>
        <View style={styles.slotsRow}>
          {timeSlots.evening.map((time) => (
            <TimeSlot key={time} text={time} onPress={() => handleSelectTime(time)} selected={selectedTime === time} primaryColor={primaryColor} />
          ))}
        </View>
      </View>

      <View style={styles.buttonWrapper}>
        <CustomButton text="Записаться" handler={handleSubmit} backgroundColor="#1280b2" />
      </View>
    </View>
  );
};

export default RegistrationAtClinicComponent;


