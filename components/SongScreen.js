import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const SongScreen = ({ route, navigation }) => {
  // Obtener datos de la canción desde la ruta
  const { song } = route.params;

  // Estructura básica de la pantalla
  return (
    <View style={styles.container}>
      {/* Encabezado de la pantalla */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>&lt; Atrás</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Detalles de la Canción</Text>
      </View>

      {/* Contenido de la pantalla */}
      <View style={styles.content}>
        {/* Imagen de la canción */}
        {/*<Image source={{ uri: song.imageUri }} style={styles.songImage} />*/}

        {/* Detalles de la canción */}
        <Text style={styles.songTitle}>{song.title}</Text>
        <Text style={styles.artist}>{song.artist}</Text>
        <Text style={styles.album}>{song.album}</Text>

        {/* Agrega más detalles según tus necesidades */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
  },
  backButton: {
    color: "white",
    fontSize: 16,
    marginRight: 10,
  },
  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  songImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  songTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  artist: {
    color: "white",
    fontSize: 18,
    marginBottom: 5,
  },
  album: {
    color: "white",
    fontSize: 16,
  },
  // Agrega más estilos según sea necesario
});

export default SongScreen;