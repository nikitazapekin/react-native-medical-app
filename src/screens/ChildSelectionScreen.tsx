import React from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { styles } from './styles';

import ChildSelector from '@/components/ChildSelector';
import Footer from '@/components/shared/Footer';
import Header from '@/components/shared/Header';

export default function ChildSelectionScreen() {
  return (
    <View style={styles.container}>
      <Header title="Выбор ребенка" isAuthenticated={true} showBackButton={true} />
      
      <ChildSelector />

      <Footer />

      <StatusBar style="auto" />
    </View>
  );
}

