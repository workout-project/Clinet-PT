import { StyleSheet, Text, View, Button, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useUserContext } from '../Hooks/UseUserContext'
import { useLogout } from '../Hooks/UseLogout'
// import SelectDropdown from 'react-native-select-dropdown'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native'
import useDetailsContext from '../Hooks/UseDetailsContext'
const Profile = () => {

    const { dispatch, details } = useDetailsContext()
    const { user } = useUserContext()
    const navigation = useNavigation()

    console.log(details)
    useEffect(() => {
        const fetchData = async () => {
            await axios.get('http://localhost:8080/signupPT', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
                .then((res) => {

                    dispatch({
                        type: 'SET_DETAILS',
                        payload: res.data[0]
                    })
                })
                .catch((error) => {
                    console.log(error)
                })
        }

        if (user) {
            fetchData()
        }
        //setting the details

        // userDetails = details
        // setFirstName(details.firstName)
        // setLastName(details.lastName)
        // setGender(details.gender)
        // setFitnessGoal(details.fitnessGoal)
        // setWeight(details.weight)
        // setHeight(details.height)

    }, [dispatch, user])
    // console.log('details are: ', details)

    return (

        <SafeAreaProvider>
            <Text>UserProfile: </Text>
            {/* <Text style={styles.nameBox}>First name: {details && (details.firstName)}</Text> */}
            <Text style={styles.nameBox}>First name: {details && (Array.isArray(details) ? details[0].firstName : details.firstName) }</Text>
            <Text style={styles.nameBox}>First name: {details && (Array.isArray(details) ? details[0].lastName : details.lastName)}</Text>
            <Text style={styles.nameBox}>Email: {details && (Array.isArray(details) ? details[0].email : details.email)}</Text>
            <Text style={styles.nameBox}>About you: {details && (Array.isArray(details) ? details[0].about : details.about)}</Text>



        </SafeAreaProvider>
    )
}

export default Profile

const styles = StyleSheet.create({
    nameBox: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1
    }
})