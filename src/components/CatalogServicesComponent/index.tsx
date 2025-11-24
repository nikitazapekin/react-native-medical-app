import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "appStyles";

import { styles } from "./styled";

import DroppableList from "@/components/shared/DroppableList";
import ServiceComponent from "@/components/shared/ServiceComponent";
import { servicesSortOptions } from "@/constants/servicesCatalog";
import ServiceService from "@/http/service";
import type { ServiceResponse } from "@/http/types/doctor";
import { ROUTES } from "@/navigation/routes";
import type { FormNavigationProp } from "@/navigation/types";

const sortOptions = [
  { id: "0", label: "Снять сортировку", type: "" },
  ...servicesSortOptions
];

const CatalogServicesComponent = () => {
  const navigation = useNavigation<FormNavigationProp>();
  const [services, setServices] = useState<ServiceResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortType, setSortType] = useState<string>("");

  const handleSort = (item: { id: string; label: string; type?: string }) => {
    setSortType(item.type || "");
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const data = sortType
          ? await ServiceService.getSortedServices(sortType)
          : await ServiceService.getAllServices();

        setServices(data);
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };

    void fetchServices();
  }, [sortType]);

  return (
    <View style={styles.content}>
      <DroppableList sortOptions={sortOptions} handler={handleSort} placeholder="Сортировать" />

      <Text style={styles.title}>Услуги</Text>

      {loading ? (
        <ActivityIndicator size="large" color={COLORS.PRIMARY} />
      ) : (
        <View style={styles.listWrapper}>
          {services.length === 0 && (
            <Text style={{ fontSize: 16, color: "#6B7280", fontWeight: "600" }}>
              Услуги не найдены
            </Text>
          )}
          {services.map((service) => (
            <TouchableOpacity
              key={service.id}
              activeOpacity={0.7}
              onPress={() => navigation.navigate(ROUTES.STACK.USER_CATALOG_DOCTORS, { serviceId: service.id, serviceName: service.title })}
            >
              <ServiceComponent title={service.title} subtitle={service.subtitle || ""} />
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

export default CatalogServicesComponent;
