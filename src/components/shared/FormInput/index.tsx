import { Text, TextInput, View } from "react-native";

import { styles } from "./styled";
import type { FormInputProps } from "./types";

const FormInput = ({
  placeholder,
  handler,
  label,
  type,
  value
}: FormInputProps) => {
  const isPasswordVisible = false;
  const isPasswordField = type === "password";
  const secureTextEntry = isPasswordField && !isPasswordVisible;

  const handleTextChange = (text: string) => {
    handler(text);
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        onChangeText={handleTextChange}
        secureTextEntry={secureTextEntry}
        autoCapitalize={isPasswordField ? "none" : "sentences"}
        autoCorrect={!isPasswordField}
        value={value}
        keyboardType={
          type === "email" ? "email-address" :
            type === "tel" ? "phone-pad" :
              "default"
        }
      />
    </View>
  );
};

export default FormInput;
