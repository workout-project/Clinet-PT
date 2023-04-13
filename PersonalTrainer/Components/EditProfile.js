import { StyleSheet, Text, View, Button, TextInput } from 'react-native'
import React, { useState , useEffect} from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useUserContext } from '../Hooks/UseUserContext'
import { useLogout } from '../Hooks/UseLogout'
// import SelectDropdown from 'react-native-select-dropdown'
import axios from 'axios'
import useDetailsContext from '../Hooks/UseDetailsContext.js'
import { useNavigation } from '@react-navigation/native'
import * as Location from 'expo-location';


const EditProfile = () => {
    const { dispatch, details } = useDetailsContext()
    const { user } = useUserContext();
    const { logout } = useLogout()
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [about, setAbout] = useState()
    const [postcode, setPostcode] = useState()
    const [lat, setLat] = useState()
    const [long, setLong] = useState()
    const navigation = useNavigation()
    

    

    const addressHandler = async (e) => {
        e.preventDefault();
        await Location.geocodeAsync(postcode)
            .then((res) => {
                // console.log(res[0].latitude)
                setLat(res[0].latitude)
                setLong(res[0].longitude)
            }).catch((error) => console.log(error))
    }
        
    
    const handleSubmit = async (e) => {
        e.preventDefault();



        // const details = { latitude: lat, longitude: long, about, firstName, lastName }
        const update = { latitude: lat, longitude: long, about, firstName, lastName }
        console.log(update)

        await axios.patch("http://localhost:8080/signupPT", update, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
            .then((res) => {
                dispatch({
                    type: 'CREATE_DETAILS',
                    payload: res.data[0]
                })
                navigation.navigate('Home')
            })
            .catch((error) => console.log(error))
    }
    // console.log(details && (details.weight.toString()))

    return (

        <SafeAreaProvider>
            <Text>UserProfile: </Text>
            <TextInput placeholder='First Name' defaultValue={user.firstName} label="First Name" style={styles.nameBox} onChangeText={(firstName) => setFirstName(firstName)} />
            <TextInput placeholder='Last Name' defaultValue={user.lastName} label="Last Name" style={styles.nameBox} onChangeText={(lastName) => setLastName(lastName)} />
            <TextInput placeholder='Your postcode' style={styles.nameBox} onChangeText={(postcode) => setPostcode(postcode)} />
            <Button onPress={addressHandler} title='set address' />
            <TextInput placeholder='Tell us about yourself' style={styles.nameBox} onChangeText={(about) => setAbout(about)} />
            <SafeAreaProvider>
                

                <Button title='update' onPress={handleSubmit} />
                {/* {user && (
                    <Button onPress={handleClick} title='Log out' />
                )} */}
            </SafeAreaProvider>

        </SafeAreaProvider>
    )
}

export default EditProfile

const styles = StyleSheet.create({
    nameBox: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1
    }
})

// defaultValue = { details && (details.weight.toString())}
// defaultValue = { details && (details.height.toString())}
// defaultValue = { details && (details.fitnessGoal)}