import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Signup from '../Components/Signup.js'
import Login from '../Components/Login.js'
import Home from '../Components/Home.js'
import { useUserContext } from '../Hooks/UseUserContext.js'
import EditProfile from '../Components/EditProfile.js'


const Stack = createNativeStackNavigator()


const StackNavigator = () => {
  const { user } = useUserContext()
  
  return (
      <Stack.Navigator screenOptions={{headerShown: true}}>
          <Stack.Group>
            {!user && <Stack.Screen name='Signup' component={Signup} />}
            {!user && <Stack.Screen name='Login' component={Login} />}
            {user && <Stack.Screen name='Home' component={Home} />}        
      </Stack.Group>
      <Stack.Group>
        <Stack.Screen name='Edit' component={EditProfile}/>
      </Stack.Group>
    </Stack.Navigator>
  )
}

export default StackNavigator

const styles = StyleSheet.create({})