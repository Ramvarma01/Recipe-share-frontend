import { View, Text, Alert, StyleSheet, TouchableOpacity } from 'react-native'
import React, {useContext} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Icon from '@react-native-vector-icons/fontawesome'
import Logo from './Logo'
import { AuthContext } from '../context/authContext'
import { useNavigation } from '@react-navigation/native'

const Applogo =() => {
  const navigation =useNavigation();
  return (
    <TouchableOpacity style={{margin:10}} onPress={() => navigation.navigate('Home')}>
  <Logo style={styles.logo}></Logo>
  </TouchableOpacity>
  )
}

const Logoutlogo = () => {
const [state,setState] = useContext(AuthContext);

    const handleLogout = async ( )=> {
        setState({ token: "", user: null});
        // console.log("State after logout =>",state);
        await AsyncStorage.removeItem("@auth");
        // let data = await AsyncStorage.getItem('@auth');
        //  console.log('Local storage after logout =>',data);
        Alert.alert("Logout Successfully");
        // navigation.navigate("Login")
    }
    return (
      <View>
    {/* <View style={{justifyContent:"flex-end"}}>
      <View style={styles.container}>
        <Logo style={styles.logo}></Logo>
        <Text style={styles.pagetitle}>RECIPE SHARE</Text> */}
        <TouchableOpacity style={styles.btn} onPress={handleLogout}> 
          <Icon name= "sign-out" size={25} color="#b22222"></Icon>
        </TouchableOpacity>
      {/* </View>
    </View> */}
    </View>
  )
}

const Editlogo =() => {
  const navigation =useNavigation()
  return (
    <TouchableOpacity style={{margin:20}} onPress={() => navigation.navigate('EditProfile')}>
      <Icon name= "pencil-square-o" size={25} color="darkgreen"></Icon>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#ffffff',
        flexDirection : "row",
        // marginVertical:10,
        // marginHorizontal:12,
        // paddingLeft: 5,
        // paddingRight:10,
        // paddingVertical: 5,
        // borderRadius: 20,
        paddingHorizontal: 10,
        justifyContent: "space-between",
    },
    pagetitle:{
        fontSize: 25,
        fontWeight: '600',
        textAlign: 'center',
        color: '#2f4f4f',
        alignSelf: "center",
        // justifyContent: "center"
        // paddingVertical: 10,
    },
    btn: {
        // backgroundColor: '#2f4f4f',
        // height: 40,
        // width:40,
        // borderRadius: 10,
        // marginVertical: 10,
        marginHorizontal:15,
        justifyContent: 'center',
        // marginVertical: 5,
    },
    logo: {
      width: 60,
      height: 60,
  },
})

// export default HeaderMenu
// export default HeaderLogo
export { Applogo, Logoutlogo, Editlogo};