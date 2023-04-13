import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLogout } from '../Hooks/UseLogout'
import Profile from './Profile'
import { useNavigation } from '@react-navigation/native'

const Home = () => {
    const navigation = useNavigation()
    const {logout} = useLogout()
    const btnHandler = (e) => {
        e.preventDefault()
        logout()

    }
  return (
    <View style={styles.home}>
          <Text>Home</Text>
          <Button onPress={btnHandler} title='Log out' />
          <Button onPress={()=> navigation.navigate('Edit')} title='Update Profile' />
          <Profile />
          
          
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
    home: {
        backgroundColor: 'cyan'
    }
})