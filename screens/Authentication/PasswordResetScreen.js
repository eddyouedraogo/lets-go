import { StyleSheet, TextInput, View, KeyboardAvoidingView, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { sendPasswordResetEmail } from 'firebase/auth'
import { FIREBASE_AUTH } from '../../firebase';

const PasswordResetScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const auth = FIREBASE_AUTH;

  const resetPassword = async () => {
    try {
        const response = await sendPasswordResetEmail(auth,email)
        .then(() => {
            console.log("Password reset email sent.");
            navigation.navigate('Login')
        });
    } catch (error) {
        alert(error.message)
    }
}

  return (
    <KeyboardAvoidingView style={styles.container} behavior='padding'>
      <Text style={styles.text}>Please enter your email</Text>
      <View style={styles.inputContainer}>
        <TextInput TextInput placeholder='Email' value={email} onChangeText={(text) => setEmail(text)} style={styles.input}/>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={resetPassword}>
          <Text style={styles.buttonText}>Reset Password</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

export default PasswordResetScreen

const styles = StyleSheet.create({
  container : {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  inputContainer : {
    width: '80%'
  },
  buttonContainer : {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  button : {
    backgroundColor: '#0782F9',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center'
  },
  buttonText : {
    color: 'white',
    fontWeight: '700',
    fontSize: 16
  },
  text : {
    marginBottom: 10,
    fontWeight: 'bold'
  }
})