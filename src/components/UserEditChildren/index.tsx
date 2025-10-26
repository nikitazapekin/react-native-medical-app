import { useEffect, useState } from "react";
import { Alert, ScrollView,Text, View } from "react-native";

import CustomButton from "../shared/Button";
import ChildFormModal from "../shared/ChildrenFormModal";
import ChildrenItem from "../shared/ChildrenItem";

import { styles } from "./styled";
import type { Child, CreateChildRequest, UpdateChildRequest, UserEditChildrenProps } from "./types";

import ChildrenService from "@/http/children";

const UserEditChildrenComponent = ({id}: UserEditChildrenProps) => {
  const [children, setChildren] = useState<Child[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingChild, setEditingChild] = useState<Child | null>(null);

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadCurrentPatientAndChildren = async () => {
      try {
        const childrenData = await ChildrenService.getChildrenByParentId(Number(id));

        setChildren(childrenData);
      } catch  {

        Alert.alert('Ошибка', 'Не удалось загрузить данные');
      }
    };

    loadCurrentPatientAndChildren().catch(() => console.log("error"));
  }, [id]);

  const handleAddChild = () => {
    setEditingChild(null);
    setIsModalVisible(true);
  };

  const handleEditChild = (child: Child) => {
    setEditingChild(child);
    setIsModalVisible(true);
  };

  const openEditModal = (child: Child) => {
    return () => handleEditChild(child);
  };

  const handleSaveChild = async (childData: CreateChildRequest | UpdateChildRequest): Promise<void> => {
    try {
      setSaving(true);

      if (editingChild) {
        const updateData: UpdateChildRequest = {
          name: childData.name || '',
          age: childData.age || 0,
          gender: childData.gender || '',
          avatar: childData.avatar || ''
        };
        const updatedChild = await ChildrenService.updateChild(editingChild.id, updateData);

        setChildren(prevChildren =>
          prevChildren.map(child =>
            child.id === editingChild.id ? updatedChild : child
          )
        );

        Alert.alert('Успех', 'Данные ребенка обновлены');
      } else {
        const createData: CreateChildRequest = {
          name: childData.name || '',
          age: childData.age || 0,
          gender: childData.gender || '',
          avatar: childData.avatar || '',
          parentId: Number(id)
        };
        const newChild = await ChildrenService.createChild(createData);

        setChildren(prevChildren => [...prevChildren, newChild]);
        Alert.alert('Успех', 'Ребенок успешно добавлен');
      }

      setIsModalVisible(false);
      setEditingChild(null);
    } catch   {

      Alert.alert(  'Не удалось сохранить данные ребенка');
    }
  };

  const handleDeleteChild = async (childId: number) => {
    Alert.alert(
      'Удаление ребенка',
      'Вы уверены, что хотите удалить этого ребенка?',
      [
        { text: 'Отмена', style: 'cancel' },
        {
          text: 'Удалить',
          style: 'destructive',
          onPress: async () => {
            try {
              await ChildrenService.deleteChild(childId);
              setChildren(prev => prev.filter(child => child.id !== childId));
              Alert.alert('Успех', 'Ребенок удален');
            } catch (error) {
              console.error('Error deleting child:', error);
              Alert.alert('Ошибка', 'Не удалось удалить ребенка');
            }
          }
        }
      ]
    );
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setEditingChild(null);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.wrapper}>
          <Text style={styles.title}>Список детей</Text>

          {children.map((child) => (
            <ChildrenItem
              key={child.id}
              item={{
                id: child.id.toString(),
                img: child.avatar ? { uri: child.avatar } : require('@assets/mockPhotos/ChildrenImg.png'),
                alt: "Children",
                name: child.name,
                age: child.age.toString(),
                gender: child.gender
              }}
              openModal={openEditModal(child)}
            />
          ))}

          <CustomButton
            text="Добавить ребенка"
            backgroundColor="#1280B2"
            handler={handleAddChild}
          />
        </View>
      </ScrollView>

      <ChildFormModal
        visible={isModalVisible}
        child={editingChild}
        onSave={handleSaveChild}
        onDelete={editingChild ? () => handleDeleteChild(editingChild.id) : undefined}
        onClose={handleCloseModal}
        saving={saving}
      />
    </View>
  );
};

export default UserEditChildrenComponent;

