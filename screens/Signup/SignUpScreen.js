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
import React, { useRef, useState } from "react";

import { Icon, SocialIcon } from "react-native-elements";
import PhoneInput from "react-native-phone-number-input";

const SignUpScreen = ({ navigation }) => {
  var emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const [email, setEmail] = useState("");
  const [emailValid, isEmailValid] = useState(true);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordValid, isPasswordValid] = useState(true);
  const [passwordShort, isPasswordShort] = useState(false);
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberValid, isPhoneNumberValid] = useState(true);
  const [formValid, isFormValid] = useState(false);
  const phoneInput = useRef(null);

  const validateEmail = () => {
    if (email.match(emailRegex)) {
      isEmailValid(true);
    } else {
      isEmailValid(false);
    }
  };

  const validatePassword = () => {
    if (password && confirmPassword) {
      isPasswordValid(password === confirmPassword);
      isPasswordShort(password.length < 8);
    }
  };

  // const validatePhoneNumber = (value) => {
  //   isPhoneNumberValid(phoneInput.current?.isValidNumber(value));
  //   console.log(phoneNumberValid);
  // };

  const validateForm = () => {
    validateEmail();
    validatePassword();
    if (emailValid && passwordValid && !passwordShort) {
      navigation.navigate("Favorite Cities", {
        userEmail: email,
        userPassword: password,
        userName: email,
      });
    }
  };

  const EmailError = () => {
    if (!emailValid) {
      return (
        <View>
          <Text style={styles.dirtyField}>Please enter a valid email</Text>
        </View>
      );
    } else {
      return null;
    }
  };

  const PasswordError = () => {
    if (!passwordValid) {
      return (
        <View>
          <Text style={styles.dirtyField}>Password does not match</Text>
        </View>
      );
    }
    if (passwordShort) {
      return (
        <View>
          <Text style={styles.dirtyField}>
            Password must be at least 8 characters long
          </Text>
        </View>
      );
    }
  };
  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.signUpTextView}>
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
          style={styles.input}
        /> */}
        <TextInput
          autoCapitalize="none"
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
          onBlur={validateEmail}
          style={styles.input}
        />
        <EmailError />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          onBlur={validatePassword}
          style={styles.input}
          secureTextEntry
        />
        <TextInput
          placeholder="Confirm password"
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
          style={styles.input}
          secureTextEntry
        />
        <PasswordError />
        {/* <PhoneInput
                    ref={phoneInput}
                    value={phoneNumber}
                    containerStyle={styles.phoneNumberContainer}
                    textContainerStyle={styles.phoneNumberInput}
                    defaultCode="CA"
                    placeholder="Mobile"
                    onChangeCountry={(text) => setPhoneNumber(text)}
                    onChangeText={(text) => setPhoneNumber(text)}
                    onChangeFormattedText={(text) => setPhoneNumber(text)}
                ></PhoneInput> */}
      </View>

      {/* TODO validate fields before going to the next page */}
      <View style={styles.nextButton}>
        <Icon
          raised
          name="chevron-right"
          type="font-awesome"
          reverse
          color={"#258FFF"}
          onPress={validateForm}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  inputContainer: {
    marginTop: 30,
    width: "80%",
  },
  signUpTextView: {
    marginTop: 60,
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
    height: "16%",
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
    marginTop: 20,
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
    position: "absolute",
    bottom: 50,
    right: 50,
  },
  dirtyField: {
    fontStyle: "italic",
    color: "red",
  },
});
