import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert, ActivityIndicator, Image } from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/authContext';
import Icon from '@react-native-vector-icons/fontawesome';
import axios from 'axios';
import { PostContext } from '../context/postContext';
import Dropdown from '../components/Dropdown';
import { launchImageLibrary } from 'react-native-image-picker';

const EditRecipe = ({ navigation, route }) => {
    const { recipe } = route.params;
    
    // Global state
    const [posts, setPosts, getAllPosts] = useContext(PostContext);
    const [state] = useContext(AuthContext);
    const user = state.user;

    // Local state
    const [title, setTitle] = useState(recipe.title);
    const [instructions, setInstructions] = useState(recipe.instructions);
    const [description, setDescription] = useState(recipe.description);
    const [video, setVideo] = useState(recipe.video || "");
    const [servingSize, setServingSize] = useState(recipe.serving_size);
    const [dietaryPreferences, setDietaryPreferences] = useState(recipe.dietary_preferences);
    const [ingredients, setIngredients] = useState(recipe.ingredients);
    const [photos, setPhotos] = useState(recipe.photos || []);
    const [tags, setTags] = useState(recipe.tags);
    const [difficultyLevel, setDifficultyLevel] = useState(recipe.difficulty_level);
    const [privacyStatus, setPrivacyStatus] = useState(recipe.privacy_status);
    const [loading, setLoading] = useState(false);

    // console.log(ingredients[0].quantity)
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

    // Select Image
    const selectImage = () => {
        const options = { mediaType: 'photo' };
        launchImageLibrary(options, (response) => {
            if (!response.didCancel && !response.error) {
                const selectedPhotos = response.assets.map(asset => asset.uri);
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
        console.log(value,':',field);
        setIngredients(prevIngredients => prevIngredients.map((ingredients, i) =>
            i === index ? { ...ingredients, [field]: value } : ingredients
        ));
        // const updatedIngredients = [...ingredients];
        // updatedIngredients[index][field] = value;
        // setIngredients(updatedIngredients);
    };

    const handleAddIngredient = () => {
        setIngredients([...ingredients, { name: '', quantity: '', unit: '' }]);
    };

    const handleRemoveIngredient = (index) => {
        setIngredients(ingredients.filter((_, i) => i !== index));
    };

    // Handle Update Recipe
    const handleUpdate = async () => {
        setLoading(true);
        try {
            if (!title || !instructions || !description || !servingSize || !dietaryPreferences || ingredients.length === 0 || photos.length === 0) {
                Alert.alert("Validation Error", "Please fill in all required fields");
                // setLoading(false);
                return;
            }
            
            const updatedRecipe = {
                title,
                instructions,
                description,
                video,
                serving_size: servingSize,
                dietary_preferences: dietaryPreferences,
                ingredients,
                photos,
                tags,
                difficulty_level: difficultyLevel,
                privacy_status: privacyStatus,
            };

            await axios.put(`/update-post/${recipe._id}`, updatedRecipe);
            Alert.alert("Success", "Recipe updated successfully");
            getAllPosts();
            navigation.goBack();
        } catch (error) {
            Alert.alert("Error", error.response?.data?.message || error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="always">

            <View style={styles.header}>
       <TouchableOpacity onPress={() => navigation.goBack()}>
           <Icon name="arrow-left" size={24} color="#000" />
       </TouchableOpacity>
       <Text style={styles.title}>Edit Recipe</Text>
       <View></View>
      </View>
         <Text style={styles.label}>Title:</Text>
         <TextInput style={styles.inputBox} placeholder="Recipe Title" value={title} onChangeText={setTitle} />

        <View style={styles.inputBox}>
          <TouchableOpacity style={styles.imagePicker} onPress={selectImage}>
            <Text>Select Photos <Icon name="picture-o" size={15}></Icon></Text>
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
                    <View key={index}>
                        <Text style= {{color: "#000"}}>{index+1}</Text>
                        <TextInput style={styles.inputBox} placeholder="Name" value={ingredient.name} onChangeText={(value) => handleIngredientChange(index, 'name', value)} />
                        {/* <Text>{ingredients[index].quantity}</Text> */}
                        <TextInput style={styles.inputBox} placeholder="Quantity" value={ingredient.quantity.toString()} onChangeText={(value) => handleIngredientChange(index, 'quantity', value)} 
                        keyboardType="numeric"
                         />
                        <TextInput style={styles.inputBox} placeholder="Unit" value={ingredient.unit} onChangeText={(value) => handleIngredientChange(index, 'unit', value)} />
                        <TouchableOpacity onPress={() => handleRemoveIngredient(index)}>
                            <Text style={styles.removeIngredientText}>Remove</Text>
                        </TouchableOpacity>
                    </View>
                ))}
                <TouchableOpacity onPress={handleAddIngredient}>
                    <Text style={styles.addIngredient}>+ Add Ingredient</Text>
                </TouchableOpacity>

                <Text style={styles.label}>Serving size:</Text>
         <TextInput style={styles.inputBox} placeholder="Serving Size" value={servingSize.toString()} onChangeText={setServingSize} />

                <Text style={styles.label}>Instructions:</Text>
                <TextInput style={styles.inputBox} placeholder="Instructions" value={instructions} onChangeText={setInstructions} multiline />

                <Text style={styles.label}>Description:</Text>
                <TextInput style={styles.inputBox} placeholder="Description" value={description} onChangeText={setDescription} multiline />

                <Text style={styles.label}>Dietary Preferences:</Text>
                <Dropdown label="Dietary Preferences" options={dietaryOptions} selectedValue={dietaryPreferences} onValueChange={setDietaryPreferences} />

                <Text style={styles.label}>Difficulty Level:</Text>
                <Dropdown label="Difficulty Level" options={difficultyLevelOptions} selectedValue={difficultyLevel} onValueChange={setDifficultyLevel} />
                
                <Text style={styles.label}>Privacy Status:</Text>
                <Dropdown label="Privacy Status" options={privacyOptions} selectedValue={privacyStatus} onValueChange={setPrivacyStatus} />

                <TouchableOpacity style={styles.updateBtn} onPress={handleUpdate} disabled={loading}>
                    {loading ? <ActivityIndicator /> : <Text style={styles.updateBtnText}>Update Recipe</Text>}
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f8ff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: "space-between",
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  label:{
    fontWeight:500,
    marginBottom:5,
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
  addIngredient: {
    paddingHorizontal:20,
    paddingVertical:2,
    backgroundColor: "#333",
    borderRadius: 20,
    // marginTop: -10,
    color: '#fff',
    marginHorizontal:50,
    marginBottom:10,
    textAlign: 'center',
    textDecorationLine: 'underline',
    fontWeight: "bold"
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
  image: {
    width: 90,
    height: 90,
    margin: 5,
    borderRadius: 10,
  },
  updateBtn: {
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  updateBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
    imageContainer: { 
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingBottom:10,
    },
    imageWrapper: { position: 'relative' },
    removeImageButton: { position: 'absolute', 
        top: 5, 
        right: 5, 
        // backgroundColor: 'red',
        borderRadius: 10,
        padding: 5 },
    removeImageText: { color: '#fff', fontWeight: 'bold' },
    removeIngredientText: { 
        color: 'red',
        marginTop:-5,
        marginBottom:5,
     }
    // imagePicker: { backgroundColor: '#ddd', padding: 10, marginVertical: 5, alignItems: 'center' },
});

export default EditRecipe;