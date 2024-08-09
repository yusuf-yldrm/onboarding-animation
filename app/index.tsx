import Page from "@/components/Page";
import { BACKGROUND_COLOR, PAGES } from "@/constants";
import { AntDesign } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";

export default function Index() {
  const translateX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      translateX.value = event.contentOffset.x;
    },
  });

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Animated.ScrollView
        style={{ flex: 1 }}
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        {PAGES.map((page, index) => (
          <Page key={index} page={page} translateX={translateX} index={index} />
        ))}
      </Animated.ScrollView>
      <View style={styles.footer}>
        {/* {"paginator"} */}
        <View style={styles.fillCenter}></View>

        {/* {"text container"} */}

        <View style={styles.fillCenter}>
          <Text style={styles.text}>View Board</Text>
        </View>
        <View style={styles.fillCenter}></View>

        <View style={styles.fillCenter}></View>
        <View style={styles.fillCenter}>
          <AntDesign name="arrowright" size={24} color="black" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  textContainer: {},
  iconContainer: {},
  paginator: {},
  fillCenter: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 50,
    alignItems: "center",
    height: 50,
    marginBottom: 50,
  },
  text: {
    fontSize: 16,
    letterSpacing: 1.7,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});
