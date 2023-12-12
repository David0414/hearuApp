// App.js
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from './components/SignInScreen'; 
import HomeScreen from './components/HomeScreeen';
import RegisterScreen from './components/RegisterScreen';
import RatingScreen from './components/RatingScreen';
import SearchScreen from './components/SearchScreen';
import ProfileScreen from './components/ProfileScreen';
import OtherUserProfileScreen from './components/OtherUserProfileScreen';
import ArtistScreen from './components/ArtistScreen';
import FeedScreen from './components/FeedScreen';
import SongScreen from './components/SongScreen';
import AlbumScreen from './components/AlbumScreen';
import PostScreen from './components/PostScreen';
import CommentScreen from './components/CommentScreen';


import UpdatePhotoProfileScreen from './components/UpdatePhotoProfileScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false }} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="RatingScreen" component={RatingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SearchScreen" component={SearchScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerShown: false }} />
        <Stack.Screen name="OtherUserProfileScreen" component={OtherUserProfileScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ArtistScreen" component={ArtistScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SongScreen" component={SongScreen} options={{ headerShown: false }} />
        <Stack.Screen name="UpdatePhotoProfileScreen" component={UpdatePhotoProfileScreen} options={{ headerShown: false }} />
        <Stack.Screen name="FeedScreen" component={FeedScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AlbumScreen" component={AlbumScreen} options={{ headerShown: false }} />
        <Stack.Screen name="PostScreen" component={PostScreen} options={{ headerShown: false }} />
        <Stack.Screen name="CommentScreen" component={CommentScreen} options={{ headerShown: false }} />


      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
