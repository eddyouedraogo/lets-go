import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FIREBASE_AUTH } from '../firebase'

const HomeScreen = ({navigation}) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Button onPress={() => navigation.navigate('SignUp')} title="Open Details"></Button>
      <Button onPress={() => FIREBASE_AUTH.signOut()} title="Logout"></Button>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})