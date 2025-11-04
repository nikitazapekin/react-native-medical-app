import React, { useMemo, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { styles } from "./styled";

import DroppableList from "@/components/shared/DroppableList";
import ConsultationCard from "@/components/ConsultationCard";
import { historyConsultation } from "@/constants/historyConsultation";
import { optionsConsultation, yearConsultationOptions } from "@/constants/optionsConsultation";

const ConsultationHistoryComponent = () => {
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [selectedSort, setSelectedSort] = useState<string>("date_desc");

  const toDate = (d: string) => {
    const [dd, mm, yyyy] = d.split(".");
    return new Date(Number(yyyy), Number(mm) - 1, Number(dd));
  };

  const handleYear = (item: { id: string; label: string; type?: string }) => {
    setSelectedYear(item.type || "all");
  };

  const handleSort = (item: { id: string; label: string; type?: string }) => {
    setSelectedSort(item.type || "date_desc");
  };

  const filtered = useMemo(() => {
    let list = historyConsultation;
    if (selectedYear !== "all") {
      list = list.filter((c) => c.date.endsWith(selectedYear));
    }
    switch (selectedSort) {
      case "date_asc":
        return [...list].sort((a, b) => toDate(a.date).getTime() - toDate(b.date).getTime());
      case "category":
        return [...list].sort((a, b) => a.category.localeCompare(b.category));
      case "date_desc":
      default:
        return [...list].sort((a, b) => toDate(b.date).getTime() - toDate(a.date).getTime());
    }
  }, [selectedYear, selectedSort]);

  return (
    <View style={styles.content}>

      <View>
        <DroppableList sortOptions={yearConsultationOptions} handler={handleYear} placeholder="Год" />
        <DroppableList sortOptions={optionsConsultation} handler={handleSort} placeholder="Сортировать" />
      </View>
      
      <Text style={styles.title}>История консультаций</Text>

      <View style={styles.listWrapper}>
        {filtered.map((c) => (
          <TouchableOpacity key={c.id} activeOpacity={0.7}>
            <ConsultationCard category={c.category} title={c.title} date={c.date} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default ConsultationHistoryComponent;


