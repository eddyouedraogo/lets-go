import {
    StyleSheet,
    Text,
    View,
    TextInput,
    KeyboardAvoidingView,
    SafeAreaView,
    TouchableOpacity,
    FlatList,
} from "react-native";
import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";

import { FIREBASE_AUTH } from "../../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Icon, SocialIcon } from "react-native-elements";
import PhoneInput from "react-native-phone-number-input";
import { useNavigation } from "@react-navigation/native";

const SignupUserInfoScreen = forwardRef((props, ref) => {

    
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    const [email, setEmail] = useState("");
    const [emailValidity, isEmailValid] = useState(true);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordValidity, isPassword] = useState(true);
    // const [username, setUsername] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [phoneNumberValidity, isPhoneNumberValid] = useState(true);

    let formValidity = false;


    const auth = FIREBASE_AUTH;
    
    const signUp = async () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => {
                const user = userCredentials.user;
                console.log(user.email);
                // TODO Handle the potential failure of this steps if the previous step was successful
                updateProfile(user, { displayName: username }).then(() => {
                    // console.log(user.displayName);
                });
            })
            .catch(
                // (error) => alert(error.message)
                );
    };
    
    useImperativeHandle(ref, () => ({
        sendUserInfo() {
            let userData = {
                userEmail: email,
                userPassword: password,
                userDisplayname: username,
                userPhoneNumber: phoneNumber,
            };
    
            console.log('sendUserInfo', userData)
        },

        isFormValid() {
            return formValidity;
        }
    }));
    
    return (
        <KeyboardAvoidingView style={styles.container}>
            <View>
                <Text style={styles.thirdPartiesSignupText}>Sign up using</Text>
            </View>

            <View style={styles.thirdPartiesView}>
                <View style={styles.thirdPartiesInsideView}>
                    <SocialIcon type="google" light />
                </View>
                <View style={styles.thirdPartiesInsideView}>
                    <SocialIcon type="facebook" />
                </View>
                <View style={styles.thirdPartiesInsideView}>
                    <SocialIcon type="apple" iconColor="black" light />
                </View>
                <View style={styles.thirdPartiesInsideView}>
                    {/* NOTE : There's no existing social icon for phone */}
                    <Icon name="phone" type="font-awesome" reverse color={"green"} />
                </View>
            </View>

            <View style={styles.dividerContainerView}>
                <View style={styles.dividerInsideView} />
                <Text style={styles.dividerText}>Or Sign up using your email</Text>
                <View style={styles.dividerInsideView} />
            </View>

            <View style={styles.inputContainer}>
                {/* <TextInput
                    autoCapitalize="none"
                    placeholder="Username"
                    value={username}
                    onChangeText={(text) => setUsername(text)}
                    onBlur={sendUserInfo}
                    style={styles.input}
                /> */}
                <TextInput
                    autoCapitalize="none"
                    placeholder="Email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    // onBlur={printingInfo("Email")}
                    style={styles.input}
                />
                <View>
                    <Text style={styles.dirtyField}>Please enter a valid email</Text>
                </View> 
                {/* {isEmailValid ? null : <View><Text>Please enter a valid email</Text></View>  } */}
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    // onBlur={printingInfo("Password")}
                    style={styles.input}
                    secureTextEntry
                />
                <TextInput
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChangeText={(text) => setConfirmPassword(text)}
                    // onBlur={printingInfo("Password")}
                    style={styles.input}
                    secureTextEntry
                />
                <PhoneInput
                    value={phoneNumber}
                    containerStyle={styles.phoneNumberContainer}
                    textContainerStyle={styles.phoneNumberInput}
                    defaultCode="CA"
                    placeholder="Mobile"
                    onChangeCountry={(text) => setPhoneNumber(text)}
                    onChangeText={(text) => setPhoneNumber(text)}
                    onChangeFormattedText={(text) => setPhoneNumber(text)}
                    // onBlur={printingInfo("Mobile")}
                ></PhoneInput>
            </View>

            {/* TODO validate fields before going to the next page */}
        </KeyboardAvoidingView>
    );
});

export default SignupUserInfoScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
    inputContainer: {
        marginTop: 20,
        width: "80%",
    },
    input: {
        backgroundColor: "white",
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "grey",
    },
    phoneNumberContainer: {
        backgroundColor: "white",
        paddingHorizontal: 15,
        borderRadius: 10,
        marginTop: 5,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "grey",
        height: "20%",
        width: "100%",
    },
    phoneNumberInput: {
        backgroundColor: "white",
        height: "100%",
        paddingHorizontal: 0,
        paddingVertical: 0,
    },
    thirdPartiesSignupText: {
        marginTop: 25,
        marginBottom: 10,
        fontWeight: "bold",
        fontSize: 20,
    },
    thirdPartiesView: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 30,
    },
    thirdPartiesInsideView: {
        flexDirection: "column",
    },
    dividerContainerView: {
        flexDirection: "row",
        alignItems: "center",
    },
    dividerInsideView: {
        flex: 1,
        height: 1,
        backgroundColor: "grey",
    },
    dividerText: {
        textAlign: "center",
        paddingLeft: 10,
        paddingRight: 10,
    },
    nextButton: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    navigationFooter: {
        flexDirection: "row",
    },
    dirtyField : {
        fontStyle: "italic",
        color: "red"
    }
});
