import React,{createContext, useState, useEffect} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

//context
const AuthContext = createContext()

//provider
const AuthProvider =({children}) => {
    //Global state
    const [state, setState] = useState({
        user : null,
        token : "",
    });

    //BaseURL Setting
    axios.defaults.baseURL = "https://recipe-share-code.onrender.com"  //render
    // axios.defaults.baseURL = "http://192.168.0.104:8080"   //home
    // axios.defaults.baseURL = "http://192.168.0.105:8080"   //home 5G
    // axios.defaults.baseURL = "http://192.168.43.88:8080"  //hem

    //initial local storage data
    useEffect(() => {
        const getLocalStorageData = async () => {
            let data = await AsyncStorage.getItem('@auth')
            let loginData = JSON.parse(data)
            setState({...state, user: loginData?.user, token: loginData?.token})
        };
        getLocalStorageData();
    }, []);
    
    return (
        <AuthContext.Provider value ={[state, setState]}>
            {children}
        </AuthContext.Provider>
    )
};

export {AuthContext, AuthProvider}