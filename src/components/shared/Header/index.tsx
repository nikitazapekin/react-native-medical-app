import { Text, View } from "react-native";

import { styles } from "./styled";

interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
};

export default Header;
/* import { Text,View } from "react-native";

import { styles } from "./styled";

const Header = () => {
  return ( <View style={styles.header}>
    <Text style={styles.headerTitle}>Профиль</Text>
  </View>
  );
};

export default Header;
 */
