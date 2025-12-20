import { useEffect, useState, useCallback, useMemo } from "react";
import { Alert, FlatList, Text, View } from "react-native";

import DroppableList from "../shared/DroppableList";
import ElementBolezni from "../shared/ElementBolezni";

import { styles } from "./styled";
import type { IstoriaBolezneiProps } from "./types";

import DiseaseHistoryService from "@/http/diseaseHistory";
import type { DiseaseHistory } from "@/http/types/medical";

// Опции для фильтрации по типу болезни
const filterOptions = [
  { id: "all", label: "Все болезни", type: "all" },
  { id: "respiratory", label: "Дыхательные", type: "respiratory" },
  { id: "gastro", label: "Желудочные", type: "gastro" },
  { id: "pain", label: "Боли", type: "pain" },
  { id: "other", label: "Другие", type: "other" },
];

// Опции для сортировки
const sortOptions = [
  { id: "date_desc", label: "По дате (новые)", type: "date_desc" },
  { id: "date_asc", label: "По дате (старые)", type: "date_asc" },
  { id: "name_asc", label: "По алфавиту (А-Я)", type: "name_asc" },
  { id: "name_desc", label: "По алфавиту (Я-А)", type: "name_desc" },
];

// Функция для определения типа болезни
const getDiseaseType = (diseaseName: string): string => {
  const lowerName = diseaseName.toLowerCase();
  
  if (lowerName.includes('грипп') || lowerName.includes('простуда') || 
      lowerName.includes('кашель') || lowerName.includes('орви')) {
    return 'respiratory';
  }
  
  if (lowerName.includes('живот') || lowerName.includes('желуд') || 
      lowerName.includes('кишеч') || lowerName.includes('гастрит')) {
    return 'gastro';
  }
  
  if (lowerName.includes('боль') || lowerName.includes('головн') || 
      lowerName.includes('мигрень')) {
    return 'pain';
  }
  
  return 'other';
};

function formatDate(isoDateString: string): string {
  return isoDateString ? isoDateString.split('T')[0] : "Дата не указана";
}

const IstoriaBoleznei = ({ id, selectedDate }: IstoriaBolezneiProps) => {
  const [bolezni, setBolezni] = useState<DiseaseHistory[]>([]);
  const [filteredBolezni, setFilteredBolezni] = useState<DiseaseHistory[]>([]);
  const [selectedFilter, setSelectedFilter] = useState(filterOptions[0]);
  const [selectedSort, setSelectedSort] = useState(sortOptions[0]);

  // Загрузка данных
  useEffect(() => {
    const handleGet = async () => {
      try {
        const resp = await DiseaseHistoryService.getDiseaseHistories(Number(id), selectedDate);
        setBolezni(resp || []);
        // Применяем фильтр и сортировку к загруженным данным
        applyFiltersAndSort(resp || [], selectedFilter, selectedSort);
      } catch (error) {
        console.error("Error fetching disease histories:", error);
        Alert.alert("Ошибка", "Не удалось загрузить историю болезней");
      }
    };

    handleGet().catch(() => Alert.alert("Error"));
  }, [id, selectedDate]);

  // Функция для применения фильтра и сортировки
  const applyFiltersAndSort = useCallback((
    data: DiseaseHistory[],
    filter: { id: string; label: string; type: string },
    sort: { id: string; label: string; type: string }
  ) => {
    let result = [...data];

    // Применяем фильтр
    if (filter.type !== 'all') {
      result = result.filter(item => {
        const diseaseType = getDiseaseType(item.diseaseName || '');
        return diseaseType === filter.type;
      });
    }

    // Применяем сортировку
    result.sort((a, b) => {
      switch (sort.type) {
        case 'date_desc':
          return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
        
        case 'date_asc':
          return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
        
        case 'name_asc':
          return (a.diseaseName || '').localeCompare(b.diseaseName || '', 'ru');
        
        case 'name_desc':
          return (b.diseaseName || '').localeCompare(a.diseaseName || '', 'ru');
        
        default:
          return 0;
      }
    });

    setFilteredBolezni(result);
  }, []);

  // Обработчик выбора фильтра
  const handleFilterSelect = useCallback((item: { id: string; label: string; type: string }) => {
    setSelectedFilter(item);
    applyFiltersAndSort(bolezni, item, selectedSort);
  }, [bolezni, selectedSort, applyFiltersAndSort]);

  // Обработчик выбора сортировки
  const handleSortSelect = useCallback((item: { id: string; label: string; type: string }) => {
    setSelectedSort(item);
    applyFiltersAndSort(bolezni, selectedFilter, item);
  }, [bolezni, selectedFilter, applyFiltersAndSort]);

  // Пересчет при изменении исходных данных
  useEffect(() => {
    if (bolezni.length > 0) {
      applyFiltersAndSort(bolezni, selectedFilter, selectedSort);
    }
  }, [bolezni]);

  const renderItem = ({ item }: { item: DiseaseHistory }) => (
    <ElementBolezni
      item={{
        id: item.id,
        name: item.diseaseName || "Болезнь",
        description: item.description || "Описание отсутствует",
        date: formatDate(item.startDate)
      }}
    />
  );

  // Подсчет количества болезней по типам
  const diseaseCounts = useMemo(() => {
    const counts: Record<string, number> = {
      all: bolezni.length,
      respiratory: 0,
      gastro: 0,
      pain: 0,
      other: 0
    };

    bolezni.forEach(item => {
      const type = getDiseaseType(item.diseaseName || '');
      if (counts[type] !== undefined) {
        counts[type]++;
      }
    });

    return counts;
  }, [bolezni]);

  return (
    <View style={styles.wrapper}>
      {/* Фильтр по типу болезни */}
      <DroppableList 
        sortOptions={filterOptions.map(option => ({
          ...option,
          label: `${option.label} (${diseaseCounts[option.type] || 0})`
        }))} 
        handler={handleFilterSelect}
        placeholder="Фильтр по типу"
      />
      
      {/* Сортировка */}
      <DroppableList 
        sortOptions={sortOptions} 
        handler={handleSortSelect}
        placeholder="Сортировка"
      />

      {/* Информация о фильтрации */}
      {selectedFilter.type !== 'all' && (
        <View style={{ paddingHorizontal: 16, marginBottom: 10 }}>
          <Text style={{ fontSize: 14, color: '#666' }}>
            Отфильтровано: {filteredBolezni.length} из {bolezni.length} записей
            {selectedFilter.type !== 'all' && ` (${selectedFilter.label})`}
          </Text>
        </View>
      )}

      {filteredBolezni.length === 0 ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
          <Text>
            {bolezni.length === 0 
              ? "История болезней не найдена" 
              : `Болезни типа "${selectedFilter.label}" не найдены`}
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredBolezni}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default IstoriaBoleznei;
