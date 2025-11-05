import { useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Calendar from "../shared/Calendar";
import MedicalCardButton from "../shared/MedicalCardButton";

import { styles } from "./styled";
import type { MedicalCardProps } from "./types";

import { medicalCardButtons } from "@/constants";
import MedicalCardService from "@/http/medicalCard";
import type { MedicalCard } from "@/http/types/medical";
import { ROUTES } from "@/navigation/routes";
import type { FormNavigationProp } from "@/navigation/types";

const MedicalCardComponent = ({ id }: MedicalCardProps) => {
  const navigation = useNavigation<FormNavigationProp>();

  const [info, setInfo] = useState<MedicalCard>();

  useEffect(() => {
    const handleGetInfo = async () => {
      try {
        const resp = await MedicalCardService.getMedicalCardByChildId(Number(id));

        setInfo(resp);
      } catch {
        Alert.alert("Error");
      }
    };

    handleGetInfo().catch(()=> Alert.alert("Error"))
  }, []);

  //info?.id - id медицинской карты
  const handleNavigate = (
    item: "IstoriaBoleznei" | "ChildrenHealthStatus" | "UserAnalyzeHistory" | "UserPriemiHistory"
  ) => {
    if (item == "IstoriaBoleznei") {
      navigation.navigate(ROUTES.STACK.ISTORIABOLEZNEI, { id: Number(info?.id) });
    }

    if (item == "UserAnalyzeHistory") {
      navigation.navigate(ROUTES.STACK.USER_ANALYZE_HISTORY, { id: Number(info?.id) });
    }

    if (item == "UserPriemiHistory") {
      navigation.navigate(ROUTES.STACK.USER_ISTORIA_PRIEMOV, { id: Number(info?.id) });
    }

    if (item ==  "ChildrenHealthStatus") {
      navigation.navigate(ROUTES.STACK.CHILDREN_HEALTH_STATUS);
    }
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.content}>
        <Text style={styles.title}>Медицинская карта {info?.id}</Text>
        <Calendar />
        <Text style={styles.subtitle}>Журнал</Text>
        <View style={styles.buttons}>
          {medicalCardButtons.map((item) => (
            <MedicalCardButton
              key={item.id}
              item={item}
              id={String(info?.id)}
              onPress={() => handleNavigate(item.screen)}
              //  onPress={() => navigation.navigate(item.screen)}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

export default MedicalCardComponent;
