import type { ImageSourcePropType} from "react-native";
import { Image, Text, View } from "react-native";
import Children from "@assets/mockPhotos/ChildrenBig.png";

import { styles } from "./styled";
import type { ChildrenProps } from "./types";

const ChildrenComponentBanner = ({ children }: ChildrenProps) => {
  if (!children) {
    return null;
  }

  const getImageSource = (): ImageSourcePropType => {
    if (!children.avatar) {
      return Children;
    }

    if (typeof children.avatar === "string") {
      return { uri: children.avatar };
    }

    return children.avatar;
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.preview}>
        <View style={styles.main}>
          <Image
            style={styles.image}
            source={getImageSource()}
            alt="Image"
            resizeMode="contain"
          />

          <View style={styles.info}>
            <Text style={styles.title}>{children.name}</Text>

            <View style={styles.registration}>
              <Text style={styles.registrationRegular}>Возраст:</Text>
              <Text style={styles.registrationBold}> {children.age} год</Text>
            </View>

            <View style={styles.registration}>
              <Text style={styles.registrationRegular}>Пол:</Text>
              <Text style={styles.registrationBold}> {children.gender}</Text>
            </View>

            <View style={styles.registration}>
              <Text style={styles.registrationRegular}>ID:</Text>
              <Text style={styles.registrationBold}> {children.identifier}</Text>
            </View>
          </View>

          <View style={styles.dots}>
            <View style={styles.dot} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default ChildrenComponentBanner;
