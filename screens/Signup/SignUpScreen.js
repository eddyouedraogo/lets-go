import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, SafeAreaView, TouchableOpacity, FlatList } from 'react-native'
import React, {useState } from 'react'

import { FIREBASE_AUTH} from '../../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { Icon, SocialIcon } from 'react-native-elements';
import PhoneInput from 'react-native-phone-number-input';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps'
import FavoriteCitiesSelectionScreen from './FavoriteCitiesSelectionScreen';
import PointOfInterestSelectionScreen from './PointOfInterestSelectionScreen';
import SignupUserInfoScreen from './SignupUserInfoScreen';

const SignUpScreen = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setDisplayName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState(null);

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
    <KeyboardAvoidingView style={styles.container}>

        <ProgressSteps>
            <ProgressStep label="First Step">
                <SignupUserInfoScreen/>
            </ProgressStep>
            <ProgressStep label="Second Step">
              <FavoriteCitiesSelectionScreen/>
            </ProgressStep>
            <ProgressStep label="Third Step" onSubmit={signUp} >
              <PointOfInterestSelectionScreen/>
            </ProgressStep>
        </ProgressSteps>
    </KeyboardAvoidingView>
  )
}

export default SignUpScreen

const styles = StyleSheet.create({
  container : {
    flex: 1,
    alignItems: 'center'
  },
  inputContainer : {
    marginTop: 20,
    width: '80%'
  },
  signUpTextView : {
    marginTop: 40
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
  phoneNumberContainer : {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    borderRadius: 10,
    marginTop: 5,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'grey',
    height: '16%'
  },
  phoneNumberInput : {
    backgroundColor: 'white',
    height: '100%',
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  thirdPartiesSignupText : {
    marginTop: 25,
    marginBottom: 10,
    fontWeight: 'bold',
    fontSize: 20,
  },
  thirdPartiesView : {
    flexDirection:'row',
    alignItems: 'center',
    marginBottom: 30
  },
  thirdPartiesInsideView : {
    flexDirection: 'column'
  },
  dividerContainerView : {
    flexDirection: 'row',
    alignItems: 'center'
  },
  dividerInsideView : {
    flex: 1,
    height: 1,
    backgroundColor: 'grey'
  },
  dividerText : {
    textAlign: 'center',
    paddingLeft: 10,
    paddingRight: 10
  },
  nextButton : {
    flex: 1,
    flexDirection: 'row', 
    justifyContent: 'flex-end'
    // position: 'absolute',
    // bottom:50,
    // right:50
  },
  navigationFooter : {
    flexDirection: 'row'
  }

})