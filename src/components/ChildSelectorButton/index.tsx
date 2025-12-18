import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Text, TouchableOpacity, View } from 'react-native';
import ChildrenImg from '@assets/mockPhotos/ChildrenImg.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from 'appStyles';

import { styles } from './styles';

import type { Child } from '@/http/children';
import { ROUTES } from '@/navigation/routes';
import type { FormNavigationProp } from '@/navigation/types';

interface Props {
  onChildChange?: (child: Child) => void;
}

const ChildSelectorButton: React.FC<Props> = ({ onChildChange }) => {
  const navigation = useNavigation<FormNavigationProp>();
  const [selectedChild, setSelectedChild] = useState<Child | null>(null);
  const [childrenCount, setChildrenCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void loadSelectedChild();

    const unsubscribe = navigation.addListener('focus', () => {
      void loadSelectedChild();
    });

    return unsubscribe;
  }, []);

  const loadSelectedChild = async () => {
    try {
      const childId = await AsyncStorage.getItem('childId');
      const childrenStr = await AsyncStorage.getItem('childrenList');

      if (childrenStr) {
        const children: Child[] = JSON.parse(childrenStr);

        setChildrenCount(children.length);

        if (childId) {
          const child = children.find((c) => c.id === parseInt(childId));

          if (child) {
            setSelectedChild(child);

            if (onChildChange) {
              onChildChange(child);
            }
          }
        }
      }
    } catch (error) {
      console.error('Error loading selected child:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenSelector = () => {
    navigation.navigate(ROUTES.STACK.CHILD_SELECTION as never);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="small" color={COLORS.PRIMARY} />
      </View>
    );
  }

  if (!selectedChild) {
    return null;
  }

  const getImageSource = () => {
    if (selectedChild.avatar && selectedChild.avatar.trim() !== '') {
      return { uri: selectedChild.avatar };
    }

    return ChildrenImg;
  };

  const getAgeText = (age: number) => {
    if (age === 1) {
      return `${age} год`;
    } else if (age >= 2 && age <= 4) {
      return `${age} года`;
    } else {
      return `${age} лет`;
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handleOpenSelector}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Активный профиль ребенка</Text>
        {childrenCount > 1 && (
          <Text style={styles.totalCount}>
            Всего детей: {childrenCount}
          </Text>
        )}
      </View>

      <View style={styles.content}>
        <Image
          source={getImageSource()}
          style={styles.avatar}
          resizeMode="cover"
        />

        <View style={styles.textContainer}>
          <Text style={styles.childName}>{selectedChild.name}</Text>
          <Text style={styles.childDetails}>
            Возраст: {getAgeText(selectedChild.age)}
          </Text>
          <Text style={styles.childDetails}>
            Пол: {selectedChild.gender}
          </Text>
        </View>

        {childrenCount > 1 && (
          <View style={styles.arrowContainer}>
            <Text style={styles.arrowIcon}>›</Text>
          </View>
        )}
      </View>

      {childrenCount > 1 && (
        <View style={styles.footer}>
          <Text style={styles.changeText}>Нажмите, чтобы сменить ребенка</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default ChildSelectorButton;
