import { StyleSheet, Text, View, TextInput, ImageBackground, SafeAreaView, TouchableOpacity, FlatList } from 'react-native'
import React, { useState } from 'react'
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { FIREBASE_AUTH} from '../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
const SignUpScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setDisplayName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState(null);
    const cities = [
        {
          id: "1",
          name: "Paris",
          coordinate: {
            latitude: "48.856613",
            longitude: "2.352222",
          },
          image: require('../assets/paris.png')
        },
        {
          id: "2",
          name: "Montreal",
          coordinate: {
            latitude: "45.501690",
            longitude: "-73.567253",
          },
          image: require('../assets/montreal.png')
        },
        {
          id: "3",
          name: "Dakar",
          coordinate: {
            latitude: "14.716677",
            longitude: "-17.467686",
          },
          image: require('../assets/dakar.png')
        },
        {
          id: "4",
          name: "Ouagadougou",
          coordinate: {
            latitude: "12.371428",
            longitude: "-1.519660",
          },
          image: require('../assets/ouagadougou.png')
        },
        {
          id: "5",
          name: "Brussels",
          coordinate: {
            latitude: "50.850346",
            longitude: "4.351721",
          },
          image: require('../assets/paris.png')
        },
        {
          id: "6",
          name: "Reykjavik",
          coordinate: {
            latitude: "64.128288",
            longitude: "-21.827774",
          },
          image: require('../assets/reykjavik.png')
        },
        {
          id: "7",
          name: "Venice",
          coordinate: {
            latitude: "45.444958",
            longitude: "12.328463",
          },
          image: require('../assets/venice.png')
        },
        {
          id: "8",
          name: "New York",
          coordinate: {
            latitude: "40.730610",
            longitude: "-73.935242",
          },
          image: require('../assets/new-york.png')
        },
        {
          id: "9",
          name: "Atlanta",
          coordinate: {
            latitude: "33.753746",
            longitude: "-84.386330",
          },
          image: require('../assets/atlanta.png')
        },
        {
          id: "10",
          name: "Nantes",
          coordinate: {
            latitude: "47.218102",
            longitude: "-1.552800",
          },
          image: require('../assets/nantes.png')
        },
        {
          id: "11",
          name: "Los Angeles",
          coordinate: {
            latitude: "34.0522342",
            longitude: "-118.2436849",
          },
          image: require('../assets/los-angeles.png')
        },
        {
          id: "12",
          name: "Switzerland",
          coordinate: {
            latitude: "46.204391",
            longitude: "6.143158",
          },
          image: require('../assets/switzerland.png')
        },
      ];
      const favoriteCities  = [];

      function addFavoriteCities(event) {
        favoriteCities.push(event)
        console.log(favoriteCities);
      }


    const auth = FIREBASE_AUTH;
    const signUp = async () => {
        createUserWithEmailAndPassword(auth, email, password)
        .then(userCredentials => {
            const user = userCredentials.user;
            console.log(user.email);
            // TODO Handle the potential failure of this steps if the previous step was successful
            updateProfile(
                user,
                {displayName: username}
            ).then(
                () => { console.log(user.displayName);}
            )
        })
        .catch(error => alert(error.message))
    }
  
  return (
    <SafeAreaView style={styles.container}>
        <ProgressSteps>
            <ProgressStep label="First Step">
                <View style={styles.inputContainer}>
                    <TextInput 
                    autoCapitalize = "none"
                    placeholder='Username' 
                    value={username} 
                    onChangeText={(text) => setDisplayName(text)} 
                    style={styles.input}
                    />
                    <TextInput 
                    autoCapitalize = "none"
                    placeholder='Email' 
                    value={email} 
                    onChangeText={(text) => setEmail(text)} 
                    style={styles.input}/>
                    {/* 
                    Use PhoneInPut if PhoneNumber is ever needed for signup
                    <TextInput 
                    autoCapitalize = "none"
                    placeholder='Phone Number' 
                    value={phoneNumber}
                    onChangeText={(text) => setPhoneNumber(text)} 
                    style={styles.input}/> */}
                    <TextInput 
                    placeholder='Password' 
                    value={password} onChangeText={(text) => setPassword(text)} 
                    style={styles.input} secureTextEntry/>
                </View>
            </ProgressStep>
            <ProgressStep label="Second Step">
              <View>
                {
                  cities.map((city) => {
                    return (
                      <TouchableOpacity onPress={addFavoriteCities}>
                        <ImageBackground style={styles.cardImage} source={city.image}>
                        <Text 
                        style={{
                          color: 'white',
                          fontSize: 15,
                          fontWeight: 'bold',
                          marginTop: 110,
                        }}
                        key={city.id}>
                          {city.name}
                        </Text>
                      </ImageBackground>
                      </TouchableOpacity>
                    )
                  })
                }
              </View>
            </ProgressStep>
            <ProgressStep label="Third Step" onSubmit={signUp} >
              <Text>This is the content within step 3!</Text>
            </ProgressStep>
        </ProgressSteps>
    </SafeAreaView>
  )
}

export default SignUpScreen

const styles = StyleSheet.create({
    container : {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer : {
        width: '100%'
    },
    input : {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'grey'
    },
    buttonContainer : {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40
    },
    button : {
        backgroundColor: '#0782F9',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center'
    },
    buttonOutline : {
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: '#0782F9',
        borderWidth: 2
    },
    buttonText : {
        color: 'white',
        fontWeight: '700',
        fontSize: 16
    },
    buttonOutlineText : {
        color: '#0782F9',
        fontWeight: '700',
        fontSize: 16
    },
    resetPasswordText : {
        marginTop: 10,
        color: '#0782F9'
    },
    signUpText : {
        marginTop: 25,
        color: '#0782F9'
    },
    cardImage: {
      width: 150,
      height: 150,
      marginRight: 20,
      borderRadius: 10,
      overflow: 'hidden',
      padding: 10,
    },
    cardContainer: {
      flexWrap: 'wrap'
    },
})