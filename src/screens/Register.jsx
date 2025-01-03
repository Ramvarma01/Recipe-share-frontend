
import { View, Text, StyleSheet, Button, TextInput, Alert, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Logo from "../components/Logo"
import styles from "../Styles"
import axios from 'axios'
// import InputBox from '../component<TextInput'

function Register({ navigation }) {

    //useStates or variables    
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    // const [nameVerify, setNameVerify] = useState(true)
    // const [usernameVerify, setUsernameVerify] = useState(true)
    // const [emailVerify, setEmailVerify] = useState(false)
    // const [passwordVerify, setPasswordVerify] = useState(false)
    // const [confirmPasswordVerify, setConfirmPasswordVerify] = useState(true)
    const [fieldVerify, setFieldVerify] = useState(true)
    const [loading, setLoading] = useState(false)


    //functions
    const handle = async () => {
        setFieldVerify(true)
        // setConfirmPasswordVerify(true)
        try {
            setLoading(true)
            if (name && username && email && password && confirmPassword) {
                if (password !== confirmPassword) {
                     return Alert.alert("Passwords do not match!");
                    // setConfirmPasswordVerify(false)
                } 
                else {
                    // Alert.alert(`OTP has been sent to ${email}`);
                    // Alert.alert("Registered SuccessFully");
                    const {data} = await axios.post('/register',{name,username,email,password}) ;
                    Alert.alert(data && data.message);
                    console.log('Register Data==>', { name, username, email, password });
                    
                    if (data.success==true)
                    {return navigation.navigate('Login')}
                }
            } else {
                setFieldVerify(false)
                // Alert.alert("Please fill in all fields.");
            }
            setLoading(false)
        } catch (error) {
            Alert.alert(error.response.data.message);
            setLoading(false);
            console.log(error);
        }
    }

    // const nameHandle = (e) => {
    //     const title = e.nativeEvent.text
    //     setName(title)
    //     setNameVerify(true)
    //     if (title.length < 1) {
    //         setNameVerify(false)
    //     }
    // }

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1, }} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={"always"}>
            <View style={styles.container} >

                <Logo />

                <Text style={styles.pageTitle}>Register</Text>

                <View style={{ margin: 20, }}>
                    <TextInput placeholder='Name' value={name} onChangeText={setName} style={styles.inputBox} />

                    {/* {nameVerify ? null : (<Text style={styles.validityText}>improper name</Text>)} */}

                    <TextInput placeholder='Username' value={username} onChangeText={setUsername} style={styles.inputBox} autoComplete='off' />

                    <TextInput placeholder='Email ID' value={email} onChangeText={setEmail} style={styles.inputBox} keyboardType='email-address' />

                    <TextInput placeholder='Password' value={password} onChangeText={setPassword} style={styles.inputBox} secureTextEntry={true} />

                    <TextInput placeholder='Confirm Password' value={confirmPassword} onChangeText={setConfirmPassword} style={styles.inputBox} secureTextEntry={true} />

                    {/*Validation */}

                    {/* {confirmPasswordVerify ? null : (<Text style={styles.validityText}>Passwords do not match !!</Text>)} */}
                    {fieldVerify ? null : (<Text style={styles.validityText}>Please fill in all fields !!</Text>)}

                    <TouchableOpacity style={styles.btn} onPress={handle}>
                        <Text style={styles.btnText}>{loading ? "Please wait..." : "REGISTER"}</Text>
                    </TouchableOpacity>

                    <Text style={styles.linkText}>Already a user{" "}
                        <Text
                            style={styles.innerLinkText}
                            onPress={() => navigation.navigate('Login')}>
                            Login
                        </Text>
                    </Text>

                </View>
                {/* <Text>{JSON.stringify({ name, username, email, password, confirmPassword }, null, 4)}</Text> */}
            </View >
        </ScrollView >
    )
}

export default Register