
// import { View, Text, StyleSheet, Button, TextInput, Alert, TouchableOpacity, ScrollView } from 'react-native'
// import React, { useState } from 'react'
// import Logo from "../components/Logo"
// import styles from "../Styles"
// import axios from 'axios'
// // import InputBox from '../component<TextInput'

// function Register({ navigation }) {

//     //useStates or variables    
//     const [name, setName] = useState('')
//     const [username, setUsername] = useState('')
//     const [email, setEmail] = useState('')
//     const [password, setPassword] = useState('')
//     const [confirmPassword, setConfirmPassword] = useState('')
//     // const [nameVerify, setNameVerify] = useState(true)
//     // const [usernameVerify, setUsernameVerify] = useState(true)
//     // const [emailVerify, setEmailVerify] = useState(false)
//     // const [passwordVerify, setPasswordVerify] = useState(false)
//     // const [confirmPasswordVerify, setConfirmPasswordVerify] = useState(true)
//     const [fieldVerify, setFieldVerify] = useState(true)
//     const [loading, setLoading] = useState(false)


//     //functions
//     const handle = async () => {
//         setFieldVerify(true)
//         // setConfirmPasswordVerify(true)
//         try {
//             setLoading(true)
//             if (name && username && email && password && confirmPassword) {
//                 if (password !== confirmPassword) {

//                      Alert.alert("Passwords do not match!");
//                     // setConfirmPasswordVerify(false)
//                 } 
//                 else {
//                     // Alert.alert(`OTP has been sent to ${email}`);
//                     // Alert.alert("Registered SuccessFully");
//                     const {data} = await axios.post('/register',{name,username,email,password}) ;
//                     Alert.alert(data && data.message);
//                     console.log('Register Data==>', { name, username, email, password });
                    
//                     if (data.success==true)
//                     {return navigation.navigate('Login')}
//                 }
//             } else {
//                 setFieldVerify(false)
//                 // Alert.alert("Please fill in all fields.");
//             }
//             setLoading(false)
//         } catch (error) {
//             Alert.alert(error.response.data.message);
//             setLoading(false);
//             console.log(error);
//         }
//     }

//     // const nameHandle = (e) => {
//     //     const title = e.nativeEvent.text
//     //     setName(title)
//     //     setNameVerify(true)
//     //     if (title.length < 1) {
//     //         setNameVerify(false)
//     //     }
//     // }

//     return (
//         <ScrollView contentContainerStyle={{ flexGrow: 1, }} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={"always"}>
//             <View style={styles.container} >

//                 <Logo />

//                 <Text style={styles.pageTitle}>Register</Text>

//                 <View style={{ margin: 20, }}>
//                     <TextInput placeholder='Name' value={name} onChangeText={setName} style={styles.inputBox} />

//                     {/* {nameVerify ? null : (<Text style={styles.validityText}>improper name</Text>)} */}

//                     <TextInput placeholder='Username' value={username} onChangeText={setUsername} style={styles.inputBox} autoComplete='off' />

//                     <TextInput placeholder='Email ID' value={email} onChangeText={setEmail} style={styles.inputBox} keyboardType='email-address' />

//                     <TextInput placeholder='Password' value={password} onChangeText={setPassword} style={styles.inputBox} secureTextEntry={true} />

//                     <TextInput placeholder='Confirm Password' value={confirmPassword} onChangeText={setConfirmPassword} style={styles.inputBox} secureTextEntry={true} />

//                     {/*Validation */}

//                     {/* {confirmPasswordVerify ? null : (<Text style={styles.validityText}>Passwords do not match !!</Text>)} */}
//                     {fieldVerify ? null : (<Text style={styles.validityText}>Please fill in all fields !!</Text>)}

//                     <TouchableOpacity style={styles.btn} onPress={handle}>
//                         <Text style={styles.btnText}>{loading ? "Please wait..." : "REGISTER"}</Text>
//                     </TouchableOpacity>

//                     <Text style={styles.linkText}>Already a user{" "}
//                         <Text
//                             style={styles.innerLinkText}
//                             onPress={() => navigation.navigate('Login')}>
//                             Login
//                         </Text>
//                     </Text>

//                 </View>
//                 {/* <Text>{JSON.stringify({ name, username, email, password, confirmPassword }, null, 4)}</Text> */}
//             </View >
//         </ScrollView >
//     )
// }

// export default Register

import { View, Text, StyleSheet, TextInput, Alert, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import Logo from "../components/Logo";
import styles from "../Styles";
import axios from 'axios';

function Register({ navigation }) {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const validateFields = () => {
        let newErrors = {};

        if (!name) newErrors.name = "Name is required";
        else if (name.length > 20) newErrors.name = "Name can only have 20 characters";

        if (!username) newErrors.username = "Username is required";
        else if (username.length > 10) newErrors.username = "Username can only have 10 characters";

        if (!email) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Invalid email format";
        
        if (!password) newErrors.password = "Password is required";
        else if (password.length < 6) newErrors.password = "Password must be at least 6 characters";
        
        if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match";
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleRegister = async () => {
        if (!validateFields()) return;

        try {
            setLoading(true);
            const { data } = await axios.post('/register', { name, username, email, password });

            Alert.alert(data.message);
            if (data.success) navigation.navigate('Login');
        } catch (error) {
            Alert.alert("Error", error.response?.data?.message || "Something went wrong");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="always">
            <View style={styles.container}>
                <Logo />
                <Text style={styles.pageTitle}>Register</Text>

                <View style={{ margin: 20 }}>
                    <TextInput placeholder="Name" value={name} onChangeText={setName} style={styles.inputBox} />
                    {errors.name && <Text style={styles.validityText}>{errors.name}</Text>}

                    <TextInput placeholder="Username" value={username} onChangeText={setUsername} style={styles.inputBox} autoComplete="off" />
                    {errors.username && <Text style={styles.validityText}>{errors.username}</Text>}

                    <TextInput placeholder="Email ID" value={email} onChangeText={setEmail} style={styles.inputBox} keyboardType="email-address" />
                    {errors.email && <Text style={styles.validityText}>{errors.email}</Text>}

                    <TextInput placeholder="Password" value={password} onChangeText={setPassword} style={styles.inputBox} secureTextEntry={true} />
                    {errors.password && <Text style={styles.validityText}>{errors.password}</Text>}

                    <TextInput placeholder="Confirm Password" value={confirmPassword} onChangeText={setConfirmPassword} style={styles.inputBox} secureTextEntry={true} />
                    {errors.confirmPassword && <Text style={styles.validityText}>{errors.confirmPassword}</Text>}

                    <TouchableOpacity style={styles.btn} onPress={handleRegister} disabled={loading}>
                        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.btnText}>REGISTER</Text>}
                    </TouchableOpacity>

                    <Text style={styles.linkText}>
                        Already a user?{' '}
                        <Text style={styles.innerLinkText} onPress={() => navigation.navigate('Login')}>
                            Login
                        </Text>
                    </Text>
                </View>
            </View>
        </ScrollView>
    );
}

export default Register;
