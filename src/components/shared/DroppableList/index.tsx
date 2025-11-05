import React, { useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import Arrow from "@assets/dropdown/arrow.png";

import { styles } from "./styled";
import type { DroppableListProps } from "./types";

interface ListItem {
  id: string;
  label: string;
  type?: string;
}

const DroppableList = ({ sortOptions, handler, placeholder }: DroppableListProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState<ListItem>({ id: "", label: "" });

  const handleSelect = (item: ListItem) => {
    setSelectedValue(item);
    setIsVisible(false);

    if (handler) {
      handler(item);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.dropdownButton} onPress={() => setIsVisible(!isVisible)}>
        <Text style={styles.buttonText}>{selectedValue.label || placeholder || "Выберите опцию"}</Text>
        <Image source={Arrow} style={[styles.arrow, isVisible && styles.arrowRotated]} />
      </TouchableOpacity>

      {isVisible && (
        <View style={styles.dropdownList}>
          <FlatList
            data={sortOptions}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.listItem, selectedValue.id === item.id && styles.selectedItem]}
                onPress={() => handleSelect(item)}
              >
                <Text style={styles.itemText}>{item.label}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

export default DroppableList;
