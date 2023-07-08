import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, ImageBackground} from 'react-native'
import React, { useState } from 'react'
import { Icon } from 'react-native-elements'
import { FIREBASE_AUTH, FIREBASE_DB } from '../../firebase';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { addDoc, collection } from 'firebase/firestore';

const PointOfInterestSelectionScreen = ({route, navigation}) => {
  const userConfig = route.params; 
  const auth = FIREBASE_AUTH;
  const db = FIREBASE_DB;

  const [poisCategories, setPoisCategories] =useState([
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
  ])

  const addPoisCategory = (category, index) => {
    let categories = [...poisCategories];

    if (category.selected) {
      category.selected = false;
    } else {
      category.selected = true;
    }

    categories[index] = category;

    setPoisCategories(categories);
  }

  const handleSubmit = () => {
    const selectedCategories = poisCategories.filter(
      categories => categories.selected === true
    );
    const authData = {
      ...userConfig,
      selectedCategories: selectedCategories
    }


    console.log(authData);

    signUp(authData)
  };

  const addUserData = (authData) => {
    const username = authData.userData?.userName;
    const poisCategories = authData.selectedCategories;
    const favouriteCities = authData.selectedCities;
    addDoc(
      collection(db, "User"), 
      {
        username : username,
        favouriteCities: favouriteCities,
        poisCategories: poisCategories
      }
    )
    .then(
      (docRef) => {
        console.log(docRef.id, docRef);
      }
    )
    .catch(
      (error) => {
        alert(error.message)
      }
    )
  }

  const signUp = async (authData) => {
    const email = authData.userData?.userEmail;
    const password = authData.userData?.userPassword;
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log(user.email);
        addUserData(authData);
      })
      .catch(
        (error) => {
          alert(error.message)
        }
      )
  };

  const displayCategories = (category, index) => {
    return (
      <TouchableOpacity key={index} onPress={() => addPoisCategory(category, index)}>
        <ImageBackground 
          style={[styles.bubble,
          category.selected ? styles.bubbleSelected: null]} 
          source={category.image}>
          <Text style={styles.bubbleText}>{category.name}</Text>
        </ImageBackground>
      </TouchableOpacity>
      )
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.pickCategoriesText}>
          Pick some activities to do : 
        </Text>
      </View>

      <View style={styles.categoryView}>
        {
          poisCategories.map(
            (category, index) => {
              return displayCategories(category, index);
            }
          )
        }
      </View>

      <View style={styles.navigationFooter}>
        <View style={styles.backButton}>
          <Icon
            raised 
            name='chevron-left' 
            type='font-awesome' 
            reverse 
            color={'#258FFF'}
            onPress={() => navigation.goBack()}
          />
        </View>
        <View style={styles.nextButton}>
          <Icon
            raised 
            name='check' 
            type='font-awesome' 
            reverse 
            color={'#258FFF'}
            onPress={handleSubmit}
          />
        </View>
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
  categoryView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row', 
    flexWrap: 'wrap'
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
  headerContainer: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "white",
    width: "80%",
    margin: 15
  },
  pickCategoriesText: {
    fontWeight : "bold",
    fontSize : 15,
    margin: 15
  },
  bubbleSelected: {
    borderWidth: 5,
    borderColor: "#258FFF",
  },
})