import React, { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "appStyles";

import { styles } from "./styled";
import type { UserCatalogDoctorsProps } from "./types";

import DoctorCard from "@/components/shared/DoctorCard";
import DroppableList from "@/components/shared/DroppableList";
import SearchInput from "@/components/shared/SearchInput";
import { getDoctorAvatar } from "@/constants/doctorImages";
import { doctorOptions, doctorsSortOptions } from "@/constants/doctorsCatalog";
import DoctorService from "@/http/doctor";
import type { DoctorResponse } from "@/http/types/doctor";
import { ROUTES } from "@/navigation/routes";
import type { FormNavigationProp } from "@/navigation/types";

const sortOptions = doctorsSortOptions;

const UserCatalogDoctorsComponent: React.FC<UserCatalogDoctorsProps> = ({ serviceName, serviceId, childId, showPopular }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialization, setSelectedSpecialization] = useState<string>("");
  const [sortType, setSortType] = useState<string>("");
  const [doctors, setDoctors] = useState<DoctorResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<FormNavigationProp>();

  const handleSort = (item: { id: string; label: string; type?: string }) => {
    setSortType(item.type || "");
  };

  const handleSpecializationSelect = (item: { id: string; label: string; type?: string }) => {
    setSelectedSpecialization(item.type || "");
  };

  const handleDoctorPress = (doctor: DoctorResponse) => {
    navigation.navigate(ROUTES.STACK.USER_ABOUT_DOCTOR, { doctor, serviceName, serviceId });
  };

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        let data: DoctorResponse[];

        if (childId) {
          data = await DoctorService.getDoctorsByChildId(childId);
        } else if (showPopular) {
          data = await DoctorService.getPopularDoctors();
        } else if (serviceId) {
          data = await DoctorService.getDoctorsByServiceId(serviceId);
        } else {
          data = await DoctorService.getAllDoctors();
        }

        setDoctors(data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      } finally {
        setLoading(false);
      }
    };

    void fetchDoctors();
  }, [showPopular, serviceId, childId]);

  const filteredDoctors = useMemo(() => {
    let filtered = doctors;
 
    if (serviceName && !serviceId && !childId) {
      const q = serviceName.toLowerCase();

      filtered = filtered.filter((d) => d.specialization.toLowerCase().includes(q));
    }

    if (selectedSpecialization) {
      filtered = filtered.filter((d) => d.specialization === selectedSpecialization);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();

      filtered = filtered.filter((d) =>
        `${d.firstName} ${d.middleName} ${d.lastName}`.toLowerCase().includes(q) ||
        d.specialization.toLowerCase().includes(q)
      );
    }

    if (sortType) {
      filtered = [...filtered].sort((a, b) => {
        switch (sortType) {
          case "name":
            return `${a.lastName} ${a.firstName}`.localeCompare(`${b.lastName} ${b.firstName}`, "ru");

          case "specialization":
            return a.specialization.localeCompare(b.specialization, "ru");

          case "rating":
            return (b.rate || 0) - (a.rate || 0);

          default:
            return 0;
        }
      });
    }

    return filtered;
  }, [childId, serviceName, serviceId, selectedSpecialization, sortType, doctors, searchQuery]);

  const hasNoDoctors = filteredDoctors.length === 0;

  return (
    <View style={styles.content}>

      <DroppableList sortOptions={doctorOptions} handler={handleSpecializationSelect} placeholder="Специализация" />
      <DroppableList sortOptions={sortOptions} handler={handleSort} placeholder="Сортировать" />

      <SearchInput
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Поиск по врачу, специализации..."
        placeholderTextColor="#B0B0B0"
      />

      <Text style={styles.title}>
        {childId ? "Консультировавшие врачи" : showPopular ? "Популярные врачи" : "Список врачей"}
      </Text>

      {loading ? (
        <ActivityIndicator size="large" color={COLORS.PRIMARY} />
      ) : (
        <View style={styles.listWrapper}>
          {hasNoDoctors && (
            <Text style={{ fontSize: 16, color: "#6B7280", fontWeight: "600" }}>
              {childId
                ? "Нет врачей, которые консультировали ребенка"
                : showPopular
                  ? "Популярные врачи не найдены"
                  : serviceName
                    ? `Нет врачей по услуге "${serviceName}"`
                    : "Врачи не найдены"}
            </Text>
          )}
          {filteredDoctors.map((doctor) => (
            <TouchableOpacity
              key={doctor.id}
              style={styles.cardTouchable}
              onPress={() => handleDoctorPress(doctor)}
            >
              <DoctorCard
                name={`${doctor.lastName} ${doctor.firstName} ${doctor.middleName || ''}`.trim()}
                spec={doctor.specialization}
                availability={doctor.status}
                avatar={getDoctorAvatar(doctor.avatar)}
              />
            </TouchableOpacity>
          ))}
        </View>
      )}

    </View>
  );
};

export default UserCatalogDoctorsComponent;
