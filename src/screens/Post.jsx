import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert, ActivityIndicator, ImageBackground, Image } from 'react-native';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/authContext';
import Icon from '@react-native-vector-icons/fontawesome';
import axios from 'axios';
import { PostContext } from '../context/postContext';
import Dropdown from '../components/Dropdown';
import { launchImageLibrary } from 'react-native-image-picker';

const Post = ({ navigation }) => {
  // global state
  const [posts, setPosts, getAllPosts] = useContext(PostContext)
  const [state] = useContext(AuthContext);
  const user = state.user;

  // local state
  const [title, setTitle] = useState("");
  const [instructions, setInstructions] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState("");
  const [servingSize, setServingSize] = useState("");
  const [dietaryPreferences, setDietaryPreferences] = useState("");
  const [ingredients, setIngredients] = useState([{ name: '', quantity: '', unit: '' }]);
  const [photos, setPhotos] = useState([]);
  const [tags, setTags] = useState("");
  const [difficultyLevel, setDifficultyLevel] = useState("");
  const [privacyStatus, setPrivacyStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const dietaryOptions = [
    { label: 'Veg', value: 'veg' },
    { label: 'Non-Veg', value: 'non-veg' },
    { label: 'Vegan', value: 'vegan' },
  ];

  const difficultyLevelOptions = [
    { label: 'Easy', value: 'Easy' },
    { label: 'Medium', value: 'Medium' },
    { label: 'Hard', value: 'Hard' },
  ];

  const privacyOptions = [
    { label: 'Public', value: 'public' },
    { label: 'Private', value: 'private' },
  ];

  //UPLOAD PROFILE IMAGE
      const selectImage = () => {
        const options = {
          mediaType: 'photo'
        };
    
        launchImageLibrary(options, (response) => {
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else {
            const selectedPhotos = response.assets.map((asset) => asset.uri);
            setPhotos([...photos, ...selectedPhotos]);
          }
        });
      };
      // Remove Image
    const removeImage = (index) => {
      setPhotos(photos.filter((_, i) => i !== index));
   };

// Handle Ingredient Change
  const handleIngredientChange = (index, field, value) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index][field] = value;
    setIngredients(updatedIngredients);
  };

  const handleAddIngredient = () => {
    setIngredients([...ingredients, { name: '', quantity: '', unit: '' }]);
  };

  const handleRemoveIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const resetForm = () => {
      setTitle(null);
      setInstructions(null);
      setDescription(null);
      setVideo(null);
      setServingSize(null);
      setDietaryPreferences(null);
      setIngredients([{ name: null, quantity: null, unit: null }]);
      setPhotos([]);
      setTags(null);
      setDifficultyLevel(null);
      setPrivacyStatus(null);
  };

  // handle form data post
  const handlePost = async () => {
    setLoading(true);
    try {
      // setLoading(true);
      if (!title) {
        Alert.alert("Validation Error", "Please add post title");
        return;
      }
      const isphotos= Array.isArray(photos) && photos.length == 0;
      if (isphotos) {
        Alert.alert("Validation Error", "Please add at least one photo");
        return;
      }
      const isingredients= Array.isArray(ingredients) && ingredients.length == 0;
      if (isingredients) {
        Alert.alert("Validation Error", "Please add at least one ingredient");
        return;
      }
      if (!instructions) {
        Alert.alert("Validation Error", "Please add post instructions");
        return;
      }
      if (!description) {
        Alert.alert("Validation Error", "Please add post description");
        return;
      }
      if (!servingSize) {
        Alert.alert("Validation Error", "Please add post Serving size");
        return;
      }
      if (!dietaryPreferences) {
        Alert.alert("Validation Error", "Please add post Dietary Preference");
        return;
      }
      // if (!difficultyLevel) {
      //   Alert.alert("Validation Error", "Please add post Difficulty Level");
      //   return;
      // }
      const user_id = user._id; // Replace with actual user ID from auth context
      const newRecipe = {
        title,
        instructions,
        user_id,
        ingredients,
        description,
        video,
        serving_size: servingSize,
        dietary_preferences: dietaryPreferences,
        photos,
        // tags: tags.split(',').map(item => item.trim()),
        tags,
        difficulty_level: difficultyLevel,
        privacy_status: privacyStatus
      };

      const { data } = await axios.post("/create-post", newRecipe);
      setPosts([...posts, data?.post]);
      // setLoading(false);
      Alert.alert("Success", data?.message);
      resetForm();
      getAllPosts();
      navigation.navigate("Home");
    } catch (error) {
      Alert.alert("Error", error.response?.data?.message || error.message);
      // setLoading(false);
      console.log(error);
    }finally{
      // resetForm();
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} 
      keyboardShouldPersistTaps="always">
        
        <View style={{ alignItems: "center" }}>
          <Text style={{fontSize:20, fontWeight:"bold", margin:10}}> Post Recipe</Text>
          <Text style={styles.label}>Title:</Text>
          <TextInput
            style={styles.inputBox}
            placeholder="Add Recipe title"
            placeholderTextColor={"gray"}
            value={title}
            onChangeText={setTitle}
          />

          <View style={styles.inputBox}>
            <TouchableOpacity style={styles.imagePicker} onPress={selectImage}>
                    <Text>Select Photos <Icon name="picture-o" size={15}></Icon> </Text>
           </TouchableOpacity>
          <View style={styles.imageContainer}>
                      {photos.map((photo, index) => (
                    <View key={index} style={styles.imageWrapper}>
                             <Image source={{ uri: photo }} style={styles.image} />
                        <TouchableOpacity onPress={() => removeImage  (index)} style={styles.removeImageButton}>
                        <Text style={styles.removeImageText}>X</Text>
                        </TouchableOpacity>
                   </View>
                              ))}
                   </View>
          </View>
        
          <Text style={styles.label}>Ingredients:</Text>
          {ingredients.map((ingredient, index) => (
            <View key={index} style={styles.ingredientContainer}>
              <Text style= {{color: "#000",paddingLeft: 10}}>{index+1}</Text>
              <TextInput
                style={styles.inputBox}
                placeholder="Name"
                placeholderTextColor={"gray"}
                value={ingredient.name}
                onChangeText={(value) => handleIngredientChange(index, 'name', value)}
              />
              <TextInput
                style={styles.inputBox}
                placeholder="Quantity"
                placeholderTextColor={"gray"}
                value={ingredient.quantity}
                onChangeText={(value) => handleIngredientChange(index, 'quantity', value)}
                keyboardType="numeric"
              />
              <TextInput
                style={styles.inputBox}
                placeholder="Unit"
                placeholderTextColor={"gray"}
                value={ingredient.unit}
                onChangeText={(value) => handleIngredientChange(index, 'unit', value)}
              />
              <TouchableOpacity onPress={() => handleRemoveIngredient(index)}>
                  <Text style={styles.removeIngredientText}>Remove</Text>
               </TouchableOpacity>
            </View>
          ))}
             <TouchableOpacity onPress={handleAddIngredient}>
            <Text style={styles.addIngredient}>+ Add Ingredient</Text>
          </TouchableOpacity>

          <Text style={styles.label}>Instructions:</Text>
          <TextInput
            style={[styles.inputBox,styles.textArea]}
            placeholder="Add Recipe instructions"
            placeholderTextColor={"gray"}
            multiline={true}
            value={instructions}
            onChangeText={setInstructions}
          />

          <Text style={styles.label}>Description:</Text>
          <TextInput
            style={styles.inputBox}
            placeholder="Add Recipe description"
            placeholderTextColor={"gray"}
            multiline={true}
            numberOfLines={4}
            value={description}
            onChangeText={setDescription}
          />
          
          <Text style={styles.label}>Serving Size:</Text>
          <TextInput
            style={styles.inputBox}
            placeholder="Serving Size"
            placeholderTextColor={"gray"}
            value={servingSize}
            onChangeText={setServingSize}
            keyboardType="numeric"
          />

         <Text style={styles.label}>Dietary Preference:</Text>
         <Dropdown
            label="Select Dietary Preferences"
            options={dietaryOptions}
            selectedValue={dietaryPreferences}
           onValueChange={setDietaryPreferences}
         />
         
         <Text style={styles.label}>Difficulty Level:</Text>
          <Dropdown
            label="Select Difficulty Level"
            options={difficultyLevelOptions}
            selectedValue={difficultyLevel}
           onValueChange={setDifficultyLevel}
         />

         <Text style={styles.label}>Privacy status:</Text>
         <Dropdown
            label="Select privacy status"
            options={privacyOptions}
            selectedValue={privacyStatus}
           onValueChange={setPrivacyStatus}
         />
        </View>

        <View style={{ alignItems: "center" }}>
          <TouchableOpacity style={styles.postBtn} onPress={handlePost} disabled={loading}>
            {loading? <ActivityIndicator color="#fff" /> :
            <Text style={styles.postBtnText}>
              <Icon name="plus-square" size={18} color={"#fff"}/> {" Post"}
            </Text>
            }
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f8ff',
    flex: 1,
    paddingTop: 10,
  },
  label: {
    color: '#000',
    alignSelf:"flex-start",
    fontSize: 16,
    paddingLeft: 25,
    fontWeight: "450",
    marginBottom: 5,
  },
  inputBox: {
    backgroundColor: "#fff",
    color: "#000",
    textAlignVertical: "top",
    paddingTop: 10,
    width: 320,
    marginBottom: 10,
    fontSize: 16,
    paddingLeft: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
  },
  textArea: {
    height: 100,
  },
  ingredientContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  removeIngredientText: { 
    color: 'red',
    marginTop:-5,
    marginBottom:5,
 },
  imagePicker: {
    borderWidth: 1,
    borderColor: 'gray',
    width:300,
    padding: 10,
    borderRadius: 4,
    alignItems: 'center',
    marginBottom: 10,
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingBottom:10,
  },
  imageWrapper: { position: 'relative' },
    removeImageButton: { 
      position: 'absolute',
       top: 5, right: 5,
        // backgroundColor: 'red',
        borderRadius: 10,
        padding: 5 },
    removeImageText: { color: 'white', fontWeight: 'bold' },
  image: {
    width: 90,
    height: 90,
    margin: 5,
    borderRadius: 10,
  },
  addIngredient: {
    paddingHorizontal: 20,
    paddingVertical:2,
    backgroundColor: "#333",
    borderRadius: 20,
    marginTop: -10,
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
    textDecorationLine: 'underline',
    fontWeight: "bold"
  },
  postBtn: {
    backgroundColor: "#000",
    width: 310,
    marginTop: 30,
    height: 40,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginBottom:20,
  },
  postBtnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Post;