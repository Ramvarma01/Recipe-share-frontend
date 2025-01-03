import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, } from 'react-native'
import React, { useState, useContext } from 'react'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
// import InputBox from '../components/InputBox'
import { AuthContext } from '../context/authContext'
import Logo from '../components/Logo'
import styles from "../Styles"

function Login({ navigation }) {
    const [state, setState] =useContext(AuthContext)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [fieldVerify, setFieldVerify] = useState(true)
    const [loading, setLoading] = useState(false)

    const handle = async () => {
        try {
            setLoading(true)
            if (username && password) {
                // Alert.alert(`OTP has been sent to ${email}`);
                // Alert.alert("Logged in");
                const {data} = await axios.post('/login',{username,password}) ;
                Alert.alert(data && data.message);
                setState(data)
                await AsyncStorage.setItem('@auth',JSON.stringify(data));
                console.log('Login Data==>', { username, password })
                if(data.success == true)
                {navigation.navigate("Home")}
            } else {
                setFieldVerify(false)
                // Alert.alert("Please fill in all fields.");
            }
            setLoading(false)

        } catch (error) {
             Alert.alert(error.response.data.message);
            setLoading(false)
            console.log(error)
        }
    };

    const getLoaclStorage = async () => {
        let data = await AsyncStorage.getItem('@auth');
         console.log('Local storage =>',data);
    }
getLoaclStorage();

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={"always"}>
            <View style={styles.container}>
                <Logo></Logo>
                <Text style={styles.pageTitle}>Login</Text>

                <View style={{ margin: 20, }}>
                    <TextInput placeholder='Username' value={username} onChangeText={setUsername} style={styles.inputBox} />

                    <TextInput placeholder='Password' value={password} onChangeText={setPassword} style={styles.inputBox} secureTextEntry={true} />

                    <Text style={styles.forgotPassword}>Forgot Password</Text>

                    {fieldVerify ? null : (<Text style={styles.validityText}>Please fill in all fields !!</Text>)}

                    <TouchableOpacity style={styles.btn} onPress={handle}>
                        <Text style={styles.btnText}>{loading ? "Please wait..." : "LOGIN"}</Text>
                    </TouchableOpacity>

                    <Text style={styles.linkText}>New user{" "}
                        <Text
                            style={styles.innerLinkText}
                            onPress={() => navigation.navigate('Register')}>
                            Register
                        </Text>
                    </Text>
                </View>
                {/* <Text>{JSON.stringify({ username, password }, null, 4)}</Text> */}
            </View >
        </ScrollView>
    )
}

export default Login