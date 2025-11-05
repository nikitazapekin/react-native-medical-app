import React, { useMemo, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { styles } from "./styled";
import type { Doctor, UserCatalogDoctorsProps } from "./types";

import DoctorCard from "@/components/shared/DoctorCard";
import DroppableList from "@/components/shared/DroppableList";
import SearchInput from "@/components/shared/SearchInput";
import { doctorOptions,doctorsCatalog, doctorsSortOptions } from "@/constants/doctorsCatalog";
import { historyConsultation } from "@/constants/historyConsultation";
import { ROUTES } from "@/navigation/routes";
import type { FormNavigationProp } from "@/navigation/types";

const sortOptions = doctorsSortOptions;
const mockDoctors: Doctor[] = doctorsCatalog;

const UserCatalogDoctorsComponent: React.FC<UserCatalogDoctorsProps> = ({ serviceName, childId }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialization, setSelectedSpecialization] = useState<string>("");
  const [sortType, setSortType] = useState<string>("");
  const navigation = useNavigation<FormNavigationProp>();

  const handleSort = (item: { id: string; label: string; type?: string }) => {
    setSortType(item.type || "");
  };

  const handleSpecializationSelect = (item: { id: string; label: string; type?: string }) => {
    setSelectedSpecialization(item.type || "");
  };

  const handleDoctorPress = (doctor: Doctor) => {
    navigation.navigate(ROUTES.STACK.USER_ABOUT_DOCTOR, { doctor, serviceName });
  };

  const filteredDoctors = useMemo(() => {
    let filtered = mockDoctors;

    if (childId) {
      const childConsultations = historyConsultation.filter((c) => c.childId === childId);
      const doctorIds = [...new Set(childConsultations.map((c) => c.doctorId))];

      filtered = filtered.filter((d) => doctorIds.includes(d.id));
    }

    if (serviceName) {
      const q = serviceName.toLowerCase();

      filtered = filtered.filter((d) => d.specialization.toLowerCase().includes(q));
    }

    if (selectedSpecialization) {
      filtered = filtered.filter((d) => d.spec === selectedSpecialization);
    }

    if (sortType) {
      filtered = [...filtered].sort((a, b) => {
        switch (sortType) {
          case "name":
            return a.name.localeCompare(b.name, "ru");

          case "specialization":
            return a.spec.localeCompare(b.spec, "ru");

          case "rating":
            return b.rating - a.rating;

          default:
            return 0;
        }
      });
    }

    return filtered;
  }, [childId, serviceName, selectedSpecialization, sortType]);

  const hasNoDoctors = filteredDoctors.length === 0;

  return (
    <View style={styles.content}>

      <DroppableList sortOptions={doctorOptions} handler={handleSpecializationSelect} placeholder="Специализация" />
      <DroppableList sortOptions={sortOptions} handler={handleSort} placeholder="Сортировать" />

      <SearchInput
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholderTextColor="#000"
      />

      <Text style={styles.title}>Список врачей</Text>

      <View style={styles.listWrapper}>
        {hasNoDoctors && (
          <Text style={{ fontSize: 16, color: "#6B7280", fontWeight: "600" }}>Нет врачей по услуге "{serviceName}"</Text>
        )}
        {filteredDoctors.map((doctor) => (
          <TouchableOpacity
            key={doctor.id}
            style={styles.cardTouchable}
            onPress={() => handleDoctorPress(doctor)}
          >
            <DoctorCard
              name={doctor.name}
              spec={doctor.spec}
              availability={doctor.availability}
              avatar={doctor.avatar}
            />
          </TouchableOpacity>
        ))}
      </View>

    </View>
  );
};

export default UserCatalogDoctorsComponent;
