import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import React, {useContext} from 'react'
import { AuthContext } from '../context/authContext'
import FooterMenu from '../components/FooterMenu'
import HeaderMenu from '../components/HeaderMenu'
import AsyncStorage from '@react-native-async-storage/async-storage'
import HeaderLogo from '../components/HeaderLogo'
import Logout from '../components/LogoutIcon'

const Home = ({navigation}) => {
    const [state]= useContext(AuthContext)
    const handleLogout = async ( )=> {
      // setState({ token: "", user: null});
      await AsyncStorage.removeItem("@auth");
      Alert.alert("Logout Successfully");
      navigation.navigate("Login")
  }
  return (
    <>
      <View style={styles.Headercontainer}>
        <HeaderLogo></HeaderLogo>
        <Text style={styles.pagetitle}>RECIPE SHARE</Text>/
        <TouchableOpacity style={styles.btn} onPress={handleLogout}> 
        <Logout></Logout>
        </TouchableOpacity>
      </View>

    <View style ={styles.container}>
      
      <Text>{JSON.stringify(state, null, 4)}</Text>
    </View>
    <FooterMenu></FooterMenu>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
      flex:1,
      justifyContent: "space-between",
      margin: 10,
      // backgroundColor: '#deb887',
  },
  Headercontainer:{
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
export default Home