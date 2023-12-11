import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import axios from 'axios';
import { AirbnbRating } from 'react-native-ratings';
import { BASE_URL } from '../api/client';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OtherUserProfileScreen = ({ route, navigation }) => {
  const { userName } = route.params || {};
  const [profileData, setProfileData] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [refreshPage, setRefreshPage] = useState(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');

        const response = await axios.get(`${BASE_URL}/profile/${userName}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const onfollowValue = response.data.message.onfollow[0].onfollow;
        setIsFollowing(onfollowValue === 1);

        await AsyncStorage.setItem('isFollowing', JSON.stringify(onfollowValue === 1));

        setProfileData(response.data.message);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData();
  }, [userName, refreshPage]);

  const handleFollowButton = async () => {
    try {
      const token = await AsyncStorage.getItem('token');

      const newIsFollowing = !isFollowing;
      setIsFollowing(newIsFollowing);

      if (newIsFollowing) {
        await axios.post(`${BASE_URL}/profile/${userName}`, null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        await axios.delete(`${BASE_URL}/profile/${userName}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      const onfollowResponse = await axios.get(`${BASE_URL}/profile/${userName}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const onfollowValue = onfollowResponse.data.message.onfollow[0].onfollow;

      setIsFollowing(onfollowValue === 1);

      await AsyncStorage.setItem('isFollowing', JSON.stringify(onfollowValue === 1));

      setRefreshPage((prevRefresh) => !prevRefresh);
    } catch (error) {
      console.error('Error toggling follow status:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {profileData?.profile && (
          <>
            <View style={styles.profileInfo}>
              <Image
                source={{ uri: `asset:/imgs/profilePic/${profileData.profile.profilePic}` }}
                style={styles.profileImage}
              />
              <Text style={styles.userName}>Nombre de Usuario: {profileData.profile.nombreUsuario}</Text>
              <Text style={styles.followers}>Seguidores: {profileData.followers[0].followers}</Text>
              <Text style={styles.following}>Siguiendo: {profileData.following[0].following}</Text>
              <TouchableOpacity onPress={handleFollowButton}>
                <View style={styles.followButton}>
                  <Text style={styles.followButtonText}>
                    {isFollowing ? 'Dejar de seguir' : 'Seguir'}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            <Text style={styles.sectionTitle}>Publicaciones y Calificaciones:</Text>
            <FlatList
              data={profileData.rates}
              keyExtractor={(item) => item.idPublicacion.toString()}
              renderItem={({ item }) => (
                <View style={[styles.rateItem, { backgroundColor: '#E53C3C' }]}>
                  <Text style={{ color: 'white' }}>Canción: {item.nombreCancion}</Text>
                  <Text style={{ color: 'white' }}>Autor: {item.nombreAutor}</Text>
                  <Image
                    source={{ uri: `asset:/imgs/cover/${item.portadaAlbum}` }}
                    style={styles.albumCover}
                  />
                  <AirbnbRating
                    count={5}
                    reviews={['malo', 'Malo', 'Regular', 'Bueno', 'Excelente']}
                    defaultRating={item.rate}
                    size={20}
                    showRating={false}
                    isDisabled
                  />
                </View>
              )}
            />
          </>
        )}
      </View>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#222',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  profileInfo: {
    alignItems: 'flex-start',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  userName: {
    color: 'white',
    fontSize: 18,
    marginBottom: 5,
  },
  followers: {
    color: 'white',
    fontSize: 16,
    marginBottom: 5,
  },
  following: {
    color: 'white',
    fontSize: 16,
    marginBottom: 10,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  rateItem: {
    marginBottom: 10,
    width: '100%',
  },
  followButton: {
    backgroundColor: '#E53C3C',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  followButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  albumCover: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginVertical: 5,
  },
};

export default OtherUserProfileScreen;
