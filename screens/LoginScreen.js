import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import React, { useState } from 'react';

import { FIREBASE_AUTH} from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'


const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const auth = FIREBASE_AUTH;
    
    const signIn = async () => {
        try {
            const response = await signInWithEmailAndPassword(auth, email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log(user.email);
            });
        } catch (error) {
            alert(error.message)
        }
    }
    const signUp = async () => {
        createUserWithEmailAndPassword(auth, email, password)
        .then(userCredentials => {
            const user = userCredentials.user;
            console.log(user.email);
        })
        .catch(error => alert(error.message))
    }
  
    return (
    <KeyboardAvoidingView style={styles.container} behavior='padding'>
        <View style={styles.inputContainer}>
            <TextInput placeholder='Email' value={email} onChangeText={(text) => setEmail(text)} style={styles.input}>
            </TextInput>
            <TextInput placeholder='Password' value={password} onChangeText={(text) => setPassword(text)} style={styles.input} secureTextEntry>
            </TextInput>
        </View>

        <View style={styles.buttonContainer}>
            <TouchableOpacity  onPress={signIn} style={styles.button}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={signUp} style={[styles.button, styles.buttonOutline]}>
                <Text style={styles.buttonOutlineText}>Register</Text>
            </TouchableOpacity>
        </View>

    </KeyboardAvoidingView>
)
}

export default LoginScreen

const styles = StyleSheet.create({
    container : {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer : {
        width: '80%'
    },
    input : {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5
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
    }
})