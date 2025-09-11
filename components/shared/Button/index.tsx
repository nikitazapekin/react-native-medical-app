import React from 'react';
import { TouchableOpacity, Text, TouchableOpacityProps } from 'react-native';
import { styles } from './styled';
import { CustomButtonProps } from './types';

const CustomButton: React.FC<CustomButtonProps> = ({
  text,
  handler,
  backgroundColor = '#993B4A',
  disabled = false
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button, 
        { backgroundColor },
        disabled && styles.disabled
      ]}
      onPress={handler}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text style={styles.text}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
