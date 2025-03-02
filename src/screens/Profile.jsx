import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import axios from "axios";
import Icon from "@react-native-vector-icons/fontawesome";
import { PostContext } from "../context/postContext";
import moment from "moment";
import { useFocusEffect } from "@react-navigation/native";
import { launchImageLibrary } from 'react-native-image-picker';

const Profile = ({navigation}) => {
//GLOBAL STATES
  const [state, setState] = useContext(AuthContext);
  const [posts, setPosts,getAllPosts]= useContext(PostContext);
  const { user, token } = state;

//LOCAL STATES
  const [loading, setLoading] = useState(false);
  const [userPosts, setUserPosts]= useState([]);

//GET USERS ALL POSTED RECIPES
  const getUserPosts = async () => {
    setLoading(true);
    try {
      const {data} = await axios.post("/get-user-post",{user_id: user._id});
      setUserPosts(data?.posts);
    } catch (error) {
        Alert.alert(error.response?.data?.message);
        console.log(error);
      } finally {
        setLoading(false);
      }
  };

// ALERT FOR DELETEING RECIPE 
  const handleDeletePrompt = (recipeId) => {
    Alert.alert(
      "Delete Recipe",
      "Are you sure you want to delete this recipe?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => handleDelete(recipeId),
        },
      ]
    );
  };

// HANDLE DELETE RECIPE
  const handleDelete = async (recipeId) => {
    try {
      setLoading(true);
      const {data}= await axios.delete(`/delete-post/${recipeId}`);
      // setPosts(posts.filter((post) => post._id !== recipeId));
      Alert.alert(data?.message);
      getUserPosts();
      getAllPosts();
    } catch (error) {
      Alert.alert(error.response?.data?.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getUserPosts();
    }, [])
  );

  return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} 
         keyboardShouldPersistTaps="always"
        >

        <View style={styles.header}>
          <Text style={styles.username}>{user.username}</Text>
        </View>

        <View style={styles.profileInfo}>
          {user.profileImage ? (
                <Image source={{ uri: user.profileImage }} style={styles.profileImage} />
               ) : (
                <Image source={{ uri: "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png",}} 
                       style={styles.profileImage} 
              />
              )}
          <View style={styles.userDetails}>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.email}>{user.email}</Text>
            
            <View style={styles.followCounts}>
             <View style={styles.followCount}>
                <Text style={styles.followCountNumber}>{userPosts?.length}</Text>
                <Text>Total Recipes</Text>
              </View>
              {/* <View style={styles.followCount}>
                <Text style={styles.followCountNumber}>{user.followers}</Text>
                <Text>Followers</Text>
              </View>
              <View style={styles.followCount}>
                <Text style={styles.followCountNumber}>{user.following}</Text>
                <Text>Following</Text>
              </View> */}
            </View>

          </View>
        </View>

        <View>
          <Text style={styles.bio}>{user.bio}</Text>
        </View>

        <Text style={styles.sectionTitle}>Recipes</Text>

        <View>
    {loading ? <ActivityIndicator color="#000" size="large"/> :<></>}
      {userPosts?.map((post, i) => (
        <TouchableOpacity key={i} onPress={() => navigation.navigate('ViewRecipe', { recipe: post })}>
       
        <View style={styles.card}>
          <View>
            {post.photos? ( <Image
                    source={{uri: post.photos[0]}}
                    style={styles.recipeImage}
                  />): <></>}
          </View>
          <View style={{padding:10,width:"65%"}}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", borderBottomWidth:0.3 }}>
          
            <Text style={styles.title}>{post?.title}</Text>
          
            <View style={{ flexDirection: "row", justifyContent: "flex-end"}}>
              <TouchableOpacity style={{ marginHorizontal: 20 }} onPress={() => navigation.navigate('EditRecipe', { recipe: post })}>
                <Icon name="pencil-square-o" size={20} color={"darkblue"}/>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => handleDeletePrompt(post?._id)}>
                <Icon name="trash-o" size={20} color={"red"}/>
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.desc}> {post?.description}</Text>
          <View style={styles.footer}>
            {/* {post?.user_id?.username && (
              <Text>
                {" "}
                <Icon name="user-o" color={"red"} />{" "}
                {post?.user_id?.username}
              </Text>
            )} */}
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
  );
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#f0f8ff',
      paddingHorizontal: 10,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingTop:16
    },
    username: {
      fontSize: 24,
      fontWeight: 'bold',
      color: "#2f4f4f",
    },
    profileInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
    },
    profileImage: {
      width: 90,
      height: 90,
      borderRadius: 50,
      borderWidth:2.5,
      marginRight: 16,
    },
    userDetails: {
      flex: 1,
    },
    name: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    email: {
      color: 'gray',
    },
    followCounts: {
      flexDirection: 'row',
      marginTop: 8,
    },
    followCount: {
      alignItems: 'center',
      marginRight: 16,
    },
    followCountNumber: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    bio: {
      paddingHorizontal: 16,
      fontWeight: "500",
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginHorizontal: 16,
      marginTop: 16,
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
    // borderBottomWidth: 0.3,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    // marginTop: 10,
  },
  desc: {
    marginTop: 10,
  },
});

export default Profile;