import { View } from "react-native";

import DroppableList from "../shared/DroppableList";

import { styles } from "./styled";

const sortOptions = [

  { id: "1", label: "По рейтингу", type: "rate" },
  { id: "2", label: "По Стоимости", type: "cost"},
  { id: "3", label: "По дате выхода", type: "relise" },

];
const PaymentsHistory = () => {
  return ( <View style={styles.content}>

    <DroppableList sortOptions={sortOptions} />

    <View style={styles.wrapper}>

    </View>

  </View> );
};

export default PaymentsHistory;
