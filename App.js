import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import SignUpScreen from './screens/SignUpScreen';
import { useEffect, useState } from 'react';
import { FIREBASE_AUTH } from './firebase';
import { onAuthStateChanged } from'firebase/auth';
import PasswordResetScreen from './screens/PasswordResetScreen';


const Stack = createNativeStackNavigator();
const InsideStack = createNativeStackNavigator();

function InsideLayout() {
  return (
    <InsideStack.Navigator>
      <InsideStack.Screen name="Home" component={HomeScreen} />
    </InsideStack.Navigator>
  )
}
export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log('user', user);
      setUser(user);
    })
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        {user ? (
          <Stack.Screen options={{headerShown: false}} name='Inside' component={InsideLayout}/>
        ):
        <Stack.Screen options={{headerShown: false}} name="Login" component={LoginScreen} />
        }
        <Stack.Screen name="Sign Up" component={SignUpScreen} />
        <Stack.Screen name="Password Reset" component={PasswordResetScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
