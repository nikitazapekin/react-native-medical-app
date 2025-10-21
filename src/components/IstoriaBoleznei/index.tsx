import { View } from "react-native";

import DroppableList from "../shared/DroppableList";

import { styles } from "./styled";

const sortOptions = [
  { id: "1", label: "Грипп", type: "Gripp" },
  { id: "2", label: "Головная боль", type: "Golovnaya" },
  { id: "3", label: "Боль в животе", type: "Jivot" },
];

const sortOptions1 = [
  { id: "1", label: "По дате", type: "Data" },
  { id: "2", label: "По алфавиту", type: "Alphabite" },

];

const IstoriaBoleznei = () => {
  return (
    <View style={styles.wrapper}>
      <DroppableList
        sortOptions={sortOptions}
      />

      <DroppableList
        sortOptions={sortOptions1}
      />

    </View>
  );
};

export default IstoriaBoleznei;
