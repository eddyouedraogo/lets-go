import { StyleSheet, Text, View, TextInput } from 'react-native'
import React, { useState } from 'react'
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { FIREBASE_AUTH} from '../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
const SignUpScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setDisplayName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState(null);
    const DATA = [
        {
          id: "1",
          title: "Paris",
        },
        {
          id: "2",
          title: "Montreal",
        },
        {
          id: "3",
          title: "Dakar",
        },
        {
          id: "4",
          title: "Ouagadougou",
        },
        {
          id: "5",
          title: "Brussels",
        },
        {
          id: "6",
          title: "Reykjavik",
        },
        {
          id: "7",
          title: "Venice",
        },
        {
          id: "8",
          title: "New York",
        },
        {
          id: "9",
          title: "Atlanta",
        },
        {
          id: "10",
          title: "Nantes",
        },
        {
          id: "11",
          title: "Los Angeles",
        },
        {
          id: "12",
          title: "Switzerland",
        },
      ]; 

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
    <View style={styles.container}>
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
                <View style={{ alignItems: 'center' }}>
                    <Text>This is the content within step 2!</Text>
                </View>
            </ProgressStep>
            <ProgressStep label="Third Step" onSubmit={signUp} >
                <View style={{ alignItems: 'center' }}>
                    <Text>This is the content within step 3!</Text>
                </View>
            </ProgressStep>
        </ProgressSteps>
    </View>
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
    }
})