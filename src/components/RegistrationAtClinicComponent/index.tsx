import React, { useEffect, useMemo, useState } from "react";
import { Text, View } from "react-native";
import type { RouteProp } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";

import { styles } from "./styled";

import CustomButton from "@/components/shared/Button";
import Calendar from "@/components/shared/Calendar";
import TimeSlot from "@/components/shared/TimeSlot";
import { PRIMARY } from "@/constants/colors";
import { timeSlots } from "@/constants/timeSlots";
import MedicalAppointmentService from "@/http/medicalAppointment";
import type { ROUTES } from "@/navigation/routes";
import type { RootStackParamList } from "@/navigation/types";

type Props = {
  onSelectionChange?: (payload: { date: Date | null; time: string | null }) => void;
  onSubmit?: (payload: { date: Date | null; time: string | null }) => void;
};

type RegistrationRouteProp = RouteProp<RootStackParamList, typeof ROUTES.STACK.USER_REGISTRATION_AT_CLINIC>;

const RegistrationAtClinicComponent: React.FC<Props> = ({ onSelectionChange, onSubmit }) => {
  const route = useRoute<RegistrationRouteProp>();
  const doctor = route.params?.doctor;

  const primaryColor = PRIMARY;
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);

  useEffect(() => {
    const loadBookedSlots = async () => {
      if (!selectedDate || !doctor?.id) {
        setBookedSlots([]);
        return;
      }

      try {
        const dateToSend = new Date(
          selectedDate.getFullYear(),
          selectedDate.getMonth(),
          selectedDate.getDate(),
          12,
          0,
          0
        ).toISOString();

        const booked = await MedicalAppointmentService.getBookedTimeSlots(doctor.id, dateToSend);
        setBookedSlots(booked);
      } catch (error) {
        console.error('Error loading booked slots:', error);
        setBookedSlots([]);
      }
    };

    void loadBookedSlots();
  }, [selectedDate, doctor?.id]);

  const availableSlots = useMemo(() => {
    const doctorStatus = (doctor as any)?.status;

    if (!doctorStatus) {
      return { morning: timeSlots.morning, afternoon: timeSlots.afternoon, evening: timeSlots.evening };
    }

    if (doctorStatus.toLowerCase().includes('выходной')) {
      return { morning: [], afternoon: [], evening: [] };
    }

    const timeMatch = doctorStatus.match(/(\d{1,2}):00\s*до\s*(\d{1,2}):00/);

    if (!timeMatch) {
      return { morning: timeSlots.morning, afternoon: timeSlots.afternoon, evening: timeSlots.evening };
    }

    const startHour = parseInt(timeMatch[1]);
    const endHour = parseInt(timeMatch[2]);

    const isSlotAvailable = (slot: string): boolean => {
      const slotMatch = slot.match(/(\d{1,2}):00/);

      if (!slotMatch) return false;

      const slotHour = parseInt(slotMatch[1]);

      return slotHour >= startHour && slotHour < endHour;
    };

    const filterByDoctorSchedule = (slots: string[]) => slots.filter(isSlotAvailable);
    const filterByBooked = (slots: string[]) => slots.filter(slot => !bookedSlots.includes(slot));

    const applyFilters = (slots: string[]) => filterByBooked(filterByDoctorSchedule(slots));

    return {
      morning: applyFilters(timeSlots.morning),
      afternoon: applyFilters(timeSlots.afternoon),
      evening: applyFilters(timeSlots.evening),
    };
  }, [doctor, bookedSlots]);

  const handleSelectDate = (date: Date) => {
    setSelectedDate(date);
    setSelectedTime(null);
    onSelectionChange?.({ date, time: null });
  };

  const handleSelectTime = (time: string) => {
    setSelectedTime(time);
    onSelectionChange?.({ date: selectedDate, time });
  };

  const handleSubmit = () => {
    onSubmit?.({ date: selectedDate, time: selectedTime });
  };

  return (
    <View style={styles.container}>
      <Calendar selectedDate={selectedDate ?? undefined} onSelectDate={handleSelectDate} primaryColor={primaryColor} disablePastDates={true} />

      <Text style={styles.sectionTitle}>Время приема</Text>
      {doctor && (
        <Text style={styles.availabilityDoctor}>
          Доступность врача: {(doctor as any).status || 'Утро, День, Вечер'}
        </Text>
      )}

      {availableSlots.morning.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Утро</Text>
          <View style={styles.slotsRow}>
            {availableSlots.morning.map((time) => (
              <TimeSlot
                key={time}
                text={time}
                onPress={() => handleSelectTime(time)}
                selected={selectedTime === time}
                primaryColor={primaryColor}
              />
            ))}
          </View>
        </View>
      )}

      {availableSlots.afternoon.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>День</Text>
          <View style={styles.slotsRow}>
            {availableSlots.afternoon.map((time) => (
              <TimeSlot
                key={time}
                text={time}
                onPress={() => handleSelectTime(time)}
                selected={selectedTime === time}
                primaryColor={primaryColor}
              />
            ))}
          </View>
        </View>
      )}

      {availableSlots.evening.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Вечер</Text>
          <View style={styles.slotsRow}>
            {availableSlots.evening.map((time) => (
              <TimeSlot
                key={time}
                text={time}
                onPress={() => handleSelectTime(time)}
                selected={selectedTime === time}
                primaryColor={primaryColor}
              />
            ))}
          </View>
        </View>
      )}

      {availableSlots.morning.length === 0 && availableSlots.afternoon.length === 0 && availableSlots.evening.length === 0 && (
        <Text style={styles.noSlots}>
          Нет доступных слотов для этого врача
        </Text>
      )}

      <View style={styles.buttonWrapper}>
        <CustomButton text="Записаться" handler={handleSubmit} backgroundColor="#1280b2" />
      </View>
    </View>
  );
};

export default RegistrationAtClinicComponent;
