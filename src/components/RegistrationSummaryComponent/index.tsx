import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

import { styles } from "./styled";

import CustomButton from "@/components/shared/Button";
import MedicalAppointmentService from "@/http/medicalAppointment";
import MedicalCardService from "@/http/medicalCard";
import ServiceService from "@/http/service";
import type { DoctorResponse } from "@/http/types/doctor";
import { ROUTES } from "@/navigation/routes";
import type { FormNavigationProp } from "@/navigation/types";

type Props = {
  doctor: DoctorResponse | any;
  selectedDate: string | null;
  selectedTime: string | null;
  serviceName?: string;
  serviceId?: number;
  onCancel: () => void;
};

const RegistrationSummaryComponent: React.FC<Props> = ({ doctor, selectedDate, selectedTime, serviceName, serviceId, onCancel }) => {
  const navigation = useNavigation<FormNavigationProp>();
  const [loading, setLoading] = useState(false);
  const [appointmentId, setAppointmentId] = useState<number | null>(null);
  const [defaultServiceId, setDefaultServiceId] = useState<number | null>(null);
  const [medicalCardId, setMedicalCardId] = useState<number | null>(null);

  const formattedDate = selectedDate ? new Intl.DateTimeFormat("ru-RU").format(new Date(selectedDate)) : "—";
  const time = selectedTime ?? "—";
  const displayedService = serviceName ?? "Консультация";

  const fullName = doctor.firstName
    ? `${doctor.lastName} ${doctor.firstName} ${doctor.middleName || ''}`.trim()
    : doctor.name;

  const spec = doctor.specialization || doctor.spec;

  useEffect(() => {
    const loadData = async () => {
      try {
        const services = await ServiceService.getAllServices();
        const consultation = services.find(s => s.title === "Консультация");

        if (consultation) {
          setDefaultServiceId(consultation.id);
        }

        const childIdStr = await AsyncStorage.getItem('childId');

        console.log('Child ID:', childIdStr);

        if (!childIdStr) {
          console.error('No childId found in storage');
          setMedicalCardId(1);

          return;
        }

        const childId = parseInt(childIdStr);

        const medicalCard = await MedicalCardService.getMedicalCardByChildId(childId);

        setMedicalCardId(medicalCard.id);

        console.log('Loaded medical card ID:', medicalCard.id);
      } catch (error) {
        console.error("Error loading data:", error);
        setMedicalCardId(1);
      }
    };

    void loadData();
  }, []);

  const handleConfirm = async () => {
    if (!selectedDate || !selectedTime || !medicalCardId) {
      Alert.alert("Ошибка", "Пожалуйста, выберите дату и время");

      return;
    }

    try {
      setLoading(true);

      const appointmentRequest = {
        medicalCardId,
        doctorId: doctor.id,
        serviceId: serviceId ?? (serviceName ? undefined : (defaultServiceId ?? undefined)),
        appointmentName: `Прием у ${fullName}`,
        appointmentDate: new Date(selectedDate).toISOString(),
        appointmentTime: selectedTime,
        appointmentType: displayedService,
        description: `Запись на ${displayedService}`
      };

      console.log('Creating appointment with data:', appointmentRequest);

      const result = await MedicalAppointmentService.createAppointment(appointmentRequest);

      setAppointmentId(result.id);

      Alert.alert(
        "Успешно",
        "Запись создана",
        [
          {
            text: "OK",
            onPress: () => navigation.navigate(ROUTES.STACK.HOMEPAGE)
          }
        ]
      );
    } catch (error: any) {
      console.error("Error creating appointment:", error);
      const errorMessage = error?.response?.data?.message || error?.message || "Не удалось создать запись";

      Alert.alert("Ошибка", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async () => {
    if (appointmentId) {
      try {
        await MedicalAppointmentService.deleteAppointment(appointmentId);
        Alert.alert("Отменено", "Запись удалена");
      } catch (error) {
        console.error("Error deleting appointment:", error);
      }
    }

    onCancel();
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Детали записи</Text>
        <View style={styles.row}><Text style={styles.label}>Врач:</Text><Text style={styles.value}>{fullName}</Text></View>
        <View style={styles.row}><Text style={styles.label}>Специальность:</Text><Text style={styles.value}>{spec}</Text></View>
        <View style={styles.row}><Text style={styles.label}>Услуга:</Text><Text style={styles.value}>{displayedService}</Text></View>
        <View style={styles.row}><Text style={styles.label}>Дата:</Text><Text style={styles.value}>{formattedDate}</Text></View>
        <View style={styles.row}><Text style={styles.label}>Время:</Text><Text style={styles.value}>{time}</Text></View>

        {loading ? (
          <ActivityIndicator size="large" color="#1280b2" style={{ marginTop: 20 }} />
        ) : (
          <View style={styles.buttonWrapper}>
            {!appointmentId ? (
              <CustomButton text="Подтвердить запись" handler={handleConfirm} fullWidth backgroundColor="#1280b2" />
            ) : null}
            <CustomButton text="Отменить" handler={handleCancel} fullWidth />
          </View>
        )}
      </View>
    </View>
  );
};

export default RegistrationSummaryComponent;
