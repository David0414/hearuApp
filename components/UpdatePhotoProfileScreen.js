import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImagePicker from 'react-native-image-crop-picker';

import { BASE_URL } from '../api/client';

const UpdatePhotoProfileScreen = ({ navigation }) => {
  const [profilePic, setProfilePic] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChoosePhoto = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      });

      if (!image.cancelled) {
        setProfilePic(image.path);
      }
    } catch (error) {
      console.log('Error al seleccionar la imagen:', error);
    }
  };

  const handleUpdateProfilePic = async () => {
    try {
      setLoading(true);

      const userName = await AsyncStorage.getItem('nombreUsuario');

      const response = await axios.patch(
        `${BASE_URL}/profile/${userName}`,
        {
          profilePic,
        }
      );

      if (response.status === 200) {
        Alert.alert('¡Foto de perfil actualizada correctamente!');
        navigation.navigate('ProfileScreen');
      } else {
        Alert.alert('Error al actualizar la foto de perfil');
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Actualizar Foto de Perfil</Text>

      <TouchableOpacity
        onPress={handleChoosePhoto}
        style={[styles.button, styles.choosePhotoButton]}
      >
        <Text style={styles.buttonText}>Seleccionar Foto</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleUpdateProfilePic}
        style={styles.button}
        disabled={loading}
      >
        <Text style={styles.buttonText}>Actualizar Foto de Perfil</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#333',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: 'white',
  },
  button: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 10,
    width: '80%',
    marginBottom: 20,
  },
  choosePhotoButton: {
    backgroundColor: 'red', // Puedes cambiar este color según tus necesidades
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default UpdatePhotoProfileScreen;
