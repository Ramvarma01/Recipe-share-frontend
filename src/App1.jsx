import React, {useContext} from 'react';
import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import Register from './screens/Register';
// import Login from './screens/Login';
import { AuthProvider } from './context/authContext';
// import Home from './screens/Home';
import { AuthContext } from './context/authContext';
import ScreenMenu from './components/ScreenMenu';
import { PostProvider } from './context/postContext';

function App() {
  //Global state
  // const [state] = useContext(AuthContext);
  return (
    <NavigationContainer>
      <AuthProvider>
        <PostProvider>
          <ScreenMenu></ScreenMenu>
        </PostProvider>
      </AuthProvider>
    </NavigationContainer>
  )
};

export default App;