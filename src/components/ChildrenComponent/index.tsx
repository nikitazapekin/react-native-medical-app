import { Text, View } from "react-native";

import ChildrenComponentBanner from "../ChildrenComponentBanner";
import CustomButton from "../shared/Button";
import ChildrenOptions from "../shared/ChildrenOptions";

import { styles } from "./styled";

const ChildrenComponent = () => {
  return (
    <View style={styles.wrapper}>
      <ChildrenComponentBanner />

      <Text style={styles.title}>
        О ребенке
      </Text>

      <ChildrenOptions />

      <CustomButton
        handler={()=>{}}
        color="#fff"
        text="Удалить профиль ребенка"
      />
    </View>
  );
};

export default ChildrenComponent;
