import React, { useState, useEffect } from 'react';
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
  const [selectedImage, setSelectedImage] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const getTokenAndProfilePic = async () => {
      try {
        // Obtener el token de acceso
        const storedToken = await AsyncStorage.getItem('accessToken');
        console.log('Token de acceso:', storedToken);

        // Actualizar el estado con el token
        setToken(storedToken);

        // Puedes realizar otras lógicas relacionadas con la obtención de datos aquí
      } catch (error) {
        console.error('Error al obtener el token de acceso:', error);
      }
    };

    getTokenAndProfilePic();
  }, []);

  const handleChoosePhoto = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      });

      if (!image.cancelled) {
        setSelectedImage(image);
        console.log('Dirección de la imagen:', image.path);
      }
    } catch (error) {
      console.log('Error al seleccionar la imagen:', error);
    }
  };

  const handleTakePhoto = async () => {
    try {
      const image = await ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
      });

      if (!image.cancelled) {
        setSelectedImage(image);
        console.log('Dirección de la imagen:', image.path);
      }
    } catch (error) {
      console.log('Error al tomar la foto:', error);
    }
  };

  const handleUpdateProfilePic = async () => {
    try {
      setLoading(true);

      const userName = await AsyncStorage.getItem('nombreUsuario');
      console.log('Token antes de la solicitud PATCH:', token);

      const response = await axios.patch(
        `${BASE_URL}/profile/${userName}`,
        {
          profilePic,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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

      {selectedImage && (
        <Image
          source={{ uri: selectedImage.path }}
          style={{ width: 200, height: 200, marginBottom: 20 }}
        />
      )}

      <TouchableOpacity
        onPress={handleChoosePhoto}
        style={[styles.button, styles.choosePhotoButton]}
      >
        <Text style={styles.buttonText}>Seleccionar Foto</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleTakePhoto}
        style={[styles.button, styles.takePhotoButton]}
      >
        <Text style={styles.buttonText}>Tomar Foto</Text>
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
    backgroundColor: '#E53C3C',
    padding: 15,
    borderRadius: 10,
    width: '80%',
    marginBottom: 20,
  },
  choosePhotoButton: {
    backgroundColor: '#E53C3C',
  },
  takePhotoButton: {
    backgroundColor: '#3498db',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default UpdatePhotoProfileScreen;
