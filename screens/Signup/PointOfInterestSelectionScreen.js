import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, ImageBackground} from 'react-native'
import React from 'react'
import { Icon } from 'react-native-elements'

const PointOfInterestSelectionScreen = ({navigation}) => {
  const poisCategories =[
    {
      id: 1,
      name: "Sight",
      image: require('../../assets/sight.jpeg')
    },
    {
      id: 2,
      name: "Night Life",
      image: require('../../assets/nightlife.jpg')
    },
    {
      id: 3,
      name: "Restaurant",
      image: require('../../assets/restaurant.jpg')
    },
    {
      id: 4,
      name: "Shopping",
      image: require('../../assets/shopping.jpg')
    }
  ]

  const displayCategories = (category, index) => {
    return (
      <TouchableOpacity key={index}>
        <ImageBackground style={styles.bubble} source={category.image}>
          <Text style={styles.bubbleText}>{category.name}</Text>
        </ImageBackground>
      </TouchableOpacity>
      )
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={
        {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row', 
          flexWrap: 'wrap'
        }
        }>
        {
          poisCategories.map(
            (category, index) => {
              return displayCategories(category, index);
            }
          )
        }
      </View>
    </SafeAreaView>
  )
}

export default PointOfInterestSelectionScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  scrollView: {
    flex: 1
  },
  nextButton : {
    flex: 1,
    flexDirection: 'row', 
    justifyContent: 'flex-end'
  },
  backButton : {
    flex: 1,
  },
  navigationFooter : {
    flexDirection: 'row'
  },
  bubble: {
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
    backgroundColor: "#258FFF",
    marginTop: 10,
    marginRight: 10,
    overflow: 'hidden',
    shadowColor: 'black',
    shadowOffset : {
      width: 10,
      height: -10
    },
    shadowOpacity: 0.10,
    shadowRadius: 0
  }, 
  bubbleText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 'auto',
    marginBottom: 'auto'
  }
})