/* import { View, Text, Alert, ScrollView, TouchableOpacity } from "react-native";
import { styles } from "./styled";
import CustomButton from "../shared/Button";
import ChildrenItem from "../shared/ChildrenItem";
import { Child, CreateChildRequest, UpdateChildRequest, UserEditChildrenProps } from "./types";
import ChildrenService from "@/http/children";
import { useEffect, useState } from "react";
import ChildFormModal from "../shared/ChildrenFormModal";

const UserEditChildrenComponent = ({id}: UserEditChildrenProps) => {
  const [children, setChildren] = useState<Child[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingChild, setEditingChild] = useState<Child | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadCurrentPatientAndChildren();
  }, []);

  const loadCurrentPatientAndChildren = async () => {
    try {
      setLoading(true);
      const childrenData = await ChildrenService.getChildrenByParentId(Number(id));

      console.log("DATA", childrenData)
      setChildren(childrenData);
    } catch (error) {
      console.error('Error loading patient and children:', error);
      Alert.alert('Ошибка', 'Не удалось загрузить данные');
    } finally {
      setLoading(false);
    }
  };

  const handleAddChild = () => {
    setEditingChild(null);
    setIsModalVisible(true);
  };

  const handleEditChild = (child: Child) => {
    setEditingChild(child);
    setIsModalVisible(true);
  };

  const handleSaveChild = async (childData: CreateChildRequest | UpdateChildRequest): Promise<void> => {
    try {
      setSaving(true);

      if (editingChild) {

        const updateData: UpdateChildRequest = {
          name: childData.name || '',
          age: childData.age || 0,
          gender: childData.gender || '',
          avatar: childData.avatar || ''
        };
        const updatedChild = await ChildrenService.updateChild(editingChild.id, updateData);

        setChildren(prevChildren =>
          prevChildren.map(child =>
            child.id === editingChild.id ? updatedChild : child
          )
        );

        Alert.alert('Успех', 'Данные ребенка обновлены');
      } else {

        const createData: CreateChildRequest = {
          name: childData.name || '',
          age: childData.age || 0,
          gender: childData.gender || '',
          avatar: childData.avatar || '',
          parentId: Number(id)
        };
        const newChild = await ChildrenService.createChild(createData);

        setChildren(prevChildren => [...prevChildren, newChild]);
        Alert.alert('Успех', 'Ребенок успешно добавлен');
      }

      setIsModalVisible(false);
      setEditingChild(null);
    } catch (error: any) {
      console.error('Error saving child:', error);
      Alert.alert('Ошибка', error.message || 'Не удалось сохранить данные ребенка');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteChild = async (childId: number) => {
    Alert.alert(
      'Удаление ребенка',
      'Вы уверены, что хотите удалить этого ребенка?',
      [
        { text: 'Отмена', style: 'cancel' },
        {
          text: 'Удалить',
          style: 'destructive',
          onPress: async () => {
            try {
              await ChildrenService.deleteChild(childId);
              setChildren(prev => prev.filter(child => child.id !== childId));
              Alert.alert('Успех', 'Ребенок удален');
            } catch (error) {
              console.error('Error deleting child:', error);
              Alert.alert('Ошибка', 'Не удалось удалить ребенка');
            }
          }
        }
      ]
    );
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setEditingChild(null);
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>Список детей</Text>

  {children.map((child) => (
              <TouchableOpacity
                key={child.id}
                onPress={() => handleEditChild(child)}
              >
                <ChildrenItem
                  item={{
                    id: child.id.toString(),
                    img: child.avatar ? { uri: child.avatar } : require('@assets/mockPhotos/ChildrenImg.png'),
                    alt: "Children",
                    name: child.name,
                    age: child.age.toString(),
                    gender: child.gender
                  }}
                />
              </TouchableOpacity>
            ))}
      <CustomButton
        text="Добавить ребенка"
        backgroundColor="#1280B2"
        handler={handleAddChild}
      />

      <ChildFormModal
        visible={isModalVisible}
        child={editingChild}
        onSave={handleSaveChild}
        onDelete={editingChild ? () => handleDeleteChild(editingChild.id) : undefined}
        onClose={handleCloseModal}
        saving={saving}
      />
    </View>
  );
};

export default UserEditChildrenComponent;

 */

