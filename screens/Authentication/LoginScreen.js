import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import React, { useState } from 'react';

import { FIREBASE_AUTH} from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Icon, SocialIcon } from 'react-native-elements';


const LoginScreen = ({navigation}) => {
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
    return (
    <KeyboardAvoidingView style={styles.container} behavior='padding'>
        <View style={styles.titleView}>
            <Text style={styles.titleText}>Let's Go !</Text>
        </View>
        <View style={styles.inputContainer}>
            <TextInput placeholder='Email' value={email} onChangeText={(text) => setEmail(text)} style={styles.input}>
            </TextInput>
            <TextInput placeholder='Password' value={password} onChangeText={(text) => setPassword(text)} style={styles.input} secureTextEntry>
            </TextInput>
            <Text style={styles.resetPasswordText} onPress={() => navigation.navigate('Password Reset')}>Forgot your password ?</Text>
        </View>

        <View style={styles.buttonContainer}>
            <TouchableOpacity  onPress={signIn} style={styles.button}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
        </View>

        <View style={styles.signUpView}>
            <Text>Don't have an account yet ?</Text> 
            <TouchableOpacity onPress={() => navigation.navigate("Sign Up")}>
                <Text style={styles.signUpText}>Sign up.</Text>
            </TouchableOpacity>
        </View>

        <View style={styles.signInThirdPartiesView}>
            <View style={styles.dividerView}/>
            <Text style={styles.signInThirdPartiesText}>
                Or Sign in using
            </Text>
            <View style={styles.dividerView}/>
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
                <Icon raised name='phone' type='font-awesome' reverse color={'green'}/>
            </View>
        </View>
    </KeyboardAvoidingView>
)
}

export default LoginScreen

const styles = StyleSheet.create({
    titleView : {
        marginBottom: 50,
        marginTop: 50
    },
    titleText : {
        fontSize: 50,
        fontWeight: 'bold',
        fontStyle: 'italic',
        color: '#0782F9'
    },
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
    signUpView : {
        marginTop: 25,
        flexDirection:'row',
    },
    signUpText : {
        color: '#0782F9',
        paddingLeft: 2
    },
    signInThirdPartiesView : {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 100,
        marginBottom: 25
    },
    dividerView : {
        flex: 1,
        height: 1,
        backgroundColor: 'grey'
    },
    signInThirdPartiesText : {
        textAlign: 'center',
        paddingLeft: 10,
        paddingRight: 10
    },
    thirdPartiesView : {
        flexDirection:'row',
        alignItems: 'center'
    },
    thirdPartiesInsideView : {
        flexDirection: 'column'
    }
})