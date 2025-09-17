import { Text, TextInput, View } from "react-native";

import { styles } from "./styled";
import type { FormInputProps } from "./types";

const FormInput = ({ placeholder, handler, label, type }: FormInputProps) => {

  const isPasswordVisible = false;
  const isPasswordField = type === "password";
  const secureTextEntry = isPasswordField && !isPasswordVisible;

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        onChange={handler}
        secureTextEntry={secureTextEntry}
        autoCapitalize={isPasswordField ? "none" : "sentences"}
        autoCorrect={!isPasswordField}

      />
    </View>
  );
};

export default FormInput;
