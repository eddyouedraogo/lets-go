import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Icon } from "react-native-elements";
import SearchBar from "react-native-dynamic-search-bar";

const FavoriteCitiesSelectionScreen = ({ route, navigation }) => {
  const userData = route.params;

  const [allCities, setAllCities] = useState([
    {
      id: "1",
      name: "Paris",
      coordinate: {
        latitude: "48.856613",
        longitude: "2.352222",
      },
      image: require("../../assets/paris.png"),
    },
    {
      id: "2",
      name: "Montreal",
      coordinate: {
        latitude: "45.501690",
        longitude: "-73.567253",
      },
      image: require("../../assets/montreal.png"),
    },
    {
      id: "3",
      name: "Dakar",
      coordinate: {
        latitude: "14.716677",
        longitude: "-17.467686",
      },
      image: require("../../assets/dakar.png"),
    },
    {
      id: "4",
      name: "Ouagadougou",
      coordinate: {
        latitude: "12.371428",
        longitude: "-1.519660",
      },
      image: require("../../assets/ouagadougou.png"),
    },
    {
      id: "5",
      name: "Brussels",
      coordinate: {
        latitude: "50.850346",
        longitude: "4.351721",
      },
      image: require("../../assets/brussels.png"),
    },
    {
      id: "6",
      name: "Reykjavik",
      coordinate: {
        latitude: "64.128288",
        longitude: "-21.827774",
      },
      image: require("../../assets/reykjavik.png"),
    },
    {
      id: "7",
      name: "Venice",
      coordinate: {
        latitude: "45.444958",
        longitude: "12.328463",
      },
      image: require("../../assets/venice.png"),
    },
    {
      id: "8",
      name: "New York",
      coordinate: {
        latitude: "40.730610",
        longitude: "-73.935242",
      },
      image: require("../../assets/new-york.png"),
    },
    {
      id: "9",
      name: "Atlanta",
      coordinate: {
        latitude: "33.753746",
        longitude: "-84.386330",
      },
      image: require("../../assets/atlanta.png"),
    },
    {
      id: "10",
      name: "Nantes",
      coordinate: {
        latitude: "47.218102",
        longitude: "-1.552800",
      },
      image: require("../../assets/nantes.png"),
    },
    {
      id: "11",
      name: "Los Angeles",
      coordinate: {
        latitude: "34.0522342",
        longitude: "-118.2436849",
      },
      image: require("../../assets/los-angeles.png"),
    },
    {
      id: "12",
      name: "Switzerland",
      coordinate: {
        latitude: "46.204391",
        longitude: "6.143158",
      },
      image: require("../../assets/switzerland.png"),
    },
  ]);
  const [displayedCities, setDisplayedCities] = useState(allCities);

  searchCities = (search) => {
    if (search === "") {
      setDisplayedCities(allCities);
    } else {
      let result = [];
      result = allCities.filter((city) => {
        return city.name.toLowerCase().includes(search.toLowerCase());
      });
      setDisplayedCities(result);
    }
  };

  const addFavoriteCities = (city) => {
    let cities = [...allCities];

    if (city.selected) {
      city.selected = false;
    } else {
      city.selected = true;
    }
    const cityIndex = allCities.findIndex((c) => c.id === city.id);

    cities[cityIndex] = city;

    setAllCities(cities);
  };

  const handleNextStep = () => {
    const selectedCities = allCities.filter((city) => city.selected === true);
    navigation.navigate("Point of Interests", {
      userData: userData,
      selectedCities: selectedCities,
    });

    console.log(selectedCities);
  };

  const cityCardView = (city, index) => {
    return (
      <TouchableOpacity key={index} onPress={() => addFavoriteCities(city)}>
        <ImageBackground
          style={[
            styles.cardImage,
            city.selected ? styles.cardImageSelected : null,
          ]}
          source={city.image}
        >
          <Text style={styles.cardImageText} key={city.id}>
            {city.name}
          </Text>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <SearchBar
          style={styles.searchBarView}
          placeholder="Search for cities to explore ..."
          onChangeText={(search) => searchCities(search)}
          onClearPress={() => searchCities("")}
        />

        <View style={styles.selectCitiesText}>
          <Text style={styles.descriptionText}>
            Select cities you want to visit :
          </Text>
        </View>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <View style={styles.cardView}>
            {displayedCities.map((city, index) => {
              return cityCardView(city, index);
            })}
          </View>
        </View>
      </ScrollView>

      <View style={styles.navigationFooter}>
        <View style={styles.backButton}>
          <Icon
            raised
            name="chevron-left"
            type="font-awesome"
            reverse
            color={"#258FFF"}
            onPress={() => navigation.goBack()}
          />
        </View>
        <View style={styles.nextButton}>
          <Icon
            raised
            name="chevron-right"
            type="font-awesome"
            reverse
            color={"#258FFF"}
            onPress={handleNextStep}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default FavoriteCitiesSelectionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollView: {
    flex: 1,
  },
  nextButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  backButton: {
    flex: 1,
  },
  cardImage: {
    width: 150,
    height: 150,
    marginRight: 10,
    marginLeft: 10,
    marginTop: 20,
    borderRadius: 10,
    overflow: "hidden",
    padding: 10,
  },
  cardImageSelected: {
    borderWidth: 5,
    borderColor: "#90EE90",
  },
  cardImageText: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
    marginTop: "auto",
  },
  descriptionText: {
    fontWeight: "bold",
  },
  cardView: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  searchBarView: {
    marginBottom: 15,
  },
  navigationFooter: {
    flexDirection: "row",
    borderRadius: 10,
    // backgroundColor: "white",
  },
  headerContainer: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "white",
  },
  selectCitiesText: {
    marginBottom: 15,
  },
});
