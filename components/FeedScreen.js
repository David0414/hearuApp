import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { BASE_URL } from '../api/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FooterComponent from './Footer';
import { AirbnbRating } from 'react-native-ratings';

const FeedScreen = ({ navigation }) => {
  const [feedData, setFeedData] = useState([]);

  useEffect(() => {
    const fetchFeedData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');

        const response = await axios.get(`${BASE_URL}/feed`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFeedData(response.data.message);
      } catch (error) {
        console.error('Error fetching feed data:', error);
      }
    };

    fetchFeedData();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.feedItem}>
      <Image source={{ uri: `asset:/imgs/profilePic/${item.profilepic}` }} style={styles.profileImage} />
      <View style={styles.feedContent}>
        <Text style={styles.userName}>{item.nombreUsuarioPublicacion}</Text>
        <Text style={styles.songTitle}>{item.tituloCancion}</Text>
        <Image source={{ uri: `asset:/imgs/cover/${item.portadaAlbum}` }} style={styles.albumCover} />
        <AirbnbRating
          count={5}
          showRating={false}
          defaultRating={item.score} // Puedes ajustar el valor del rating aquí
          size={20}
          isDisabled
        />


        <TouchableOpacity
          style={styles.commentButton}
          onPress={() => navigation.navigate('PostScreen', { postId: item.idPublicacion })}
        >
          <Text style={styles.commentButtonText}>Ver que piensa</Text>
        </TouchableOpacity>


      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={feedData}
        keyExtractor={(item) => item.idPublicacion.toString()}
        renderItem={renderItem}
        style={styles.flatList}
      />
      <FooterComponent />
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#333',
    padding: 16,
  },
  flatList: {
    flex: 1,
    marginBottom: 100,
  },
  feedItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  feedContent: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: 'white',
  },
  songTitle: {
    fontSize: 14,
    marginBottom: 4,
    color: 'white',
  },
  albumCover: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 4,
  },
  score: {
    fontSize: 14,
    color: 'green',
  },
  commentButton: {
    backgroundColor: '#E53C3C',
    padding: 10,
    borderRadius: 5,
    marginTop: 8,
  },
  commentButtonText: {
    color: 'white',
    textAlign: 'center',
  },
};

export default FeedScreen;