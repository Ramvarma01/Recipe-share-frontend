import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, ActivityIndicator } from 'react-native';
import React, { useState, useContext } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/authContext';
import Logo from '../components/Logo';
import styles from "../Styles";
import Icon from '@react-native-vector-icons/fontawesome';

function Login({ navigation }) {
    const [state, setState] = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    // 🔍 Validate Inputs
    const validateFields = () => {
        let newErrors = {};
        if (!username) newErrors.username = "Username is required";
        else if (username.length > 10) newErrors.username = "Username can only have 10 characters";

        if (!password) newErrors.password = "Password is required";
        else if (password.length < 6) newErrors.password = "Password must be at least 6 characters";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // 🔑 Handle Login
    const handleLogin = async () => {
        if (!validateFields()) return;

        try {
            setLoading(true);
            const { data } = await axios.post('/login', { username, password });

            if (data.success) {
                setState(data);
                // await AsyncStorage.setItem('@auth', JSON.stringify({data}));
                await AsyncStorage.setItem('@auth', JSON.stringify({ token: data.token, user: data.user }));

                console.log('Local storage after login=>',await AsyncStorage.getItem('@auth'),);
                // navigation.navigate('Home');  // Redirect after login
            }
            Alert.alert(data.message);
        } catch (error) {
            Alert.alert("Error", error.response?.data?.message || "Something went wrong");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const userlogo = <Icon name="user" size={20} color="#555" style={styles.inputIcon} />
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="always">
            <View style={styles.container}>
                <Logo />
                <Text style={styles.pageTitle}>Login</Text>

                <View style={{ margin: 20 }}>
                    <TextInput placeholder="Username" value={username} onChangeText={setUsername} style={styles.inputBox} />
                    {errors.username && <Text style={styles.validityText}>{errors.username}</Text>}

                    <TextInput placeholder="Password" value={password} onChangeText={setPassword} style={styles.inputBox} secureTextEntry={true} />
                    {errors.password && <Text style={styles.validityText}>{errors.password}</Text>}

                    <Text style={styles.forgotPassword} onPress={() => navigation.navigate('ForgotPassword')}>Forgot Password?</Text>

                    <TouchableOpacity style={styles.btn} onPress={handleLogin} disabled={loading}>
                        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.btnText}>LOGIN</Text>}
                    </TouchableOpacity>

                    <Text style={styles.linkText}>
                        New user?{' '}
                        <Text style={styles.innerLinkText} onPress={() => navigation.navigate('Register')}>
                            Register
                        </Text>
                    </Text>
                </View>
            </View>
        </ScrollView>
    );
}

export default Login;
