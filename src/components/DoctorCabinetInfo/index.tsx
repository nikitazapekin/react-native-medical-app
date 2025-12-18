import { useEffect, useState } from "react";
import { ActivityIndicator, Image, Text, View } from "react-native";
import RatingStar from "@assets/profile/star.png";

import { styles } from "./styled";

import { getDoctorAvatar } from "@/constants/doctorImages";
import DoctorInfoService from "@/http/doctorInfo";
import type { Doctor } from "@/http/types/personInfo";

const DoctorCabinetInfo = () => {
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDoctorInfo = async () => {
      try {
        setLoading(true);
        setError(null);
        const doctorData = await DoctorInfoService.getCurrentDoctor();

        setDoctor(doctorData);
      } catch (err) {
        console.error("Error loading doctor info:", err);
        setError("Не удалось загрузить информацию о враче");
      } finally {
        setLoading(false);
      }
    };

    loadDoctorInfo();
  }, []);

  if (loading) {
    return (
      <View style={styles.wrapper}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if (error || !doctor) {
    return (
      <View style={styles.wrapper}>
        <Text style={styles.title}>{error || "Информация о враче не найдена"}</Text>
      </View>
    );
  }

  const fullName = [doctor.firstName, doctor.middleName, doctor.lastName]
    .filter(Boolean)
    .join(" ");

  const avatarSource = getDoctorAvatar(doctor.avatar);

  return (
    <View style={styles.wrapper}>
      <View style={styles.preview}>
        <View style={styles.main}>
          <Image style={styles.image} source={avatarSource} alt="Image" resizeMode="cover" />

          <View style={styles.info}>
            <Text style={styles.title}>{fullName || "Имя не указано"}</Text>

            <View style={styles.registration}>
              <Text style={styles.registrationRegular}>Рейтинг:</Text>
              <Text style={styles.registrationBold}>
                {" "}
                {doctor.rate?.toFixed(2) || "0.00"}
              </Text>
              <Image style={styles.icon} source={RatingStar} alt="Image" resizeMode="contain" />
            </View>

            <Text style={styles.location}>
              {doctor.status || doctor.specialization || "Должность не указана"}
            </Text>
          </View>

          <View style={styles.dots}>
            <View style={styles.dot} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>
        </View>
      </View>
      {doctor.citate && (
        <Text style={styles.citate}>{doctor.citate}</Text>
      )}
    </View>
  );
};

export default DoctorCabinetInfo;
