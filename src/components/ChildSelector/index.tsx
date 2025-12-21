import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from 'appStyles';

import { styles } from './styles';

import ChildrenService, { type Child } from '@/http/children';
import type { FormNavigationProp } from '@/navigation/types';

const ChildSelector: React.FC = () => {
  const navigation = useNavigation<FormNavigationProp>();
  const [children, setChildren] = useState<Child[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedChildId, setSelectedChildId] = useState<number | null>(null);

  useEffect(() => {
    void loadChildren();
  }, []);

  const loadChildren = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const savedChildId = await AsyncStorage.getItem('childId');

      if (savedChildId) {
        setSelectedChildId(parseInt(savedChildId));
      }

      if (userId) {
        const childrenList = await ChildrenService.getChildrenByParentId(parseInt(userId));

        setChildren(childrenList);
        
        // Сохраняем список детей в AsyncStorage для использования в других компонентах
        await AsyncStorage.setItem('childrenList', JSON.stringify(childrenList));
      }
    } catch (error) {
      console.error('Error loading children:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectChild = async (child: Child) => {
    try {
      await AsyncStorage.setItem('childId', child.id.toString());
      setSelectedChildId(child.id);
      console.log('Selected child ID:', child.id);
      navigation.goBack();
    } catch (error) {
      console.error('Error saving child ID:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={COLORS.PRIMARY} />
      </View>
    );
  }

  if (children.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>Нет добавленных детей</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Выберите ребенка</Text>
        <Text style={styles.subtitle}>
          У вас {children.length} {children.length === 1 ? 'ребенок' : children.length < 5 ? 'ребенка' : 'детей'}
        </Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {children.map((child) => (
          <TouchableOpacity
            key={child.id}
            style={[
              styles.childCard,
              selectedChildId === child.id && styles.selectedCard
            ]}
            onPress={() => handleSelectChild(child)}
            activeOpacity={0.7}
          >
            <View style={styles.avatarContainer}>
              <View style={[
                styles.avatarCircle,
                selectedChildId === child.id && styles.selectedAvatar
              ]}>
                <Text style={styles.avatarText}>
                  {child.name.charAt(0).toUpperCase()}
                </Text>
              </View>
            </View>

            <View style={styles.childInfo}>
              <Text style={styles.childName}>{child.name}</Text>
              <Text style={styles.childDetails}>
                {child.age} {child.age === 1 ? 'год' : child.age < 5 ? 'года' : 'лет'} • {child.gender}
              </Text>
            </View>

            {selectedChildId === child.id && (
              <View style={styles.checkmarkContainer}>
                <Text style={styles.checkmark}>✓</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default ChildSelector;
