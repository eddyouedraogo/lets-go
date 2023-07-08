import {
  StyleSheet,
  Text,
  Dimensions,
  View,
  Button,
  ImageBackground,
  SafeAreaView,
} from "react-native";
import React from "react";
import { FIREBASE_AUTH } from "../../firebase";
import Carousel from "react-native-snap-carousel";
import { StatusBar } from "expo-status-bar";
import { Icon } from "react-native-elements";

const HomeScreen = ({ navigation }) => {
  const citiesToDiscover = [
    {
      name: "Paris",
      image: require("../../assets/paris.png"),
    },
    {
      name: "New York",
      image: require("../../assets/new-york.png"),
    },
    {
      name: "Dakar",
      image: require("../../assets/dakar.png"),
    },
    {
      name: "Brussels",
      image: require("../../assets/brussels.png"),
    },
    {
      name: "Nantes",
      image: require("../../assets/nantes.png"),
    },
  ];

  const _renderItem = ({ item, index }) => {
    return (
      <View style={styles.carouselContainer} key={index}>
        <ImageBackground style={styles.carouselImage} source={item.image}>
          <Text style={styles.header}>{item.name}</Text>
        </ImageBackground>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.discoveryComponent}>
        <Text style={styles.discoveryHeader}>Discover new cities :</Text>
        <Carousel
          layout="default"
          data={citiesToDiscover}
          renderItem={_renderItem}
          sliderWidth={SLIDER_WIDTH}
          itemWidth={ITEM_WIDTH}
        ></Carousel>
      </View>
      {/* <View>
        
        <Button onPress={() => FIREBASE_AUTH.signOut()} title="Logout"></Button>
      </View> */}
    </View>
  );
};

export default HomeScreen;

export const SLIDER_WIDTH = Dimensions.get("window").width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  headerIcons: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#04555c",
  },
  carouselContainer: {
    backgroundColor: "white",
    borderRadius: 15,
    width: ITEM_WIDTH,
    marginTop: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4.65,
    elevation: 7,
  },
  carouselImage: {
    width: ITEM_WIDTH,
    height: 300,
    borderRadius: 15,
    overflow: "hidden",
  },
  header: {
    color: "#222",
    fontSize: 28,
    fontWeight: "bold",
    paddingLeft: 20,
    paddingTop: 20,
  },
  discoveryComponent: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  discoveryHeader: {
    color: "#222",
    fontSize: 20,
    fontWeight: "bold",
    fontStyle: "italic",
    paddingLeft: 20,
    paddingTop: 20,
  },
});
