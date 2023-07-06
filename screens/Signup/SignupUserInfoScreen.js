import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, SafeAreaView, TouchableOpacity, FlatList } from 'react-native'
import React, {useState } from 'react'

import { FIREBASE_AUTH} from '../../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { Icon, SocialIcon } from 'react-native-elements';
import PhoneInput from 'react-native-phone-number-input';


const SignupUserInfoScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setDisplayName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState(null);

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
      <View>
        <Text style={styles.thirdPartiesSignupText}>Sign up using</Text>
      </View>

      <View style={styles.thirdPartiesView}>
            <View style={styles.thirdPartiesInsideView}>
                <SocialIcon type='google' light/>
            </View>
            <View style={styles.thirdPartiesInsideView}>
                <SocialIcon type='facebook'/>
            </View>
            <View style={styles.thirdPartiesInsideView}>
                <SocialIcon type='apple' iconColor='black' light/>
            </View>
            <View style={styles.thirdPartiesInsideView}>
                {/* NOTE : There's no existing social icon for phone */}
                <Icon name='phone' type='font-awesome' reverse color={'green'}/>
            </View>
        </View>
        
        <View style={styles.dividerContainerView}>
          <View style={styles.dividerInsideView} />
          <Text style={styles.dividerText}>Or Sign up using your email</Text>
          <View style={styles.dividerInsideView} />
        </View>
        
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
            <TextInput 
              placeholder='Password' 
              value={password} onChangeText={(text) => setPassword(text)} 
              style={styles.input} secureTextEntry/>
            <PhoneInput 
              value={phoneNumber}
              containerStyle={styles.phoneNumberContainer}
              textContainerStyle={styles.phoneNumberInput}
              defaultCode='CA'
              placeholder='Mobile'
              // onChangeCountry={(text) => setPhoneNumber(text)}
              onChangeText={(text) => setPhoneNumber(text)}
              onChangeFormattedText={(text) => setPhoneNumber(text)}
              >
            </PhoneInput>
        </View>

        {/* TODO validate fields before going to the next page */}
    </KeyboardAvoidingView>
  )
}

export default SignupUserInfoScreen

const styles = StyleSheet.create({
    container : {
      flex: 1,
      alignItems: 'center'
    },
    inputContainer : {
      marginTop: 20,
      width: '80%'
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
      height: '20%',
      width: '100%'
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