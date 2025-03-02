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
  import { launchImageLibrary } from 'react-native-image-picker';
  import { useNavigation } from '@react-navigation/native'

  const EditProfile = () => {
      const navigation =useNavigation();

  //GLOBAL STATES
    const [state, setState] = useContext(AuthContext);
    const { user, token } = state;
  
  //LOCAL STATES
    const [name, setName] = useState(user?.name);
    const [username, setUsername] = useState(user?.username);
    const [password, setPassword] = useState(user?.password);
    // const [password, setPassword] = useState(state?.password);
    const [email] = useState(user?.email);
    const [bio,setBio] = useState(user?.bio);
    const [profileImage, setProfileImage] = useState(user?.profileImage);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
  
  //VALIDATION
    const validateFields = () => {
      let newErrors = {};
  
      if (!name) newErrors.name = "Name is required";
      else if (name.length > 20) newErrors.name = "Max 20 characters";
  
      if (!username) newErrors.username = "Username is required";
      else if (username.length > 10) newErrors.username = "Max 10 characters";
      
       if (password && password.length < 6) newErrors.password = "Password must be at least 6 characters"
      
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
  };
  
  //UPLOAD PROFILE IMAGE
    const selectImage = () => {
      const options = {
        mediaType: 'photo',
        maxWidth: 300,
        maxHeight: 300,
        quality: 1,
      };
  
      launchImageLibrary(options, (response) => {
        if (response.didCancel) {
            console.log('User cancelled image picker');
        } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
        } else if (response.assets && response.assets.length > 0) {
            const selectedImage = response.assets[0].uri;
            setProfileImage(selectedImage);
        }
      });
    };
  
  //HANDLE UPDATE USER DATA
    const handleUpdate = async () => {
    //   const navigation =useNavigation();
      if (!validateFields()) return;
      try {
        setLoading(true);
        const {data}  = await axios.put("/update-user", {
          name: name || undefined,
          username: username || undefined,
          password: password || undefined, // Only send password if changed
          email,
          profileImage, 
        //   {
        //     uri: profileImage,
        //     name: 'profile.jpg',
        //     type: 'image/jpeg',
        // } || undefined,
        bio: bio || undefined,
        });
        Alert.alert(data && data.message, "!! Please Login again");
        setState({ token: "", user: null});   //to navigate to login
      } catch (error) {
        Alert.alert(error.response?.data?.message);
        console.log(error);
      } finally {
        setLoading(false);
      };
    };

    return (
        <View style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false} 
          keyboardShouldPersistTaps="always"
          >

           <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
             <Icon name="arrow-left" size={24} color="#000" />
           </TouchableOpacity>

            <View style={styles.profileContainer}>
              <TouchableOpacity onPress={selectImage}>
                 {profileImage ? (
                    <Image source={{ uri: profileImage }} style={styles.profileImage} />
                   ) : (
                    <Image source={{ uri: "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png",}} 
                           style={styles.profileImage} 
               />
                  )}
              </TouchableOpacity>
               {profileImage ?<Text>Tap to change</Text>:<Text>Tap to upload</Text>}
            </View>

            <Text style={styles.warningtext}>
               You Can Only Update Your Name, Username, Bio & Password*
            </Text>
    
            <View style={styles.inputContainer}>
              <Text style={styles.inputText}>Name</Text>
              <View>
              <TextInput
                style={styles.inputBox}
                value={name}
                onChangeText={(text) => setName(text)}
              />
              {errors.name && <Text style={styles.validityText}>{errors.name}</Text>}
              </View>
            </View>
          
            <View style={styles.inputContainer}>
              <Text style={styles.inputText}>Userame</Text>
              <View>
              <TextInput
                style={styles.inputBox}
                value={username}
                onChangeText={(text) => setUsername(text)}
              />
              {errors.username && <Text style={styles.validityText}>{errors.username}</Text>}
              </View>
            </View>
          
            <View style={styles.inputContainer}>
              <Text style={styles.inputText}>Bio</Text>
              <View>
              <TextInput
                style={[styles.inputBox,{textAlignVertical: "top",height:100}]}
                value={bio}
                multiline= {true}
                onChangeText={(text) => setBio(text)}
              />
              </View>
            </View>
    
            <View style={styles.inputContainer}>
              <Text style={styles.inputText}>Email</Text>
              <TextInput style={[styles.inputBox,{backgroundColor: "#ccc"}]} value={email} editable={false} />
            </View>
    
            <View style={styles.inputContainer}>
              <Text style={styles.inputText}>Password</Text>
              <View>
              <TextInput
                style={styles.inputBox}
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={true}
              />
              {errors.password && <Text style={styles.validityText}>{errors.password}</Text>}
              </View>
            </View>
    
            <View style={{ alignItems: "center" }}>
              <TouchableOpacity style={styles.updateBtn} onPress={handleUpdate} disabled={loading}>
                <Text style={styles.updateBtnText}>
                  {loading ? <ActivityIndicator color="#fff" /> : "Update Profile"}
                </Text>
              </TouchableOpacity>
            </View>
            </ScrollView>
                  {/* <View style={{ flex: 1, justifyContent: "flex-end" }}> */}
                    {/* <FooterMenu /> */}
                  {/* </View> */}
        </View>
                // {/* </ImageBackground> */}
       );
    };

    const styles = StyleSheet.create({
        container: {
          flex: 1,
          paddingTop:20,
          backgroundColor: '#f0f8ff',
        },
        backButton: {
          paddingHorizontal: 10,
        },
        profileContainer: {
          alignItems: "center",
          marginBottom: 15,
        },
        profileImage: {
          height: 150,
          width: 150,
          borderRadius: 75,
          borderWidth: 2,
        },
        warningtext: {
          color: "#b22222",
          fontSize: 13,
          textAlign: "center",
          fontWeight: "700",
          marginBottom: 10,
          paddingHorizontal: 10,
        },
        inputContainer: {
          marginVertical: 10,
          paddingHorizontal: 20,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        },
        inputText: {
          fontWeight: "bold",
          width: 70,
          color: "gray",
        },
        inputBox: {
          width: 250,
          backgroundColor: "#fff",
          borderWidth:1,
          // fontSize: 16,
          paddingLeft: 10,
          borderRadius: 8,
          color: "#000",
          fontWeight: "450",
          borderColor: "#ccc"
        },
        updateBtn: {
          backgroundColor: "black",
          color: "white",
          height: 40,
          width: 250,
          borderRadius: 10,
          marginTop: 30,
          alignItems: "center",
          justifyContent: "center",
        },
        updateBtnText: {
          color: "#ffffff",
          fontSize: 16,
        },
        validityText: {
          color: '#b22222',
          marginLeft: 5,
          fontWeight: '450'
        },
      });

      export default EditProfile;