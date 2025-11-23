import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
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
        <View style={styles.avatarContainer}>
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarText}>
              {selectedChild.name.charAt(0).toUpperCase()}
            </Text>
          </View>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.childName}>{selectedChild.name}</Text>
          <Text style={styles.childDetails}>
            {selectedChild.age}{' '}
            {selectedChild.age === 1
              ? 'год'
              : selectedChild.age < 5
                ? 'года'
                : 'лет'}{' '}
            • {selectedChild.gender}
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
