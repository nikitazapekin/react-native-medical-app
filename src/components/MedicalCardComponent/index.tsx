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
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  useEffect(() => {
    const handleGetInfo = async () => {
      try {
        const resp = await MedicalCardService.getMedicalCardByChildId(Number(id));

        setInfo(resp);
      } catch {
        Alert.alert("Error");
      }
    };

    handleGetInfo().catch(() => Alert.alert("Error"));
  }, [id]);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);

    console.log("Selected date:", date.toISOString().split("T")[0]);
  };

  const handleNavigate = (
    item: "IstoriaBoleznei" | "ChildrenHealthStatus" | "UserAnalyzeHistory" | "UserPriemiHistory"
  ) => {

    if (item == "IstoriaBoleznei") {
      navigation.navigate(ROUTES.STACK.ISTORIABOLEZNEI, {
        id: Number(info?.id),
        selectedDate: String(selectedDate?.toISOString()),
      });
    }

    if (item == "UserAnalyzeHistory") {
      navigation.navigate(ROUTES.STACK.USER_ANALYZE_HISTORY, {
        id: Number(info?.id),
        selectedDate: String(selectedDate?.toISOString()),
      });
    }

    if (item == "UserPriemiHistory") {
      navigation.navigate(ROUTES.STACK.USER_ISTORIA_PRIEMOV, {
        id: Number(info?.id),
        selectedDate: String(selectedDate?.toISOString()),
      });
    }

    if (item == "ChildrenHealthStatus") {
      if (info?.childId) {
        navigation.navigate(ROUTES.STACK.CHILDREN_HEALTH_STATUS, {
          childId: info.childId,

        });
      } else {
        navigation.navigate(ROUTES.STACK.CHILDREN_HEALTH_STATUS, {
          childId: Number(id),
        });
      }
    }
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.content}>
        <Text style={styles.title}>Медицинская карта {info?.id}</Text>

        <Calendar selectedDate={selectedDate} onSelectDate={handleDateSelect} />

        {selectedDate && <Text>Выбранная дата: {selectedDate.toLocaleDateString("ru-RU")}</Text>}

        <Text style={styles.subtitle}>Журнал</Text>
        <View style={styles.buttons}>
          {medicalCardButtons.map((item) => (
            <MedicalCardButton
              key={item.id}
              item={item}
              id={String(info?.id)}
              onPress={() => handleNavigate(item.screen)}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

export default MedicalCardComponent;
