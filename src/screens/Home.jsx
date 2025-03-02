import { View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView, Image } from 'react-native'
import React, {useContext, useState} from 'react'
import { PostContext } from '../context/postContext'
import Icon from '@react-native-vector-icons/fontawesome'
import moment from "moment";
import Dropdown from '../components/Dropdown';

const Home = ({navigation}) => {
    const [posts,setPosts, getAllPosts]= useContext(PostContext);
    
  return (
    <View style ={styles.container}>
      <ScrollView 
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="always">
      <View>
       {posts?.map((post, i) => (
        <TouchableOpacity key={i} onPress={() => navigation.navigate('ViewRecipe', { recipe: post })}>
        {/* <View style={style.card} key={i}> */}
        <View style={styles.card}>
           <View>
              {post.photos? ( <Image
                 source={{uri: post.photos[0]}}
                  style={styles.recipeImage}
                  />): <></>}
            </View>
          <View style={{padding:10,width:"70%"}}>
          <Text style={styles.title}>{post?.title}</Text>
          <Text style={styles.desc}> {post?.description}</Text>
          <View style={styles.footer}>
            <View>
            {post?.user_id?.username && (
              <Text>
                {" "}
                <Icon name="user-o" color={"red"} />{" "}
                {post?.user_id?.username}
              </Text>
             )}
             </View>
            <Text>
              {" "}
              <Icon name="clock-o" color={"red"} />{" "}
              {/* {moment(post?.createdAt).format("DD MMM, YYYY")} */}
              {moment().diff(moment(post?.createdAt), 'years') >= 1 ? moment(post?.createdAt).format("DD MMM, YYYY") : moment(post?.createdAt).format("DD MMM")}
            </Text>
           </View>
           </View>
        </View>
        </TouchableOpacity>
      ))}
    </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: '#f0f8ff'
  },
  card: {
    // width: "95%",
    flexDirection: 'row',
    backgroundColor: "#fff",
    borderWidth: 0.2,
    borderColor: "gray",
    padding: 10,
    borderRadius: 5,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    // marginRight:10,
  },
  recipeImage: {
    width: 90,
    height: 90,
    borderRadius: 5,
    borderWidth:1.5,
    marginRight:10,
  },
  title: {
    fontWeight: "bold",
    paddingBottom: 10,
    borderBottomWidth: 0.3,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  desc: {
    marginTop: 10,
  },
});

export default Home