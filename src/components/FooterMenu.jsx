import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import Home from './HomeIcon'
import Post from './PostIcon'
import Search from './Search.Icon'
import Profile from './ProfileIcon'
// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

const FooterMenu = () => {
  return (
    <View style= {styles.container}>
      <TouchableOpacity style={styles.btn}>
      <Home></Home>
      {/* <Text style={styles.btnText}>Home</Text> */}
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn}>
        <Post></Post>
      {/* <Text style={styles.btnText}>Post</Text> */}
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn}>
        <Search></Search>
      {/* <Text style={styles.btnText}>Search</Text> */}
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn}>
        <Profile></Profile>
      {/* <Text style={styles.btnText}>Profile</Text> */}
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#deb887',
        flexDirection : "row",
        marginVertical:10,
        marginHorizontal:12,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20,
        justifyContent: "space-between",
    },
    btn: {
        backgroundColor: '#2f4f4f',
        height: 40,
        width:70,
        borderRadius: 15,
        justifyContent: 'center',
        marginVertical: 5,
    },
    btnText: {
        color: '#ffffff',
        fontWeight: '500',
        textAlign: 'center',
        fontSize: 10,
    },
})

export default FooterMenu