import { View, Text, Alert, StyleSheet, TouchableOpacity } from 'react-native'
import React, {useContext} from 'react'
import { AuthContext } from '../context/authContext'
import AsyncStorage from '@react-native-async-storage/async-storage'
import HeaderLogo from './HeaderLogo'
import Logout from './LogoutIcon'

const HeaderMenu = ({navigation}) => {

    const handleLogout = async ( )=> {
        // setState({ token: "", user: null});
        await AsyncStorage.removeItem("@auth");
        Alert.alert("Logout Successfully");
        // navigation.navigate("Login")
    }

    return (
    // const [state,setState] = useContext(AuthContext);
    
    <View>
      <View style={styles.container}>
        <HeaderLogo></HeaderLogo>
        <Text style={styles.pagetitle}>RECIPE SHARE</Text>/
        <TouchableOpacity style={styles.btn} onPress={handleLogout}> 
        <Logout></Logout>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#deb887',
        flexDirection : "row",
        marginVertical:10,
        marginHorizontal:12,
        paddingLeft: 5,
        paddingRight:10,
        paddingVertical: 5,
        borderRadius: 20,
        justifyContent: "space-between",
    },
    pagetitle:{
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#2f4f4f',
        paddingVertical: 10,
    },
    btn: {
        backgroundColor: '#2f4f4f',
        height: 40,
        width:40,
        borderRadius: 10,
        justifyContent: 'center',
        marginVertical: 5,
    },
})
export default HeaderMenu