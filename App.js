// App.js
import {React} from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from './components/SignInScreen'; 
import HomeScreen from './components/HomeScreeen';
import RegisterScreen from './components/RegisterScreen';
import RatingScreen from './components/RatingScreen';
import SearchScreen from './components/SearchScreen';


import ProfileScreen from './components/ProfileScreen';
import SongScreen from './components/SongScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="RatingScreen" component={RatingScreen} />
        <Stack.Screen name="SearchScreen" component={SearchScreen} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="SongScreen" component={SongScreen} />




      </Stack.Navigator>
    </NavigationContainer>
  );
};



export default App;
