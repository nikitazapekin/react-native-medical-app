import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import CustomButton from "../shared/Button";
import FormInput from "../shared/FormInput";
import DoctorInfoService from "@/http/doctorInfo";
import type { Doctor } from "@/http/types/personInfo";

import { styles } from "./styled";

import { DOCTOR_EDIT_CONSTANTS } from "@/constants/doctorEdit";
import { ROUTES } from "@/navigation/routes";
import type { FormNavigationProp } from "@/navigation/types";

const DoctorEditForm = () => {
  const navigation = useNavigation<FormNavigationProp>();
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<Partial<Doctor>>({});

  useEffect(() => {
    const loadDoctorInfo = async () => {
      try {
        setLoading(true);
        const doctorData = await DoctorInfoService.getCurrentDoctor();
        setDoctor(doctorData);
        setFormData({
          firstName: doctorData.firstName || "",
          middleName: doctorData.middleName || "",
          lastName: doctorData.lastName || "",
          specialization: doctorData.specialization || "",
          email: doctorData.email || "",
          education: doctorData.education || "",
          incrementQualification: doctorData.incrementQualification || "",
          experience: doctorData.experience || 0,
          achievements: doctorData.achievements || "",
          status: doctorData.status || "",
          citate: doctorData.citate || "",
        });
      } catch (err) {
        console.error("Error loading doctor info:", err);
      } finally {
        setLoading(false);
      }
    };

    loadDoctorInfo();
  }, []);

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      await DoctorInfoService.updateDoctor(formData);
      navigation.navigate(ROUTES.STACK.DOCTOR_CABINET);
    } catch (err) {
      console.error("Error saving doctor info:", err);
      alert("Не удалось сохранить изменения");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centerContent}>
        <ActivityIndicator size="large" color="#1280b2" />
      </View>
    );
  }

  return (
    <View style={styles.centerContent}>
      <View style={styles.form}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Изменить профиль</Text>
        </View>

        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={true}
        >
          <View style={styles.fields}>
            {DOCTOR_EDIT_CONSTANTS.map((item) => {
              const fieldValue = formData[item.field as keyof Doctor];
              const value = fieldValue !== undefined && fieldValue !== null 
                ? String(fieldValue) 
                : "";

              return (
                <FormInput
                  label={item.label}
                  handler={(text: string) => {
                    if (item.type === "numeric") {
                      const numValue = parseInt(text, 10);
                      if (!isNaN(numValue)) {
                        handleInputChange(item.field, numValue);
                      }
                    } else {
                      handleInputChange(item.field, text);
                    }
                  }}
                  placeholder={item.placeholder}
                  type={item.type}
                  key={item.id}
                  value={value}
                />
              );
            })}
          </View>
          <View style={styles.btns}>
            <CustomButton
              text={saving ? "Сохранение..." : "Сохранить"}
              handler={handleSave}
              backgroundColor="#1280b2"
              disabled={saving}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default DoctorEditForm;
