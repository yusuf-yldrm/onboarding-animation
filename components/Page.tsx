import { PageInterface } from "@/constants";
import * as React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

interface PageProps {
  page: PageInterface;
  translateX: SharedValue<number>;
  index: number;
}

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const Page = ({ page, translateX, index }: PageProps) => {
  const inputRange = [
    (index - 1) * SCREEN_WIDTH,
    index * SCREEN_WIDTH,
    (index + 1) * SCREEN_WIDTH,
  ];
  const rCircleStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      translateX.value,
      inputRange,
      [0, 1, 0],
      Extrapolation.CLAMP
    );
    return {
      transform: [
        {
          scale,
        },
      ],
    };
  });

  const rImageStyle = useAnimatedStyle(() => {
    const rotation = interpolate(
      translateX.value,
      inputRange,
      [0, 0, 1],
      Extrapolation.CLAMP
    );

    const opacity = interpolate(translateX.value, inputRange, [0.5, 1, 0.5]);

    return {
      opacity,
      transform: [
        {
          rotate: `${rotation * 2 * Math.PI}rad`,
        },
      ],
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.circleContainer}>
        <Animated.View style={[styles.circle, rCircleStyle]} />
        <Animated.Image
          source={page.source}
          style={[styles.image, rImageStyle]}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.title}>{page.title}</Text>
      <Text style={styles.description}>{page.description}</Text>
    </View>
  );
};

export default Page;

const CIRCLE_WIDTH = SCREEN_WIDTH * 0.7;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 50,
  },
  circle: {
    backgroundColor: "white",
    borderRadius: CIRCLE_WIDTH / 2,
    flex: 1,
    width: "100%",
    height: "100%",
  },
  circleContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: CIRCLE_WIDTH,
    aspectRatio: 1,
    marginBottom: 150,
  },
  image: {
    height: SCREEN_HEIGHT * 0.5,
    aspectRatio: 1,
    position: "absolute",
  },
  title: {
    fontSize: 35,
    fontWeight: "700",
    marginBottom: 15,
  },
  description: {
    fontSize: 14,
    textAlign: "center",
    color: "grey",
  },
});
