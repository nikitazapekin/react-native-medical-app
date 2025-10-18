import { Text, View } from "react-native";

import { styles } from "./styled";

interface HeaderProps {
  title: string;
  isAuthenticated?: boolean
}

const Header = ({ title , isAuthenticated  }: HeaderProps) => {
  return (
    <View style={styles.header}>
      {isAuthenticated && (
        <View style={styles.circle} />
      )}
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
};

export default Header; 
