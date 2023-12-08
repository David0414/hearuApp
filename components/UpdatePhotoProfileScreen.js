import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  TextInput,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImagePicker from 'react-native-image-crop-picker'; // Importa la biblioteca

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

      // Obtener nombre de usuario almacenado en AsyncStorage
      const userName = await AsyncStorage.getItem('nombreUsuario');

      const response = await axios.patch(
        `${BASE_URL}/profile/${userName}`,
        {
          profilePic,
        }
      );

      if (response.status === 200) {
        Alert.alert('¡Foto de perfil actualizada correctamente!');
        // Puedes redirigir a la pantalla de perfil u otra pantalla después de la actualización
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

      <TouchableOpacity onPress={handleChoosePhoto}>
        <View style={styles.profileImageContainer}>
          {profilePic ? (
            <Image
              source={{ uri: profilePic }}
              style={styles.profileImage}
            />
          ) : (
            <Text style={styles.choosePhotoText}>Seleccionar Foto</Text>
          )}
        </View>
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="URL de la nueva foto de perfil"
        onChangeText={(text) => setProfilePic(text)}
        value={profilePic}
        editable={false} // Ahora el campo es solo de lectura ya que la URL se obtiene de la imagen seleccionada
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleUpdateProfilePic}
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
  profileImageContainer: {
    alignItems: 'center',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  choosePhotoText: {
    color: 'white',
    fontSize: 16,
    marginTop: 10,
  },
  input: {
    width: '80%',
    height: 50,
    borderColor: 'gray',
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 20,
    paddingLeft: 10,
    color: 'white',
  },
  button: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default UpdatePhotoProfileScreen;
