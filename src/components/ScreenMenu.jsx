import { View } from 'react-native';
import React,{useContext} from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthContext } from '../context/authContext';
import Icon from '@react-native-vector-icons/fontawesome';

// Screens
import Login from '../screens/Login';
import Register from '../screens/Register';
import Home from '../screens/Home';
import Search from '../screens/Search';
import ViewRecipe from '../screens/ViewRecipe';
import Post from '../screens/Post';
import Profile from '../screens/Profile';
import EditProfile from '../screens/EditProfile';
import EditRecipe from '../screens/EditRecipe';
import ForgotPassword from '../screens/ForgotPassword';

// Header Components
import {Logoutlogo, Applogo, Editlogo} from './HeaderMenu';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// 🏠 Tab Navigation for Home, Search, Post, Profile
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerTitleAlign: "center",
        tabBarStyle: { backgroundColor: '#fff' },
        tabBarActiveTintColor: '#b22222',
        tabBarInactiveTintColor: '#2f4f4f',
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'Search') iconName = 'search';
          else if (route.name === 'Post') iconName = 'plus-square';
          else if (route.name === 'Profile') iconName = 'user';

          return <Icon name={iconName} size={size} color={color} />;
        },

        tabBarHideOnKeyboard: true,
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          // headerShown: false,
        //   headerTitleStyle: {
        //     fontSize: 25,
        //     fontWeight: '600',
        //     textAlign: 'center',
        //     color: '#2f4f4f',
        // },
          headerTitle: "RECIPES",
          headerLeft: () => <Applogo />,
          headerRight: ()=> <Logoutlogo />,
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          headerShown: false,
          headerTitle: "SEARCH",
          headerLeft: () => <Applogo />,
          headerRight: ()=> <Logoutlogo />,
        }}
      />
      <Tab.Screen
        name="Post"
        component={Post}
        options={{
          headerShown: false,
          headerTitle: "CREATE RECIPE",
          headerLeft: () => <Applogo />,
          // headerRight: ()=> <Logoutlogo />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          // headerShown: false,
          headerTitle: "PROFILE",
          headerLeft: () => <Applogo />,
          headerRight: ()=> <Editlogo/>,
        }}
      />
    </Tab.Navigator>
  );
};

// 🌍 Main Navigation (Handles Login & Tabs)
const ScreenMenu = () => {
     //Global state
    const [state] = useContext(AuthContext);
    // const islogin = state?.user && state?.token
    const islogin = !!state?.user

    return (
        // <Stack.Navigator>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {islogin ? 
            (<> 
          <Stack.Screen 
          name="Main" 
          component={TabNavigator} 
          // options={{headerShow: false}} 
          />
          <Stack.Screen 
          name="ViewRecipe" 
          component={ViewRecipe} 
          // options={{headerShow: true}} 
          />
          <Stack.Screen 
          name="EditProfile" 
          component={EditProfile} 
          // options={{headerShow: true}} 
          />
          <Stack.Screen 
          name="EditRecipe" 
          component={EditRecipe} 
          // options={{headerShow: true}} 
          />
           </>
           ): ( 
             <>
            <Stack.Screen
            name="Login"
            component={Login}
            // options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            // options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPassword}
            // options={{ headerShown: false }}
          />
           </>
            )}
        </Stack.Navigator>
    )
  };

export default ScreenMenu