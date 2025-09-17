import { Text,View } from "react-native";

import { styles } from "./styled";

const Header = () => {
  return ( <View style={styles.header}>
    <Text style={styles.headerTitle}>Профиль</Text>
  </View>
  );
};

export default Header;
