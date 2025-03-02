import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, TextInput, FlatList } from 'react-native';
import React, { useState } from 'react';
import Icon from '@react-native-vector-icons/fontawesome';
import { useNavigation } from '@react-navigation/native';

const RecipeDetails = ({ route }) => {
  const { recipe } = route.params;
  const navigation = useNavigation();
  const [servingSize, setServingSize] = useState(recipe.serving_size);

  const calculateQuantity = (ingredient) => {
    const baseServingSize = recipe.serving_size;
    const scaleFactor = servingSize / baseServingSize;
    return (ingredient.quantity * scaleFactor).toFixed(2);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      <View style={styles.header}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
      <Text style={styles.title}>{recipe.title}</Text>
      <View></View>
      </View>

      {/* {recipe.photos? ( <Image
        source={{uri: recipe.photos[0]}}
        style={styles.recipeImage}
      />): null} */}
  {recipe.photos && recipe.photos.length > 0 ? (
        <View style={styles.imageContainer}>
         <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          > 
            {recipe.photos.map((photo, index) => (
              <Image
                key={index}
                source={{ uri: photo }}
                style={styles.recipeImage}
              />
            ))}
            </ScrollView> 
        </View>
      ) : null}

      <Text style={styles.sectionTitle}>Description:</Text>
      <Text style={styles.description}>{recipe.description}</Text>

      <Text style={styles.sectionTitle}>Instructions:</Text>
      <Text style={styles.instructions}>{recipe.instructions}</Text>

      {/* <Text style={styles.sectionTitle}>Ingredients:</Text>
      {recipe.ingredients.map((ingredient, index) => (
        <Text key={index} style={styles.ingredient}>
          {ingredient.quantity} {ingredient.unit} {ingredient.name}
        </Text>
      ))} */}

      <Text style={styles.sectionTitle}>Ingredients:</Text>
      {recipe.ingredients.map((ingredient, index) => (
        <Text key={index} style={styles.ingredient}>
          {calculateQuantity(ingredient)} {ingredient.unit} {ingredient.name}
        </Text>
      ))}

      {/* <Text style={styles.sectionTitle}>Video:</Text>
      {recipe.video ? (
        <Text style={styles.videoLink}>{recipe.video}</Text>
      ) : (
        <Text>No video available</Text>
      )} */}

      <Text style={styles.sectionTitle}>Dietary Preferences:</Text>
      <Text>{recipe.dietary_preferences}</Text>

      <Text style={styles.sectionTitle}>Serving Size:</Text>
      {/* <Text>{recipe.serving_size}</Text> */}
      <TextInput
        style={styles.servingSizeInput}
        value={servingSize.toString()}
        onChangeText={(text) => setServingSize(Number(text))}
        keyboardType="numeric"
      />

      {/* <Text style={styles.sectionTitle}>Tags:</Text>
      <Text>{recipe.tags.join(', ')}</Text> */}

      <Text style={styles.sectionTitle}>Difficulty Level:</Text>
      <Text style={{marginBottom: 20}}>{recipe.difficulty_level}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f8ff",
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: "space-between",
  },
  backButton: {
    marginVertical: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#00008b",
    marginBottom: 20,
  },
  imageContainer: {
    flexDirection: "row",
    height: 250,
    // width: 300,
    marginBottom: 20,
  },
  recipeImage: {
    // width: "100%",
    width: 300,
    height: 250,
    borderRadius: 15,
    marginRight:10
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    marginTop: 20,
  },
  description: {
    fontSize: 16,
    color: "#666",
  },
  servingSizeInput: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    borderRadius: 4,
    // marginBottom: 20,
    width: 300,
  },
  instructions: {
    fontSize: 16,
    color: "#666",
  },
  ingredient: {
    fontSize: 16,
    color: "#333",
  },
  videoLink: {
    fontSize: 16,
    color: "#007bff",
    textDecorationLine: "underline",
  },
});

export default RecipeDetails;