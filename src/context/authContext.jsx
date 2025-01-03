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
    axios.defaults.baseURL = "https://recipe-share-code.onrender.com"
    // axios.defaults.baseURL = "http://192.168.0.105:8080"

    //initial local storage data
    useEffect(() => {
        const getLocalStorageData = async () => {
            let data = await AsyncStorage.getItem('@auth')
            let loginData = JSON.parse(data)
            setState({...state, user: loginData?.user, token: loginData?.token})
            //  console.log('Local storage =>',data)
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