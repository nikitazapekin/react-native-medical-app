import React from "react";
import { TextInput, View } from "react-native";

import { styles } from "./styled";
import type { SearchInputProps } from "./types";

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = "Найти...",
  placeholderTextColor = "#B0B0B0",
  value,
  onChangeText,
}) => {
  return (
    <View style={styles.searchWrapper}>
      <TextInput
        style={styles.searchInput}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export default SearchInput;
