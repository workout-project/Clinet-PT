import axios from "axios";
import { useState } from "react";
import { useUserContext } from "./UseUserContext";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useSignup = () => {

    const { dispatch } = useUserContext();

    //useState for loading and errors
    const [error, setError] = useState(null);
    const [isLoading, setIsLoadig] = useState(null);

    const setUser = async (data) => {
        try {
            const user = await AsyncStorage.setItem('user', JSON.stringify(data))
        } catch (error) {
            console.log('hook error', error)

        }
    }

    //signup async function
    const signup = async (firstName, lastName, email, password) => {

        //at first isLoading is true and no error
        setError(null)
        setIsLoadig(true)

        try {
            //fetching data using axios
            const res = await axios.post('http://localhost:8080/signupPT', {
                firstName, lastName, email, password
            })
            await setUser(res.data)

            dispatch({ type: 'LOGIN', payload: res.data })
            console.log(res.data)

            //updating the loading state
            setIsLoadig(false)

        } catch (error) {
            if (error.response) {
                setError(error.response.data.error)
                setIsLoadig(false)
            }
        }


    }
    return { signup, isLoading, error }
}


