import React, { useMemo, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { styles } from "./styled";
import type { Doctor, UserCatalogDoctorsProps } from "./types";

import DoctorCard from "@/components/shared/DoctorCard";
import DroppableList from "@/components/shared/DroppableList";
import SearchInput from "@/components/shared/SearchInput";
import { doctorsCatalog, doctorsSortOptions } from "@/constants/doctorsCatalog";
import { ROUTES } from "@/navigation/routes";
import type { FormNavigationProp } from "@/navigation/types";

const sortOptions = doctorsSortOptions;
const mockDoctors: Doctor[] = doctorsCatalog;

const UserCatalogDoctorsComponent: React.FC<UserCatalogDoctorsProps> = ({ serviceName }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigation = useNavigation<FormNavigationProp>();

  const handleSort = () => {
  };

  const handleDoctorPress = (doctor: Doctor) => {
    navigation.navigate(ROUTES.STACK.USER_ABOUT_DOCTOR, { doctor, serviceName });
  };

  const filteredDoctors = useMemo(() => {
    if (!serviceName) return mockDoctors;

    const q = serviceName.toLowerCase();

    return mockDoctors.filter((d) => d.specialization.toLowerCase().includes(q));
  }, [serviceName]);

  const hasNoDoctors = filteredDoctors.length === 0;

  return (
    <View style={styles.content}>

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
