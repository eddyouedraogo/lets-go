
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/Authentication/LoginScreen';
import SignUpScreen from './screens/Signup/SignUpScreen';
import { useEffect, useState } from 'react';
import { FIREBASE_AUTH } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import PasswordResetScreen from './screens/Authentication/PasswordResetScreen';
import FavoriteCitiesSelectionScreen from './screens/Signup/FavoriteCitiesSelectionScreen';
import PointOfInterestSelectionScreen from './screens/Signup/PointOfInterestSelectionScreen';
import Tabs from './screens/Home/Tabs';


const Stack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();

function InsideLayout() {
  return (
    <Tabs/>
  )
}

function AuthLayout() {
  return (
    <AuthStack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
      <Stack.Screen name="Sign Up" component={SignUpScreen} />
      <Stack.Screen name="Password Reset" component={PasswordResetScreen} />
      <Stack.Screen options={{ headerShown: false }} name="Favorite Cities" component={FavoriteCitiesSelectionScreen} />
      <Stack.Screen options={{ headerShown: false }} name="Point of Interests" component={PointOfInterestSelectionScreen} />
    </AuthStack.Navigator>
  )
}
export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      // console.log('user', user);
      setUser(user);
    })
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        {user ? (
          <Stack.Screen options={{ headerShown: false }} name='Inside' component={InsideLayout} />
        ) :
          <Stack.Screen options={{ headerShown: false }} name="Auth" component={AuthLayout} />
        }
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
