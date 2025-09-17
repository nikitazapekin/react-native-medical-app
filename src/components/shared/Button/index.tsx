import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import { styles } from './styled';
import type { CustomButtonProps } from './types';

const CustomButton: React.FC<CustomButtonProps> = ({
  text,
  handler,
  backgroundColor = '#993B4A',
  disabled = false,
  color = '#fff'
}) => {

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor},
        disabled && styles.disabled
      ]}
      onPress={handler}
      disabled={disabled}
      activeOpacity={0.8}
    >

      <Text  style={[styles.text, { color }]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
