import React, { useContext, useEffect, useRef, useState } from "react";
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { RouteProp } from "@react-navigation/native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { COLORS } from "appStyles";

import { styles } from "./styled";

import AppointmentCard from "@/components/AppointmentCard";
import DroppableList from "@/components/shared/DroppableList";
import SearchInput from "@/components/shared/SearchInput";
import { appointmentSortOptions, yearOptions } from "@/constants/appointmentOptions";
import MedicalAppointmentService from "@/http/medicalAppointment";
import type { MedicalAppointmentResponse } from "@/http/types/doctor";
import { ROUTES } from "@/navigation/routes";
import type { FormNavigationProp, RootStackParamList } from "@/navigation/types";
import { ScrollViewContext } from "@/screens/UserAppointmentsScreen";

type UserAppointmentsRouteProp = RouteProp<RootStackParamList, typeof ROUTES.STACK.USER_APPOINTMENTS>;

const AppointmentsListComponent = () => {
  const navigation = useNavigation<FormNavigationProp>();
  const route = useRoute<UserAppointmentsRouteProp>();
  const scrollViewRef = useContext(ScrollViewContext);
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [selectedSort, setSelectedSort] = useState<string>("date_desc");
  const [searchQuery, setSearchQuery] = useState("");
  const [appointments, setAppointments] = useState<MedicalAppointmentResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [highlightedId, setHighlightedId] = useState<number | null>(null);
  const highlightedViewRef = useRef<View | null>(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        const patientIdStr = await AsyncStorage.getItem('id');

        if (!patientIdStr) {
          console.error('No patient ID found');

          return;
        }

        const patientId = parseInt(patientIdStr);
        const year = selectedYear !== "all" ? parseInt(selectedYear) : undefined;

        const data = await MedicalAppointmentService.getAllAppointments(
          patientId,
          {
            year,
            sortBy: selectedSort,
            search: searchQuery,
          }
        );

        setAppointments(data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setLoading(false);
      }
    };

    void fetchAppointments();
  }, [selectedYear, selectedSort, searchQuery]);

  useEffect(() => {
    const highlightedAppointmentId = (route.params as any)?.highlightedAppointmentId;
    
    if (highlightedAppointmentId && appointments.length > 0 && !loading) {
      setHighlightedId(highlightedAppointmentId);

      // Скролл к выделенной записи
      setTimeout(() => {
        if (highlightedViewRef.current && scrollViewRef?.current) {
          highlightedViewRef.current.measureLayout(
            // @ts-ignore
            scrollViewRef.current,
            (x, y) => {
              console.log('Scrolling to position:', y);
              scrollViewRef.current?.scrollTo({ 
                y: Math.max(0, y - 100), // Отступ 100px сверху
                animated: true 
              });
            },
            () => console.log('Measure failed')
          );
        }
      }, 500);

      // Убрать выделение через 3 секунды
      setTimeout(() => {
        setHighlightedId(null);
      }, 3000);
    }
  }, [appointments, loading, route.params, scrollViewRef]);

  const handleYear = (item: { id: string; label: string; type?: string }) => {
    setSelectedYear(item.type || "all");
  };

  const handleSort = (item: { id: string; label: string; type?: string }) => {
    setSelectedSort(item.type || "date_desc");
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "SCHEDULED":
        return "Запланирована";

      case "COMPLETED":
        return "Завершена";

      case "CANCELLED":
        return "Отменена";

      case "PENDING":
        return "Ожидает подтверждения";

      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "SCHEDULED":
        return COLORS.SCHEDULED;

      case "COMPLETED":
        return COLORS.SUCCESS;

      case "CANCELLED":
        return COLORS.SECONDARY;

      case "PENDING":
        return COLORS.WARNING;

      default:
        return COLORS.GRAY_DARK;
    }
  };

  return (
    <View style={styles.content}>
      <DroppableList sortOptions={yearOptions} handler={handleYear} placeholder="Год" />
      <DroppableList sortOptions={appointmentSortOptions} handler={handleSort} placeholder="Сортировать" />

      <SearchInput
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Поиск по врачу, услуге, категории..."
        placeholderTextColor="#B0B0B0"
      />

      <Text style={styles.title}>Мои записи в поликлинику</Text>

      {loading ? (
        <ActivityIndicator size="large" color={COLORS.PRIMARY} />
      ) : (
        <View style={styles.listWrapper}>
          {appointments.length === 0 ? (
            <Text style={{ fontSize: 16, color: "#6B7280", fontWeight: "600" }}>
              Записи не найдены
            </Text>
          ) : (
            appointments.map((appointment) => {
              const isHighlighted = highlightedId === appointment.id;
              
              return (
                <TouchableOpacity
                  key={appointment.id}
                  activeOpacity={0.7}
                  onPress={() => navigation.navigate(ROUTES.STACK.USER_APPOINTMENT_DETAILS, { appointmentId: appointment.id })}
                >
                  <View 
                    ref={(ref) => {
                      if (isHighlighted) {
                        highlightedViewRef.current = ref;
                      }
                    }}
                    onLayout={(event) => {
                      if (isHighlighted) {
                        // Автоматически скроллится к элементу когда он рендерится
                        console.log('Highlighted card rendered at:', event.nativeEvent.layout.y);
                      }
                    }}
                    style={[
                      styles.appointmentCard,
                      isHighlighted && {
                        borderWidth: 3,
                        borderColor: '#1280b2',
                        borderRadius: 10,
                        shadowColor: '#1280b2',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.3,
                        shadowRadius: 4,
                        elevation: 5,
                      }
                    ]}
                  >
                    <View style={styles.statusBadge}>
                      <View style={[styles.statusDot, { backgroundColor: getStatusColor(appointment.status || "SCHEDULED") }]} />
                      <Text style={styles.statusText}>{getStatusText(appointment.status || "SCHEDULED")}</Text>
                    </View>
                    <View style={styles.cardWrapper}>
                      <AppointmentCard
                        category={appointment.service?.title || appointment.category || "Запись"}
                        title={appointment.title || appointment.appointmentName}
                        date={formatDate(appointment.appointmentDate)}
                        doctorInitials={appointment.doctorInitials}
                        appointmentTime={appointment.appointmentTime}
                        patientName={appointment.patientName}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })
          )}
        </View>
      )}
    </View>
  );
};

export default AppointmentsListComponent;
