import { Text, TouchableOpacity, View } from "react-native";

import { styles } from "./styled";

const ChildrenHealthStatusComponent = () => {
  return (
    <View style={styles.outerWrapper}>
      <View style={styles.card}>
        <Text style={styles.name}>Алексей</Text>

        <Text style={styles.label}>Возраст:</Text>
        <Text style={styles.value}>10 лет</Text>

        <Text style={styles.label}>ID ребёнка:</Text>
        <Text style={styles.value}>12344567</Text>

        <Text style={styles.label}>Дата рождения:</Text>
        <Text style={styles.value}>32.01.2025</Text>

        <Text style={styles.label}>Дата прописки в поликлинику:</Text>
        <Text style={styles.value}>32.01.2025</Text>

        <Text style={styles.label}>На данный момент:</Text>
        <Text style={styles.value}>Полностью здоров</Text>

        <Text style={styles.label}>Хочет сосиску в тесте:</Text>
        <Text style={styles.value}>ЕЕЕЕЕЕЕЕЕ</Text>

        <View style={styles.imagePlaceholder} />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Записаться на приём</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChildrenHealthStatusComponent;
