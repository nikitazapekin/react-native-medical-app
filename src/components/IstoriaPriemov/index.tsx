import { FlatList, View } from "react-native";

import DroppableList from "../shared/DroppableList";
import ElementBolezni from "../shared/ElementBolezni";

import { styles } from "./styled";

type BoleznItem = {
  id: number;
  name: string;
  description: string;
  date: string;
};

const sortOptions = [
  { id: "1", label: "Грипп", type: "Gripp" },
  { id: "2", label: "Головная боль", type: "Golovnaya" },
  { id: "3", label: "Боль в животе", type: "Jivot" },
];

const sortOptions1 = [
  { id: "1", label: "По дате", type: "Data" },
  { id: "2", label: "По алфавиту", type: "Alphabite" },
];

const bolezni: BoleznItem[] = [
  { id: 1, name: "Лор", description: "Полное обследование", date: "22.12.2024" },
  { id: 2, name: "Лор", description: "Полное обследование", date: "22.12.2024" },
  { id: 3, name: "Лор", description: "Полное обследование", date: "22.12.2024" },
  { id: 4, name: "Лор", description: "Полное обследование", date: "22.12.2024" },
  { id: 5, name: "Лор", description: "Полное обследование", date: "22.12.2024" },
  { id: 6, name: "Лор", description: "Полное обследование", date: "22.12.2024" },
  { id: 7, name: "Лор", description: "Полное обследование", date: "22.12.2024" },
];

const IstoriaPriemov = () => {
  const renderItem = ({ item }: { item: BoleznItem }) => <ElementBolezni item={item} />;

  return (
    <View style={styles.wrapper}>
      <DroppableList sortOptions={sortOptions} />
      <DroppableList sortOptions={sortOptions1} />

      <FlatList
        data={bolezni}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default IstoriaPriemov;
