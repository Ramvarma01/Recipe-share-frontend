import { View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView, Image, TextInput } from 'react-native';
import React, { useContext, useState } from 'react';
import { PostContext } from '../context/postContext';
import Icon from '@react-native-vector-icons/fontawesome';
import moment from "moment";
import Dropdown from '../components/Dropdown'; // Assume you have a Dropdown component

const Search = ({ navigation }) => {
    const [posts, setPosts, getAllPosts] = useContext(PostContext);

    // State for filters
    const [selectedDietaryPreference, setSelectedDietaryPreference] = useState(null);
    const [selectedDifficultyLevel, setSelectedDifficultyLevel] = useState(null);

    // State for search query
    const [searchQuery, setSearchQuery] = useState('');
    // Dietary options
    const dietaryOptions = [
        { label: 'All', value: null },
        { label: 'Veg', value: 'veg' },
        { label: 'Non-Veg', value: 'non-veg' },
        { label: 'Vegan', value: 'vegan' },
    ];

    // Difficulty level options
    const difficultyOptions = [
        { label: 'All', value: null },
        { label: 'Easy', value: 'Easy' },
        { label: 'Medium', value: 'Medium' },
        { label: 'Hard', value: 'Hard' },
    ];

    // Filtered posts based on selected filters
    const filteredPosts = posts.filter(post => {
        const matchesDietaryPreference = selectedDietaryPreference ? post.dietary_preferences === selectedDietaryPreference : true;
        const matchesDifficultyLevel = selectedDifficultyLevel ? post.difficulty_level === selectedDifficultyLevel : true;
        const matchesSearchQuery = post.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesDietaryPreference && matchesDifficultyLevel && matchesSearchQuery;
        // return matchesDietaryPreference;
    });

    return (
        <View style={styles.container}>
              <View style={styles.searchBar}>
               <TextInput
                    placeholder="Search by title..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    placeholderTextColor={"#000"}
                    style={{width:250}}
                />
                <Icon name="search" size={25} style={{alignSelf:"center"}}></Icon>
             </View>
             <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="always">
            <View style={styles.filterContainer}>
              <View style={{flexDirection:"row"}}>
                <Text style={{fontWeight:"500", padding:8}} >Filter</Text>
                <Icon name="filter" size={14} style={{alignSelf:"center"}}></Icon>
               </View>
                <Dropdown
                    label="Dietary Preference"
                    options={dietaryOptions}
                    selectedValue={selectedDietaryPreference}
                    onValueChange={setSelectedDietaryPreference}
                />
                <Dropdown
                    label="Difficulty Level"
                    options={difficultyOptions}
                    selectedValue={selectedDifficultyLevel}
                    onValueChange={setSelectedDifficultyLevel}
                />
            </View>
             <View>
                {filteredPosts.length>0?filteredPosts.map((post, i) => (
                  <TouchableOpacity key={i} onPress={() => navigation.navigate('ViewRecipe', { recipe: post })}>
                    <View style={styles.card}>
                        <View>
                          {post.photos ? (<Image
                                            source={{ uri: post.photos[0] }}
                                            style={styles.recipeImage}
                                         />
                            ) : <></>}
                        </View>
                        <View style={{ padding: 10, width: "70%" }}>
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
                    ))
                    :(<View style={styles.noMatch}><Text style={styles.noMatchText}>!! No Match Found</Text></View>)
                    }
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        backgroundColor: '#f0f8ff'
    },
    searchBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 8,
        marginTop: 20,
        marginBottom:10,
        marginHorizontal:10,
        backgroundColor: '#fff',
    },
    noMatch : {
        alignItems: "center",
        marginHorizontal: 10,
        marginTop:"50%",
    },
    noMatchText: {
        color: "#b22222",
        fontWeight:"bold",
        fontSize:15
        },
    filterContainer: {
        flexDirection: "column",
        alignItems: "center",
        marginHorizontal: 10,
        marginTop:5,
        backgroundColor: '#fff',
        borderRadius:10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    card: {
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
    },
    recipeImage: {
        width: 90,
        height: 90,
        borderRadius: 5,
        borderWidth: 1.5,
        marginRight: 10,
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

export default Search;