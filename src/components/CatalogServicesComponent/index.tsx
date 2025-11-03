import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { styles } from "./styled";

import DroppableList from "@/components/shared/DroppableList";
import ServiceComponent from "@/components/shared/ServiceComponent";
import { ROUTES } from "@/navigation/routes";
import type { FormNavigationProp } from "@/navigation/types";
import { servicesCatalog, servicesSortOptions } from "@/constants/servicesCatalog";

const sortOptions = servicesSortOptions;
const services = servicesCatalog;

const CatalogServicesComponent = () => {
  const navigation = useNavigation<FormNavigationProp>();
  const handleSort = () => {};

  return (
    <View style={styles.content}>
      <DroppableList sortOptions={sortOptions} handler={handleSort} placeholder="Выбрать категорию услуг" />

      <Text style={styles.title}>Услуги</Text>

      <View style={styles.listWrapper}>
        {services.map((s) => (
          <TouchableOpacity key={s.id} activeOpacity={0.7} onPress={() => navigation.navigate(ROUTES.STACK.USER_CATALOG_DOCTORS, { serviceName: s.title })}>
            <ServiceComponent title={s.title} subtitle={s.subtitle} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default CatalogServicesComponent;


