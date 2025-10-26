import { useEffect,useState } from "react";
import { Alert,Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import CustomButton from "../shared/Button";
import FormInput from "../shared/FormInput";

import { styles } from "./styled";

import { USER_EDIT_CONSTANTS } from "@/constants";
import PersonInfoService from "@/http/patienInfo";
import { ROUTES } from "@/navigation/routes";
import type { FormNavigationProp } from "@/navigation/types";

interface FormData {
  firstName: string;
  lastName: string;
  region: string;
  phoneNumber: string;
  citate: string;
}

const UserEditForm = () => {
  const navigation = useNavigation<FormNavigationProp>();
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    region: "",
    phoneNumber: "",
    citate: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [initialData, setInitialData] = useState<FormData | null>(null);

  /*   useEffect(() => {
    loadCurrentUserData();
  }, []);

  const loadCurrentUserData = async () => {
    try {
      const userData = await PersonInfoService.getCurrentPatient();
      const initialFormData = {
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
        region: userData.region || "",
        phoneNumber: userData.phoneNumber || "",
        citate: userData.citate || "",
      };

      setFormData(initialFormData);
      setInitialData(initialFormData);
    } catch (error) {
      console.error('Error loading user data:', error);
      Alert.alert('Ошибка', 'Не удалось загрузить данные профиля');
    }
  }; */

  useEffect(() => {
    const loadCurrentUserData = async () => {
      try {
        const userData = await PersonInfoService.getCurrentPatient();
        const initialFormData = {
          firstName: userData.firstName || "",
          lastName: userData.lastName || "",
          region: userData.region || "",
          phoneNumber: userData.phoneNumber || "",
          citate: userData.citate || "",
        };

        setFormData(initialFormData);
        setInitialData(initialFormData);
      } catch (error) {
        console.error('Error loading user data:', error);
        Alert.alert('Ошибка', 'Не удалось загрузить данные профиля');
      }
    };

    loadCurrentUserData().catch(()=>console.log("err"))
  }, []);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const hasChanges = () => {
    if (!initialData) return false;

    return Object.keys(formData).some(key => {
      const field = key as keyof FormData;

      return formData[field] !== initialData[field];
    });
  };

  const handleSave = async () => {
    if (!hasChanges()) {
      Alert.alert('Информация', 'Нет изменений для сохранения');

      return;
    }

    try {
      setIsLoading(true);

      const updateData: Partial<FormData> = {};

      if (initialData) {
        Object.keys(formData).forEach(key => {
          const field = key as keyof FormData;

          if (formData[field] !== initialData[field]) {
            updateData[field] = formData[field];
          }
        });
      }

      console.log('Sending update data:', updateData);

      await PersonInfoService.updatePatient(updateData);

      Alert.alert('Успешно', 'Профиль обновлен');
      navigation.navigate(ROUTES.STACK.CABINET);

    } catch  {

      Alert.alert('Ошибка', 'Не удалось обновить профиль');
    } finally {
      setIsLoading(false);
    }
  };

  const getFieldValue = (type: string): string => {
    switch (type) {
      case 'name': return formData.firstName;

      case 'surname': return formData.lastName;

      case 'location': return formData.region;

      case 'tel': return formData.phoneNumber;

      case 'citate': return formData.citate;

      default: return '';
    }
  };

  const getFieldKey = (type: string): keyof FormData => {
    switch (type) {
      case 'name': return 'firstName';

      case 'surname': return 'lastName';

      case 'location': return 'region';

      case 'tel': return 'phoneNumber';

      case 'citate': return 'citate';

      default: return 'firstName';
    }
  };

  return (
    <View style={styles.centerContent}>
      <View style={styles.form}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Изменить профиль</Text>
        </View>

        <View style={styles.fields}>
          {USER_EDIT_CONSTANTS.map((item) => (
            <FormInput
              label={item.label}
              handler={(value: string) => handleInputChange(getFieldKey(item.type), value)}
              placeholder={item.placeholder}
              type={item.type}
              key={item.id}
              value={getFieldValue(item.type)}
            />
          ))}
        </View>

        <View style={styles.btns}>
          <CustomButton
            text="Сохранить"
            handler={handleSave}
            backgroundColor="#1280b2"
            disabled={!hasChanges() || isLoading}

          />

        </View>
      </View>
    </View>
  );
};

export default UserEditForm;
