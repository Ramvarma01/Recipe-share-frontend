import React, {useContext} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Register from './screens/Register';
import Login from './screens/Login';
import { AuthProvider } from './context/authContext';
import Home from './screens/Home';
// import { AuthContext } from './context/authContext';

function App() {
  //Global state
  // const [state] = useContext(AuthContext)
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <AuthProvider>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
      </AuthProvider>
    </NavigationContainer>
  )
};

export default App;