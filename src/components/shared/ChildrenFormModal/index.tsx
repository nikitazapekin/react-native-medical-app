// ChildFormModal.tsx
import React, { useEffect,useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import { styles } from './styled';
/* 
interface ChildFormModalProps {
  visible: boolean;
  child?: any;
  onSave: (childData: any) => void;
  onDelete?: () => void;
  onClose: () => void;
  saving?: boolean;
} */

  
export interface ChildData {
  id?: number;
  name: string;
  age: number;
  gender: string;
  avatar?: string;
  parentId?: number;
}

export interface ChildFormData {
  name: string;
  age: number;
  gender: string;
  avatar?: string;
}

interface ChildFormModalProps {
  visible: boolean;
  child?: ChildData | null;
  onSave: (childData: ChildFormData) => void;
  onDelete?: () => void;
  onClose: () => void;
  saving?: boolean;
}

const ChildFormModal: React.FC<ChildFormModalProps> = ({
  visible,
  child,
  onSave,
  onDelete,
  onClose,
  saving = false
}) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [avatar, setAvatar] = useState('');
  const [isLoadingImage, setIsLoadingImage] = useState(false);

  useEffect(() => {
    if (child) {
      setName(child.name || '');
      setAge(child.age ? child.age.toString() : '');
      setGender(child.gender || '');
      setAvatar(child.avatar || '');
    } else {
      setName('');
      setAge('');
      setGender('');
      setAvatar('');
    }
  }, [child, visible]);

  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert('Ошибка', 'Для выбора фото необходим доступ к галерее');

        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
        base64: true,
      });

      if (!result.canceled && result.assets && result.assets[0].base64) {
        setIsLoadingImage(true);
        const dataUrl = `data:image/jpeg;base64,${result.assets[0].base64}`;

        setAvatar(dataUrl);
      }
    } catch (error) {
      console.error('Ошибка при выборе изображения:', error);
      Alert.alert('Ошибка', 'Не удалось выбрать изображение');
    } finally {
      setIsLoadingImage(false);
    }
  };

  const handleAvatarPress = () => {
    Alert.alert(
      'Аватар ребенка',
      'Выберите действие',
      [
        {
          text: 'Выбрать из галереи',
          onPress: pickImage,
        },
        {
          text: 'Удалить фото',
          style: 'destructive',
          onPress: () => setAvatar(''),
        },
        {
          text: 'Отмена',
          style: 'cancel',
        },
      ]
    );
  };

  const handleSave = () => {
    if (!name.trim() || !age.trim() || !gender.trim()) {
      Alert.alert('Ошибка', 'Пожалуйста, заполните все обязательные поля');

      return;
    }

    const ageNumber = parseInt(age, 10);

    if (isNaN(ageNumber) || ageNumber < 0 || ageNumber > 18) {
      Alert.alert('Ошибка', 'Возраст должен быть числом от 0 до 18');

      return;
    }

    onSave({
      name: name.trim(),
      age: ageNumber,
      gender: gender.trim(),
      avatar: avatar.trim() || undefined
    });
  };

  const handleDelete = () => {
    Alert.alert(
      'Удаление ребенка',
      'Вы уверены, что хотите удалить этого ребенка?',
      [
        { text: 'Отмена', style: 'cancel' },
        {
          text: 'Удалить',
          style: 'destructive',
          onPress: onDelete
        }
      ]
    );
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>
            {child ? 'Редактировать ребенка' : 'Добавить ребенка'}
          </Text>

          <ScrollView style={styles.form}>
            {/* Блок аватара */}
            <View style={styles.avatarSection}>
              <Text style={styles.label}>Аватар</Text>
              <TouchableOpacity
                onPress={handleAvatarPress}
                disabled={isLoadingImage}
                style={styles.avatarContainer}
              >
                {avatar ? (
                  <Image
                    source={{ uri: avatar }}
                    style={styles.avatarPreview}
                  />
                ) : (
                  <View style={styles.avatarPlaceholder}>
                    <Text style={styles.avatarPlaceholderText}>
                      Нажмите для выбора фото
                    </Text>
                  </View>
                )}
                {isLoadingImage && (
                  <View style={styles.avatarLoading}>
                    <ActivityIndicator color="#fff" />
                  </View>
                )}
              </TouchableOpacity>
              {avatar && (
                <TouchableOpacity
                  onPress={() => setAvatar('')}
                  style={styles.removeAvatarButton}
                >
                  <Text style={styles.removeAvatarText}>Удалить фото</Text>
                </TouchableOpacity>
              )}
            </View>

            <Text style={styles.label}>Имя *</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Введите имя"
            />

            <Text style={styles.label}>Возраст *</Text>
            <TextInput
              style={styles.input}
              value={age}
              onChangeText={setAge}
              placeholder="Введите возраст"
              keyboardType="numeric"
            />

            <Text style={styles.label}>Пол *</Text>
            <TextInput
              style={styles.input}
              value={gender}
              onChangeText={setGender}
              placeholder="Введите пол (Мужской/Женский)"
            />
          </ScrollView>

          <View style={styles.modalButtons}>
            {child && onDelete && (
              <TouchableOpacity
                style={[styles.button, styles.deleteButton]}
                onPress={handleDelete}
                disabled={saving}
              >
                <Text style={styles.buttonText}>Удалить</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onClose}
              disabled={saving}
            >
              <Text style={styles.buttonText}>Отмена</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.saveButton]}
              onPress={handleSave}
              disabled={saving}
            >
              {saving ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Сохранить</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ChildFormModal;
 