/* // components/UserEditChildrenComponent.tsx
import React, { useState, useEffect } from "react";
import { View, Text, Modal, TouchableOpacity, ScrollView, Alert } from "react-native";
import { styles } from "./styled";
import CustomButton from "../shared/Button";
import ChildrenItem from "../shared/ChildrenItem";
import ChildFormModal from "./ChildFormModal";
import ChildrenService, { Child } from "../../services/childrenService";
import PersonInfoService from "../../services/personInfoService";

const UserEditChildrenComponent = () => {
  const [children, setChildren] = useState<Child[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingChild, setEditingChild] = useState<Child | null>(null);
  const [currentPatientId, setCurrentPatientId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCurrentPatientAndChildren();
  }, []);

  const loadCurrentPatientAndChildren = async () => {
    try {
      setLoading(true);
      const patient = await PersonInfoService.getCurrentPatient();
      setCurrentPatientId(patient.id);

      if (patient.id) {
        const childrenData = await ChildrenService.getChildrenByParentId(patient.id);
        setChildren(childrenData);
      }
    } catch (error) {
      console.error('Error loading patient and children:', error);
      Alert.alert('Ошибка', 'Не удалось загрузить данные');
    } finally {
      setLoading(false);
    }
  };

  const handleAddChild = () => {
    setEditingChild(null);
    setIsModalVisible(true);
  };

  const handleEditChild = (child: Child) => {
    setEditingChild(child);
    setIsModalVisible(true);
  };

  const handleSaveChild = async (childData: any) => {
    try {
      if (editingChild) {
        // Обновление существующего ребенка
        const updatedChild = await ChildrenService.updateChild(editingChild.id, childData);
        setChildren(prev => prev.map(child =>
          child.id === editingChild.id ? updatedChild : child
        ));
      } else {
        // Создание нового ребенка
        const newChild = await ChildrenService.createChild({
          ...childData,
          parentId: currentPatientId!
        });
        setChildren(prev => [...prev, newChild]);
      }
      setIsModalVisible(false);
      setEditingChild(null);
    } catch (error) {
      console.error('Error saving child:', error);
      Alert.alert('Ошибка', 'Не удалось сохранить данные ребенка');
    }
  };

  const handleDeleteChild = async (childId: number) => {
    Alert.alert(
      'Удаление ребенка',
      'Вы уверены, что хотите удалить этого ребенка?',
      [
        { text: 'Отмена', style: 'cancel' },
        {
          text: 'Удалить',
          style: 'destructive',
          onPress: async () => {
            try {
              await ChildrenService.deleteChild(childId);
              setChildren(prev => prev.filter(child => child.id !== childId));
            } catch (error) {
              console.error('Error deleting child:', error);
              Alert.alert('Ошибка', 'Не удалось удалить ребенка');
            }
          }
        }
      ]
    );
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setEditingChild(null);
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>Список детей</Text>

      {loading ? (
        <Text>Загрузка...</Text>
      ) : (
        <ScrollView style={styles.childrenList}>
          <View style={styles.childrenGrid}>
            {children.map((child) => (
              <TouchableOpacity
                key={child.id}
                onPress={() => handleEditChild(child)}
              >
                <ChildrenItem
                  item={{
                    id: child.id.toString(),
                    img: child.avatar ? { uri: child.avatar } : require('@assets/mockPhotos/ChildrenImg.png'),
                    alt: "Children",
                    name: child.name,
                    age: child.age.toString(),
                    gender: child.gender
                  }}
                />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      )}

      <CustomButton
        text="Добавить ребенка"
        backgroundColor="#1280B2"
        handler={handleAddChild}
      />

      <ChildFormModal
        visible={isModalVisible}
        child={editingChild}
        onSave={handleSaveChild}
        onDelete={editingChild ? () => handleDeleteChild(editingChild.id) : undefined}
        onClose={handleCloseModal}
      />
    </View>
  );
};

export default UserEditChildrenComponent; */
/* import { View, Text } from "react-native";
import { styles } from "./styled";
import CustomButton from "../shared/Button";

import Children from "@assets/mockPhotos/ChildrenImg.png";
import ChildrenItem from "../shared/ChildrenItem";

const childrens = [
  { id: "1", img: Children, alt: "Children", name: "Ваня", age: "11", gender: "Мужской" },
  { id: "2", img: Children, alt: "Children", name: "Ваня", age: "11", gender: "Мужской" },
  { id: "3", img: Children, alt: "Children", name: "Ваня", age: "11", gender: "Мужской" },
  { id: "4", img: Children, alt: "Children", name: "Ваня", age: "11", gender: "Мужской" },
  { id: "5", img: Children, alt: "Children", name: "Ваня", age: "11", gender: "Мужской" },
  { id: "6", img: Children, alt: "Children", name: "Ваня", age: "11", gender: "Мужской" },
  { id: "7", img: Children, alt: "Children", name: "Ваня", age: "11", gender: "Мужской" },
  { id: "8", img: Children, alt: "Children", name: "Ваня", age: "11", gender: "Мужской" },
  { id: "9", img: Children, alt: "Children", name: "Ваня", age: "11", gender: "Мужской" },
];

const UserEditChildrenComponent = () => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>Список детей</Text>

      <CustomButton text="Добавить ребенка" backgroundColor="#1280B2" handler={() => {}} />
    </View>
  );
};

export default UserEditChildrenComponent;
 */
